/**
 * Function that executes when the window has fully loaded. 
 * Retrieves the data stored under the key "examFull" in the browser storage 
 * and displays it in the HTML element with the id "examInfo".
 * 
 * @param {String} key - The key under which the data was stored.
 * @param {Function} callback - Callback function that executes when the data has been retrieved.
 *                               This function is expected to take one parameter (the retrieved data).
 */

let answersHidden = false;

window.onload = function () {
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
                let htmlContent = `<div id="exam">`;
                htmlContent += `<h3>Examen ${examFull.number}</h3>`;
                htmlContent += `<h1>${examFull.title}</h1>`;

                htmlContent += `<div id="examContent">`;

                examFull.questions.forEach((question, index) => {
                    htmlContent += `<h4>Pregunta ${index + 1}: ${question.title}</h4>`;
                    //htmlContent += `<p>tipo : ${question.type}</p>`;

                    if (!answersHidden) {
                        if (question.answers.length === 1) {
                            htmlContent += `<p id="answers-${index + 1}">Respuesta = `;
                        } else {
                            htmlContent += `<p id="answers-${index + 1}">Respuestas = `;
                        }
                        question.answers.forEach((answer, answerIndex) => {
                            if (answerIndex === 0) {
                                htmlContent += `${answer + 1}`;
                            } else {
                                htmlContent += `, ${answer + 1}`;
                            }
                        });
                        htmlContent += `</p>`;
                    }

                    if (question.type === "singleOption") {
                        const radioGroup = `question_${index + 1}`;
                        question.options.forEach((option, optionIndex) => {
                            htmlContent += `<input type="radio" name="${radioGroup}" value="${optionIndex + 1}">${optionIndex + 1}) ${option.content}<br>`;
                        });
                    }

                    if (question.type === "multiOptions") {
                        const checkboxGroup = `question_${index + 1}`;
                        question.options.forEach((option, optionIndex) => {
                            htmlContent += `<input type="checkbox" name="${checkboxGroup}"value="${optionIndex + 1}">${optionIndex + 1}) ${option.content}<br>`;
                        });
                    }
                    if (question.type === "organizeOptions") {
                        htmlContent += `<ul id="sortableList-${index + 1}">`;
                        question.answers.forEach((answer) => {
                            htmlContent += `<li draggable="true" id="item${answer + 1 + index + 1}">${question.options[answer].content}</li>`;
                        });
                        htmlContent += `</ul>`;
                    }

                });
                htmlContent += `</div>`;//id="examContent"
                htmlContent += `</div>`;//id="exam"
                htmlContent += `<div class="side-panel">`;
                htmlContent += `<button id="save">Guardar respuestas</button>`;
                htmlContent += `<button id="hide">alternar respuestas</button>`;
                htmlContent += `<button id="download">descargar examen</button>`;
                htmlContent += `<button id="copyToClipboard">copiar examen</button>`;
                htmlContent += `<label for="fileInput" class="custom-file-input">`;
                htmlContent += `<span class="custom-file-input-label">Seleccionar Archivo</span>`;
                htmlContent += `</label>`;
                htmlContent += `<input type="file" id="fileInput" accept=".json" style="display:none;">`;


                htmlContent += `<button id="uploadButton">subir examen</button>`;
                htmlContent += `</div>`;
                examInfoDiv.innerHTML = htmlContent;

                /*prevents unsafe-inline, the events listeners most be attatched after the html is written*/

                const listItems = document.querySelectorAll('li[draggable="true"]');
                listItems.forEach(item => {
                    item.addEventListener('dragstart', function (event) {
                        drag(event, this.parentNode.id);
                    });
                });

                const saveButton = document.getElementById("save");
                saveButton.addEventListener("click", function () {
                    saveAnswers();
                    location.reload();
                });
                const hideButton = document.getElementById("hide");
                hideButton.addEventListener("click", function () {
                    toggleAnswersVisibility();
                });
                const downloadButton = document.getElementById("download");
                downloadButton.addEventListener("click", function () {
                    downloadJSON("examFull");
                });
                const copyToClipboardButton = document.getElementById("copyToClipboard");
                copyToClipboardButton.addEventListener("click", function () {
                    copyToClipboard();
                });

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

            } catch (error) {

                let htmlContent = "<p>Error al analizar el contenido de examFull.json</p>";
                htmlContent += `<label for="fileInput" class="custom-file-input">`;
                htmlContent += `<span class="custom-file-input-label">Seleccionar Archivo</span>`;
                htmlContent += `</label>`;
                htmlContent += `<input type="file" id="fileInput" accept=".json" style="display:none;">`;
                htmlContent += `<button id="uploadButton">subir examen</button>`;
                console.error("Error parsing examFull JSON:", error);
                examInfoDiv.innerHTML = htmlContent;
            }
        } else {
            let htmlContent = "<p>No se encontró el contenido de examFull.json en el almacenamiento de la extension.</p>";
            htmlContent += `<label for="fileInput" class="custom-file-input">`;
            htmlContent += `<span class="custom-file-input-label">Seleccionar Archivo</span>`;
            htmlContent += `</label>`;
            htmlContent += `<input type="file" id="fileInput" accept=".json" style="display:none;">`;
            htmlContent += `<button id="uploadButton">subir examen</button>`;
            examInfoDiv.innerHTML = htmlContent;
            console.error("No examFull JSON found in browser's storage.");
        }
        const fileInput = document.getElementById("fileInput");
        fileInput.addEventListener("change", function () {
            if (this.files.length > 0) {
                this.previousElementSibling.querySelector('.custom-file-input-label').textContent = this.files[0].name;
            }
        });
        const uploadButton = document.getElementById("uploadButton");
        uploadButton.addEventListener("click", function () {
            const fileInput = document.getElementById("fileInput");
            const file = fileInput.files[0];
            file.name = "examFull.json";//ensure the file name is examFull.json
            uploadJSON(file);
            if (file) {
                location.reload();
            } else {
                alert("Sin archivo seleccionado");
            }
        });

    });
}

function copyToClipboard() {
    const examDiv = document.getElementById("examContent");
    const textToCopy = examDiv.innerText;

    navigator.clipboard.writeText(textToCopy)
        .then(() => {
            alert("Copiado al portapapeles!");
        })
        .catch((error) => {
            console.error("ERROR: Unable to copy to clipboard: ", error);
            alert("Error al copiar al portapapeles.");
        });
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
                        const listItems = document.querySelectorAll(`#sortableList-${index + 1} li`);
                        listItems.forEach((item) => {
                            const optionIndex = parseInt(item.id.replace('item', '')) - (index + 2);
                            console.log("optionIndex: " + optionIndex);
                            selectedOptions.push(optionIndex);
                        });
                    }
                    // Update the answers array for the current question if selectedOptions is not empty
                    if (selectedOptions.length > 0) {
                        examFull.questions[index].answers = selectedOptions;
                    }
                });

                // Store the updated examFull object back in browser's storage
                console.log("Updated examFull object:", examFull);
                setBrowserStorage("examFull", JSON.stringify(examFull));
            } catch (error) {
                console.error("Error parsing examFull JSON:", error);
            }
        } else {
            console.error("No examFull JSON found in browser's storage.");
        }
    });
}

function copyToClipboard() {
    const examDiv = document.getElementById("examContent");
    const textToCopy = examDiv.innerText;

    navigator.clipboard.writeText(textToCopy)
        .then(() => {
            alert("Copiado al portapapeles!");
        })
        .catch((error) => {
            console.error("ERROR: Unable to copy to clipboard: ", error);
            alert("Error al copiar al portapapeles.");
        });
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
                        const listItems = document.querySelectorAll(`#sortableList-${index + 1} li`);
                        listItems.forEach((item) => {
                            const optionIndex = parseInt(item.id.replace('item', '')) - (index + 2);
                            console.log("optionIndex: " + optionIndex);
                            selectedOptions.push(optionIndex);
                        });
                    }
                    // Update the answers array for the current question if selectedOptions is not empty
                    if (selectedOptions.length > 0) {
                        examFull.questions[index].answers = selectedOptions;
                    }
                });

                // Store the updated examFull object back in browser's storage
                console.log("Updated examFull object:", examFull);
                setBrowserStorage("examFull", JSON.stringify(examFull));
            } catch (error) {
                console.error("Error parsing examFull JSON:", error);
            }
        } else {
            console.error("No examFull JSON found in browser's storage.");
        }
    });
}

function toggleAnswersVisibility() {
    answersHidden = !answersHidden;
    const answers = document.querySelectorAll("p[id^='answers-']");
    answers.forEach(answer => {
        answer.classList.toggle("hidden");
    });
}

function drag(ev, listId) {
    ev.dataTransfer.setData("text", ev.target.id);
    ev.dataTransfer.setData("listId", listId);
}