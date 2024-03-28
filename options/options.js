/**
 * Function that executes when the window has fully loaded. 
 * Retrieves the data stored under the key "examFull" in the browser storage 
 * and displays it in the HTML element with the id "examInfo".
 * 
 * @param {String} key - The key under which the data was stored.
 * @param {Function} callback - Callback function that executes when the data has been retrieved.
 *                               This function is expected to take one parameter (the retrieved data).
 */
window.onload = getBrowserStorage("examFull", (data) => {
    /**
     * HTML element containing the exam information.
     * @type {HTMLElement}
     */
    const examInfoDiv = document.getElementById("examInfo");

    if (data) {
        try {   
            /**
             * Exam data in JSON format.
             * @type {Object}
             */
            const examFull = JSON.parse(data);
            /**
             * HTML content representing the exam information.
             * @type {String}
             */
            let htmlContent = `<h1>${examFull.number}</h1>`;
                htmlContent += `<h2>${examFull.title}</h2>`;
            
            examFull.questions.forEach((question, index) => {
                htmlContent += `<h4>Pregunta ${index + 1}: ${question.title}</h4>`;
                htmlContent += `<p>tipo : ${question.type}</p>`;
                htmlContent += `<p>respuestas: ${question.answer}</p>`;
                htmlContent += `<p>opciones:</p>`;
                htmlContent += `<ol>`; 
                question.options.forEach((option, optionIndex) => {
                    htmlContent += `<li>- ${option.content}</li>`; // Cada opción como un elemento de lista
                });
                htmlContent += `</ol>`; 
            });
            examInfoDiv.innerHTML = htmlContent;
        } catch (error) {
            examInfoDiv.innerHTML = "<p>Error al analizar el contenido de examFull.json</p>";
            console.error("Error al analizar el contenido de examFull.json:", error);
        }
    } else {
        examInfoDiv.innerHTML = "<p>No se encontró el contenido de examFull.json en el almacenamiento de la extension..</p>";
        console.error("No se encontró el contenido de examFull.json en el almacenamiento de la extension.");
    }

});
