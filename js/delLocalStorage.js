/**
 * @description Deletes a key-value pair from the browser's local storage.
 * 
 * @function delLocalStorage
 * @param {string} key - The key corresponding to the value to be deleted from local storage.
 */
function delLocalStorage(key) {
    try {
        localStorage.removeItem(key);
    } catch (error) {
        console.error("ERROR: al trying to delete key: "+ key + ", ", error);
    }
}