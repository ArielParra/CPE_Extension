/**
 * Clicks on the exam button within the app-estructura-curso element.
 */
function clickExam() {
    console.log("clickExam function called");
    const appEstructuraCurso = document.querySelector("app-estructura-curso");
    if (appEstructuraCurso) {
        const buttons = appEstructuraCurso.querySelectorAll('button.mat-focus-indicator.mat-button.mat-button-base');
        let examButtons = [];
        buttons.forEach(button => {
            if (button.textContent.includes("Examen")) {
                examButtons.push(button);
            }
        });

        if (examButtons.length > 0) {
            let count = examButtons.length;
            
            let examNumber = parseInt(prompt("Introduce un examen desde 1 hasta " + count + "):"));

            if (examNumber >= 1 && examNumber <= count) {
                examButtons[examNumber - 1].click();
                console.log("Clicked exam number " + examNumber);
            } else {
                alert("Error: introduce un numero del 1 al " + count + ".");
            }
        } else {
            console.log('No exam buttons found on this page.');
        }
    } else {
        console.log('No se encontro el examen en esta pagina.');
    }
}
