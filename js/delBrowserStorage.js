/**
 * @description Clears all data from the local storage of the browser extension.
 * This function checks for the availability of browser extension APIs ('browser' or 'chrome').
 * If the 'browser' API is available, it clears the local storage using browser.storage.local.clear().
 * If the 'chrome' API is available, it clears the local storage using chrome.storage.local.clear().
 * If neither API is available, it logs an error message indicating that the extension API is not detected.
 *
 * @function delBrowserStorage
 */
function delBrowserStorage() {
    console.log("delBrowserStorage function called");
    if (typeof browser !== 'undefined') {
        browser.storage.local.clear(() => {
        });
    } else if (typeof chrome !== 'undefined') {
        chrome.storage.local.clear(() => {
        });
    } else {
        console.error("Extension API not detected.");
    }
}
