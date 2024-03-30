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
            let htmlContent = `<h3>Examen ${examFull.number}</h3>`;
                htmlContent += `<h1>${examFull.title}</h1>`;
            
            examFull.questions.forEach((question, index) => {
                htmlContent += `<h4>Pregunta ${index + 1}: ${question.title}</h4>`;
                //htmlContent += `<p>tipo : ${question.type}</p>`;

                question.answers.forEach((answer, answerIndex) => {
                    if (answerIndex === 0) {
                        htmlContent += `<p id="answers-${index + 1}_answer-${answerIndex + 1}">Answer = ${answer+1}`;
                    } else {
                        htmlContent += `, ${answer+ 1}`;
                    }
                });
                
                htmlContent += `</p>`

                if (question.type === "singleOption") {
                    const radioGroupName = `question_${index + 1}`;
                    question.options.forEach((option, optionIndex) => {
                        htmlContent += `<input type="radio" name="${radioGroupName}" value="${optionIndex + 1}">${optionIndex + 1}) ${option.content}<br>`;
                    });
                }
                
                if (question.type === "multiOptions") {
                    question.options.forEach((option, optionIndex) => {
                        htmlContent += `<input type="checkbox" value="${optionIndex + 1 }">${optionIndex + 1}) ${option.content}<br>`;
                    });
                }
                if (question.type === "organizeOptions") {
                    htmlContent += `<ul id="sortableList-${index + 1}">`; 
                    question.options.forEach((option, optionIndex) => {
                        htmlContent += `<li draggable="true" id="item${optionIndex + 1 + index + 1}" ondragstart="drag(event, 'sortableList-${index + 1}')">${option.content}</li>`;
                    });
                    htmlContent += `</ul>`;
                }                

            });
            htmlContent +=`<button " onclick="saveAnswers"}>save</button>`
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

  
/* TODO: implement MoveListItems.html code into organizeOptions list ,
   TODO: implement saveAnswers function */