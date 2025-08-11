const emailInput = document.getElementById('emailInput');
const urlPatternInput = document.getElementById('urlPatternInput');
const saveBtn = document.getElementById('saveBtn');
const status = document.getElementById('status');

// Load saved settings on page load
chrome.storage.sync.get(['defaultFromEmail', 'urlPattern'], (data) => {
  if (data.defaultFromEmail) emailInput.value = data.defaultFromEmail;
  if (data.urlPattern) urlPatternInput.value = data.urlPattern;
});

saveBtn.addEventListener('click', () => {
  const email = emailInput.value.trim();
  const urlPattern = urlPatternInput.value.trim();

  if (!email) {
    status.textContent = 'Please enter a valid email address to enable the extension.';
    status.style.color = 'red';
    return;
  }
  if (!urlPattern) {
    status.textContent = 'Please enter a permitted URL pattern to enable the extension.';
    status.style.color = 'red';
    return;
  }

  chrome.storage.sync.set({ defaultFromEmail: email, urlPattern: urlPattern }, () => {
    status.textContent = 'Settings saved! Extension is now active on matching pages.';
    status.style.color = 'green';
  });
});
