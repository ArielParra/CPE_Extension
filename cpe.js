document.body.style.border = "10px solid blue";

function main () {
  const appCrearExamen = document.querySelector('app-crear-examen');

  if (appCrearExamen) {
    const titleDiv = appCrearExamen.querySelector('div.title-exam.ng-star-inserted');

    if (titleDiv) {
      console.log('Found <div> with class "title-exam ng-star-inserted":', titleDiv.textContent.trim());

      const matCards = appCrearExamen.querySelectorAll('mat-card.mat-card.mat-focus-indicator.question');

      if (matCards.length > 0) {
        matCards.forEach((matCard, index) => {
          console.log(`mat-card ${index + 1}`);
          const labelElements = matCard.querySelectorAll('label');

          if (labelElements.length > 0) {
            labelElements.forEach((label, index) => {
              const content = label.textContent.trim();
              let category = '';

              // Check for classes and categorize accordingly
              if (label.classList.contains('form-check-label')) {
                category = 'form-check-label';//titulo pregunta
              }

              if (label.classList.contains('mat-radio-label')) {
                category = 'mat-radio-label';//single answer
              } else if (label.classList.contains('mat-checkbox-layout')) {
                category = 'mat-checkbox-layout';//multi answer
              }
              console.log(`Label number ${index + 1}, category: ${category}, content: ${content}`);
            });
          } else {
            console.log('No <label> elements found inside <app-crear-examen>.');
          }
        });
      } else {
        console.log('No <mat-card> elements found inside <app-crear-examen>.');
      }
    } else {
      console.log('No <div> with class "title-exam ng-star-inserted" found inside <app-crear-examen>.');
    }
  } else {
    console.log('<app-crear-examen> does not exist on this page.');
  }
}

// Initial check when the content script is executed
main();

// Use MutationObserver to continuously check for changes in the DOM
const observer = new MutationObserver(main);

// Configure the observer to watch for changes in the subtree
observer.observe(document.body, { subtree: true, childList: true });

