/**
 * Stores data in the local storage of a browser extension using the appropriate API based on the browser environment.
 * If the browser supports the 'browser' API , data is stored using browser.storage.local.
 * If the browser supports the 'chrome' API , data is stored using chrome.storage.local.
 * If neither API is available, an error message is logged indicating that the extension API is not detected.
 *
 * @param key The key under which the data will be stored.
 * @param value The data to be stored. This should be an object.
 * @throws Error if the browser extension API is not detected.
 */
function setBrowserStorage(key, value) {
    if (typeof browser !== 'undefined') {
        browser.storage.local.set({ [key]: value });
    } else if (typeof chrome !== 'undefined') {
        chrome.storage.local.set({ [key]: value });
    } else {
        console.error("ERROR: Extension API not detected.");
    }
}