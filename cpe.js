document.body.style.border = "10px solid blue"; // to detect the use of the extension

function main() {
  const appCrearExamen = document.querySelector("app-crear-examen");

  if (appCrearExamen) {
    const titleDiv = appCrearExamen.querySelector(
      "div.title-exam.ng-star-inserted"
    );

    if (titleDiv) {
      console.log(
        'Found <div> with class "title-exam ng-star-inserted":',
        titleDiv.textContent.trim()
      );

      const matCards = appCrearExamen.querySelectorAll(
        //matcard is the class of each of the 10 questions cards
        "mat-card.mat-card.mat-focus-indicator.question"
      );

      if (matCards.length > 0) {
        matCards.forEach((matCard, index) => {
          console.log(`mat-card ${index + 1}`);
          const labelElements = matCard.querySelectorAll("label");

          const spanElements = matCard.querySelectorAll(
            ".cdk-drag.example-box.hljs-h1.ng-star-inserted span"
          );

          if (labelElements.length > 0) {
            labelElements.forEach((label, index) => {
              const content = label.textContent.trim();
              let category = "";

              if (label.classList.contains("form-check-label")) {
                category = "QuestionTitle";
              }

              if (label.classList.contains("mat-radio-label")) {
                category = "singleAnswer";
              } else if (label.classList.contains("mat-checkbox-layout")) {
                category = "multiAnswer";
              }
              console.log(
                `Label number ${index + 1
                }, category: ${category}, content: ${content}`
              );
            });
          }

          if (spanElements.length > 0) {
            spanElements.forEach((span, index) => {
              const content = span.textContent.trim();
              let category = "organizeAnswer";
              console.log(
                `Span number ${index + 2
                }, category: ${category}, content: ${content}`
              );
            });
          } else {
            //console.log("No <span> elements found inside <mat-card>.");
          }
        });
      } else {
        //console.log("No <mat-card> elements found inside <app-crear-examen>.");
      }
    } else {
      //console.log('No <div> with class "title-exam ng-star-inserted" found inside <app-crear-examen>.');
    }

    // Disconnect the observer after the first invocation
    observer.disconnect();
  } else {
    //console.log("<app-crear-examen> does not exist on this page.");
  }
}

// Use MutationObserver to continuously check for changes in the DOM
const observer = new MutationObserver(main);

// Configure the observer to watch for changes in the subtree
observer.observe(document.body, { subtree: true, childList: true });

