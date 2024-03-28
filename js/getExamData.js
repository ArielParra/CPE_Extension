/**
 * Retrieves exam data from the current webpage and stores it in local storage as a JSON string.
 * Exam data includes the exam title and questions with their respective options.
 * If no exam data is found on the page, appropriate error messages are logged or displayed.
 */
function getExamData() {
  console.log("getExamData function called");

  /**
   * Represents the structure of the exam data.
   * @typedef {Object} examData
   * @property {string} title - The title of the exam.
   * @property {Array} questions - An array of question objects.
   */
  const examData = {
    number: "",
    title: "",
    questions: [],
  };//type for the JSON

  const appCrearExamen = document.querySelector("app-crear-examen");

  if (appCrearExamen){
    const titleDiv = appCrearExamen.querySelector("div.title-exam.ng-star-inserted");

    if (titleDiv) {
      examData.number = titleDiv.querySelector('p').textContent.trim();
      if(!cookieExists("examNumber")){
        const numberRegex = /\d+/;
        const examNumber = examData.number.match(numberRegex)[0]; 
        setCookie("examNumber", examNumber, 1);
      }
      examData.title = titleDiv.querySelector('h2').textContent.trim();

      const matCards = appCrearExamen.querySelectorAll("mat-card.mat-card.mat-focus-indicator.question");

      if (matCards.length > 0) {
        matCards.forEach((matCard, index) => {
          /**
           * Represents an option for a question.
           * @typedef {Object} option
           * @property {string} content - The content of the option.
           */
          const options = [];
          /**
           * Represents a single question with its options.
           * @typedef {Object} question
           * @property {string} title - The title or content of the question.
           * @property {string} type - The type of the question (singleOption, multiOptions, or organizeOptions).
           * @property {Array} options - An array of option objects.
           */
          const question = {
            title: "",
            type: "",
            anwer: [],
            options: [],
          };

          const labelElements = matCard.querySelectorAll("label");
          const spanElements = matCard.querySelectorAll(".cdk-drag.example-box.hljs-h1.ng-star-inserted span");

          if (labelElements.length > 0) {
            labelElements.forEach((label) => {
              const option = {
                content: "",
              };
              if (label.classList.contains("form-check-label")) {
                question.title = label.textContent.trim();
              }
              if (label.classList.contains("mat-radio-label")) {
                question.type = "singleOption";
                option.content = label.textContent.trim();
              } else if (label.classList.contains("mat-checkbox-layout")) {
                question.type = "multiOptions";
                option.content = label.textContent.trim();
              }
              if (option.content !== "") {
                question.options.push(option);
              }
            }); // foreach label
          } // labels

          //organizeoption exception
          if (spanElements.length > 0) {
            spanElements.forEach((span) => {
              const option = {
                content: span.textContent.trim(),
              };
            question.type = "organizeOptions";
            question.options.push(option);
            }); // foreach span
          } // span exist
          examData.questions.push(question);
        }); // matcard forEach
      } // matcards exist
    } // titlediv exist
     if (examData.questions.length > 0){
        localStorage.setItem("examData", JSON.stringify(examData));
        console.log("examData.json guardado en localsotrage");
     } else {
        console.log("Error: No se encontraron preguntas en esta pagina");
    }
  }else{
    console.log("Error: No se encontro el examen en esta pagina");
 } // appCrearExamen exist

} 