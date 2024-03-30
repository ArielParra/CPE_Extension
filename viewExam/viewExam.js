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
                    // Loop through the options according to the order in examFull
                    question.options.forEach((option, optionIndex) => {
                        const originalIndex = examFull.questions[index].answers.indexOf(optionIndex);
                        htmlContent += `<li draggable="true" id="item${originalIndex +1  + index + 1}">${question.options[originalIndex].content}</li>`;
                    });
                    htmlContent += `</ul>`;
                }
                
            });
            htmlContent += `<hr>`;
            htmlContent +=`<button id="save">save</button>`
            examInfoDiv.innerHTML = htmlContent;

            /*prevents unsafe-inline, the events listeners most be attatched after the html is written*/

            const listItems = document.querySelectorAll('li[draggable="true"]');
            listItems.forEach(item => {
            item.addEventListener('dragstart', function(event) {
                drag(event, this.parentNode.id);
                });
            });

            const saveButton = document.getElementById("save");
            saveButton.addEventListener("click", function() {
                saveAnswers(); 
            });


        } catch (error) {
            examInfoDiv.innerHTML = "<p>Error al analizar el contenido de examFull.json</p>";
            console.error("Error parsing examFull JSON:", error);
        }
    } else {
        examInfoDiv.innerHTML = "<p>No se encontró el contenido de examFull.json en el almacenamiento de la extension..</p>";
        console.error("No examFull JSON found in browser's storage.");
    }
    });
}

function drag(ev, listId) {
    ev.dataTransfer.setData("text", ev.target.id);
    ev.dataTransfer.setData("listId", listId);
}

function saveAnswers() {
    // Retrieve examFull object from browser's storage
    getBrowserStorage("examFull", (data) => {
        if (data) {
            try {
                // Parse the JSON data
                let examFull = JSON.parse(data);

                // Iterate over questions to update answers
                examFull.questions.forEach((question, index) => {
                    let selectedOptions = [];

                    // Retrieve selected options for single choice questions
                    if (question.type === "singleOption") {
                        const selectedInput = document.querySelector(`input[name="question_${index + 1}"]:checked`);
                        if (selectedInput) {
                            selectedOptions.push(parseInt(selectedInput.value - 1));
                        }
                    }

                    // Retrieve selected options for multiple choice questions
                    if (question.type === "multiOptions") {
                        const selectedInputs = document.querySelectorAll(`input[name="question_${index + 1}"]:checked`);
                        selectedInputs.forEach(input => {
                            selectedOptions.push(parseInt(input.value - 1));
                        });
                    }
                    if (question.type === "organizeOptions") {
                        // Retrieve the order of list items
                        const listItems = document.querySelectorAll(`#sortableList-${index + 1} li`);
                        listItems.forEach((item) => {
                            const optionIndex = parseInt(item.id.replace('item', '')) - (index + 2);
                            selectedOptions.push(optionIndex);
                        });
                    }
                    // Update the answers array for the current question if selectedOptions is not empty
                    if (selectedOptions.length > 0) {
                        examFull.questions[index].answers = selectedOptions;
                    }
                });

                // Store the updated examFull object back in browser's storage
                setBrowserStorage("examFull", JSON.stringify(examFull));
            } catch (error) {
                console.error("Error parsing examFull JSON:", error);
            }
        } else {
            console.error("No examFull JSON found in browser's storage.");
        }
    });
    location.reload();
}



document.addEventListener('DOMContentLoaded', function () {

    const listsContainer = document.getElementById('examInfo');
    

    listsContainer.addEventListener('dragover', function (e) {
        e.preventDefault();
    });

    listsContainer.addEventListener('drop', function (e) {
        e.preventDefault();
        const data = e.dataTransfer.getData("text");
        console.log(data);
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
