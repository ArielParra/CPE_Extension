/**
 * @description Retrieves data from the local storage of a browser extension using the appropriate API based on the browser environment.
 * If the browser supports the 'browser' API (e.g., Firefox), data is retrieved using browser.storage.local.get().
 * If the browser supports the 'chrome' API (e.g., Google Chrome), data is retrieved using chrome.storage.local.get().
 * If neither API is available, an error message is logged indicating that the extension API is not detected.
 *
 * @function getBrowserStorage
 * @param key The key for which data will be retrieved from the storage.
 * @param callback The callback function to be called once data is retrieved.
 *                 The callback function receives the retrieved value as its argument.
 */
function getBrowserStorage(key, callback) {
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