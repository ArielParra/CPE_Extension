/**
 * Stores data in the local storage of a browser extension, using the appropriate API based on the browser environment.
 * If the browser supports the 'browser' API (e.g., Firefox), data is stored using browser.storage.local.
 * If the browser supports the 'chrome' API (e.g., Google Chrome), data is stored using chrome.storage.local.
 *
 * @param key The key under which the data will be stored.
 * @param value The data to be stored. This should be an object.
 * @throws Error if the browser extension API is not detected.
 */

function getBrowserStorage(key, callback) {
    console.log("getBrowserStorage function called");
    if (typeof browser !== 'undefined') {
        browser.storage.local.get([key], (result) => {
            callback(result[key]);
        });
    } else if (typeof chrome !== 'undefined') {
        chrome.storage.local.get([key], (result) => {
            callback(result[key]);
        });
    } else {
        console.error("Extension API not detected.");
    }
}
