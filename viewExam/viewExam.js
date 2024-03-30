/**
 * Function that executes when the window has fully loaded. 
 * Retrieves the data stored under the key "examFull" in the browser storage 
 * and displays it in the HTML element with the id "examInfo".
 * 
 * @param {String} key - The key under which the data was stored.
 * @param {Function} callback - Callback function that executes when the data has been retrieved.
 *                               This function is expected to take one parameter (the retrieved data).
 */
window.onload =  function() {
    getBrowserStorage("examFull", (data) => {
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
                        htmlContent += `<p id="answers-${index + 1}">Answer = ${answer+1}`;
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
                        htmlContent += `<li draggable="true" id="item${optionIndex + 1 + index + 1}">${option.content}</li>`;
                    });
                    htmlContent += `</ul>`;
                }
                /*prevents unsafe-inline*/
             const draggable = document.querySelectorAll('li[draggable="true"]');
             draggable.forEach(item => {
                 item.addEventListener('dragstart', function(event) {
                     drag(event, this.parentNode.id);
                 });
             }); 

            });
            htmlContent += `<hr>`;
            //htmlContent +=`<button " onclick="saveAnswers"}>save</button>`
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
}

function drag(ev, listId) {
    ev.dataTransfer.setData("text", ev.target.id);
    ev.dataTransfer.setData("listId", listId);
}
  
document.addEventListener('DOMContentLoaded', function () {
    const listsContainer = document.getElementById('examInfo');

    listsContainer.addEventListener('dragover', function (e) {
        e.preventDefault();
    });

    listsContainer.addEventListener('drop', function (e) {
        e.preventDefault();
        const data = e.dataTransfer.getData("text");
        const listId = e.dataTransfer.getData("listId");
        const draggedItem = document.getElementById(data);
        const target = e.target.closest('li');

        if (target && target !== draggedItem && listId === target.parentNode.id) {
            const parent = target.parentNode;
            const nextSibling = target.nextSibling === draggedItem ? target : target.nextSibling;

            parent.insertBefore(draggedItem, nextSibling);
        }
    });
});

/* TODO: implement MoveListItems.html code into organizeOptions list ,
   TODO: implement saveAnswers function */