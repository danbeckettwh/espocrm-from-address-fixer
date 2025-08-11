# EspoCRM From Address Fixer

A simple browser extension to automatically set a default "From" address when composing emails in EspoCRM.

## The Problem

By default, EspoCRM may not remember your preferred "From" address, requiring you to manually select it every time you compose a new email. This extension solves that by allowing you to define a default address that is automatically selected on the email compose screen.

## Features

*   Sets a default "From" email address.
*   Allows you to specify the exact URL pattern of your EspoCRM instance where the extension should run.
*   Simple configuration via the extension's options page.

## Installation

There are two ways to install this extension. The recommended method is to download a pre-packaged release.

### Option 1: Install from a Release (Recommended)

1.  Go to the **Releases page** for this project.
2.  Under the **Assets** section, download the source code `.zip` file.
3.  **Unzip** the downloaded file into a permanent folder on your computer.
4.  Open your Chromium-based browser (like Google Chrome, Microsoft Edge, or Brave).
5.  Navigate to the extensions page (e.g., `chrome://extensions` or `edge://extensions`).
6.  Enable **Developer mode** using the toggle switch, usually in the top-right corner.
7.  Click the **"Load unpacked"** button.
8.  Select the `espo_from_extension` sub-directory from inside the folder you just unzipped.

The extension is now installed.

### Option 2: Install from Source (For Developers)

If you want to view or modify the code, you can install it directly from the source files.

1.  Clone or download this repository to your local machine.
2.  Follow steps 4-8 from Option 1.

## Configuration

1.  After installation, find the extension's icon in your browser's toolbar.
2.  Right-click the icon and select **"Options"**.
3.  In the options page, fill in the two fields:
    *   **Default "From" email address:** The email you want to be selected by default (e.g., `support@mycompany.com`).
    *   **Permitted URL pattern:** The URL of your EspoCRM instance. Use a wildcard (`*`) for parts of the URL that may change.
        *   **Example:** `https://crm.mycompany.com/*`
4.  Click **"Save"**. The extension will now be active on pages matching your URL pattern.

## Security Note

The `manifest.json` in this repository uses a broad `host_permissions` setting (`*://*/*`) for maximum compatibility out of the box. For enhanced security, it is **highly recommended** that you restrict this to your specific EspoCRM domain.

Open the `espo_from_extension/manifest.json` file and change this:

```json
"host_permissions": [
  "*://*/*"
]
```

To this (using your own domain):

```json
"host_permissions": [
  "https://your-espocrm-domain.com/*"
]
```

After saving the change, go back to your `chrome://extensions` page and click the "reload" icon on the extension card to apply the new permissions.

## License

This project is licensed under the Creative Commons Attribution-ShareAlike 4.0 International License.

You are free to use, share, and adapt this software for any purpose, including for commercial use. If you modify and distribute this software, you must do so under the same "ShareAlike" license to ensure that the project and its derivatives remain free and open.
