function viewExamFull() {
    const examFullContent = localStorage.getItem("examFull");

    if (examFullContent) {
        try {   
            const examFull = JSON.parse(examFullContent);
            console.log("Contenido de examFull.json:");
            console.log(examFull.title);

            // Iterar sobre cada pregunta y mostrar sus respuestas
            examFull.questions.forEach((question, index) => {
                console.log(`Pregunta ${index + 1}: ${question.title}`);
                console.log(`tipo : ${question.type}`);
                console.log(`respuestas: ${question.answer}`);
                console.log("opciones:");
                question.options.forEach((option, optionIndex) => {
                    console.log(`- ${optionIndex + 1} ${option.content}`);
                });
            });
        } catch (error) {
            console.error("Error al analizar el contenido de examFull.json:", error);
        }
    } else {
        console.error("No se encontró el contenido de examFull.json en el almacenamiento local.");
    }
}
viewExamFull();
