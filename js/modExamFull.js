function modExamFull() {
    const examFullContent = localStorage.getItem("examFull");

    if (examFullContent) {
        try {
            const examFull = JSON.parse(examFullContent);
            console.log("Contenido de examFull.json:");
            console.log(examFull);
        } catch (error) {
            console.error("Error al analizar el contenido de examFull.json:", error);
        }
    } else {
        console.error("No se encontró el contenido de examFull.json en el almacenamiento local.");
    }
}
modExamFull();//TODO: call from modExamFull.html