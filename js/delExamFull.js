function delExamFull() {
    try {
        localStorage.removeItem("examFull");
        alert("Archivo examFull.json eliminado");
    } catch (error) {
        console.error("Error al intentar eliminar examFull.json:", error);
        alert("Error al intentar eliminar examFull.json");
    }
}