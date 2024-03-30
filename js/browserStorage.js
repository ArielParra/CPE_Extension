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
        console.log("Key: "+key+" stored in firefox storage.");
    } else if (typeof chrome !== 'undefined') {
        chrome.storage.local.set({ [key]: value });
        console.log("Key: "+key+" stored in Chrome storage.");
    } else {
        console.error("ERROR: Extension API not detected.");
    }
}

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

function downloadJSON(key) {
    getBrowserStorage(key, (data) => {
        if (data) {
            console.log("Retrieved " + key + " from browser storage");
            try {
                const json = JSON.parse(data);
                const jsonBlob = new Blob([JSON.stringify(json)], { type: 'application/json' });
                const url = URL.createObjectURL(jsonBlob);
                const a = document.createElement('a');
                a.href = url;
                a.download = key + '.json';
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                URL.revokeObjectURL(url);
            } catch (error) {
                console.error("Error parsing " + key + " JSON:", error);
            }
        } else {
            console.error("No " + key + " in storage");
        }
    });
}

/*TODO */
function uploadJSON(file){
    if (file) {
        const reader = new FileReader();
        reader.readAsText(file);
        reader.onload = function() {
            const jsonData = JSON.parse(reader.result);
            setBrowserStorage(key,JSON.stringify(jsonData))
        };
        reader.onerror = function() {
            console.error("Error reading the file");
        };
    } else {
        console.error("no file")
    }
}

function setBrowserStorage(key, value) {
    if (typeof browser !== 'undefined') {
        browser.storage.local.set({ [key]: value });
        console.log("Key: " + key + " stored in Firefox storage.");
    } else if (typeof chrome !== 'undefined') {
        chrome.storage.local.set({ [key]: value });
        console.log("Key: " + key + " stored in Chrome storage.");
    } else {
        console.error("ERROR: Extension API not detected.");
    }
}
