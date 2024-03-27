/**
 * Retrieves and displays the content of the examFull.json file from local storage.
 * If the file exists, it parses its content and logs information about each question and its options.
 * If the file does not exist or there is an error parsing its content, appropriate error messages are logged.
 */
function viewExamFull() {
    console.log("viewExamFull function called");

    const examFullContent = localStorage.getItem("examFull");
    if (examFullContent) {
        try {   
            const examFull = JSON.parse(examFullContent);
            console.log("examFull.json:");
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
