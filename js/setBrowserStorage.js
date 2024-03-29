/**
 * @description Sets a key-value pair in the browser's local storage or storage API based on the browser type.
 * 
 * @function setBrowserStorage
 * @param {string} key - The key under which to store the value.
 * @param {*} value - The value to store.
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
