/**
 * Deletes the examFull.json file from local storage if it exists.
 * Displays an alert message to notify the user about the deletion.
 * Logs any errors that occur during the deletion process.
 */
function delLocalStorage(key) {
    console.log("delLocalStorage function called");
    try {
        localStorage.removeItem(key);
        alert("Archivo "+ key +" eliminado");
    } catch (error) {
        console.error("Error al intentar eliminar "+ key + ", ", error);
        alert("Error al intentar eliminar "+ key);
    }
}