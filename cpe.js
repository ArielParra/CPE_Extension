document.body.style.border = "10px solid blue"; // to detect the use of the extension

function main() {
  const examData = {
    title: "",
    questions: [],
  };

  const appCrearExamen = document.querySelector("app-crear-examen");

  if (appCrearExamen) {
    const titleDiv = appCrearExamen.querySelector("div.title-exam.ng-star-inserted");

    if (titleDiv) {
      examData.title = titleDiv.textContent.trim(); // title

      const matCards = appCrearExamen.querySelectorAll("mat-card.mat-card.mat-focus-indicator.question");

      if (matCards.length > 0) {
        matCards.forEach((matCard, index) => {
          const answers = [];
          const question = {
            number: index + 1,
            title: "",
            answers: [],
          };

          const labelElements = matCard.querySelectorAll("label");
          const spanElements = matCard.querySelectorAll(".cdk-drag.example-box.hljs-h1.ng-star-inserted span");

          if (labelElements.length > 0) {
            labelElements.forEach((label) => {
              const answer = {
                type: "",
                content: "",
              };

              if (label.classList.contains("form-check-label")) {
                question.title = label.textContent.trim();
              }

              if (label.classList.contains("mat-radio-label")) {
                answer.type = "singleAnswer";
                answer.content = label.textContent.trim();
              } else if (label.classList.contains("mat-checkbox-layout")) {
                answer.type = "multiAnswer";
                answer.content = label.textContent.trim();
              }
                if (answer.type !== "" && answer.content !== "") {
                    question.answers.push(answer);
                }

                      
            }); // foreach label
          } // labels

          if (spanElements.length > 0) {
            spanElements.forEach((span) => {
              const answer = {
                type: "organizeAnswer",
                content: span.textContent.trim(),
              };
              question.answers.push(answer);
            }); // foreach span
          } // span exist

          examData.questions.push(question);
        }); // matcard forEach
      } // matcards exist
    } // titlediv exist
  } // appCrearExamen exist
  localStorage.setItem("examData", JSON.stringify(examData));
} // main

// Use MutationObserver to continuously check for changes in the DOM
const observer = new MutationObserver(main);

// Configure the observer to watch for changes in the subtree
observer.observe(document.body, { subtree: true, childList: true });

