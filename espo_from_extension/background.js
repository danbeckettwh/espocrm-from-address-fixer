function wildcardToRegex(pattern) {
  // Escape regex special chars except *
  const escaped = pattern.replace(/[-/\\^$+?.()|[\]{}]/g, '\\$&');
  // Replace * with .*
  const regexStr = '^' + escaped.replace(/\*/g, '.*') + '$';
  return new RegExp(regexStr);
}

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete' && tab.url) {
    chrome.storage.sync.get(['defaultFromEmail', 'urlPattern'], ({ defaultFromEmail, urlPattern }) => {
      if (!defaultFromEmail || !urlPattern) {
        // User has not configured settings yet, do nothing.
        return;
      }

      const regex = wildcardToRegex(urlPattern);
      if (!regex.test(tab.url)) return; // Skip if URL doesn’t match

      chrome.scripting.executeScript({
        target: { tabId: tabId, allFrames: false },
        func: (targetEmail) => {
          function setFromAddress() {
            const sel = document.querySelector('select[data-name="from"]');
            if (!sel) return false;

            let inst = sel.selectize;
            if (!inst && window.jQuery) {
              try { inst = window.jQuery(sel)[0]?.selectize; } catch(e) {}
            }
            if (inst && typeof inst.setValue === 'function') {
              inst.setValue(targetEmail, true);
              try {
                sel.value = targetEmail;
                sel.dispatchEvent(new Event('change', { bubbles: true }));
              } catch(e){}
              return true;
            }
            return false;
          }

          if (!setFromAddress()) {
            const observer = new MutationObserver((mutations, obs) => {
              if (setFromAddress()) obs.disconnect();
            });
            observer.observe(document.body, { childList: true, subtree: true });
          }
        },
        args: [defaultFromEmail],
        world: "MAIN"
      });
    });
  }
});
