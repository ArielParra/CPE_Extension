/**
 * Sends a message to the active tab in the browser.
 * @param {Object} message - The message to be sent.
 */
function sendMessage(message) {
    if (typeof browser !== 'undefined') {
        browser.tabs.query({active: true, currentWindow: true}, function(tabs) {
            if (tabs.length > 0) {
                browser.tabs.sendMessage(tabs[0].id, message);
            } else {
                console.error("ERROR: No active tabs found.");
            }
        });
    } else if (typeof chrome !== 'undefined') {
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            if (tabs.length > 0) {
                chrome.tabs.sendMessage(tabs[0].id, message);
            } else {
                console.error("ERROR: No active tabs found.");
            }
        });
    } else {
        console.error("ERROR: Extension API not detected.");
    }
}