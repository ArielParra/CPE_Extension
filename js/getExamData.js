function getExamData() {
  console.log("getExamData function called");
  const examData = {
    title: "",
    questions: [],
  };//type for the JSON

  const appCrearExamen = document.querySelector("app-crear-examen");

  if (appCrearExamen) {
    const titleDiv = appCrearExamen.querySelector("div.title-exam.ng-star-inserted");

    if (titleDiv) {
      examData.title = titleDiv.textContent.trim(); // Exam title 

      const matCards = appCrearExamen.querySelectorAll("mat-card.mat-card.mat-focus-indicator.question");

      if (matCards.length > 0) {
        matCards.forEach((matCard, index) => {
          const options = [];
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
        alert("examData JSON saved");
     } else {
        alert("Error: No questions found");
    }
  }else{
    alert("Error: No exam found");
 } // appCrearExamen exist

} 