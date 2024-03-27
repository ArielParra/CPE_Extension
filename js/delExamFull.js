/**
 * Deletes the examFull.json file from local storage if it exists.
 * Displays an alert message to notify the user about the deletion.
 * Logs any errors that occur during the deletion process.
 */
function delExamFull() {
    console.log("delExamFull function called");
    try {
        localStorage.removeItem("examFull");
        alert("Archivo examFull.json eliminado");
    } catch (error) {
        console.error("Error al intentar eliminar examFull.json:", error);
        alert("Error al intentar eliminar examFull.json");
    }
}