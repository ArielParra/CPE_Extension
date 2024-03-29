/**
 * Clicks on the exam button within the app-estructura-curso element.
 */
function clickExam() {
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
            if(cookieExists("examNumber")){
                let examNumber = getCookie("examNumber");
                buttons[0].click();//to refresh the exam
                if (examNumber >= 1 && examNumber <= count) {
                    examButtons[examNumber - 1].click();
                    console.log("Clicked exam number " + examNumber);
                }
            } else {
                console.log("ERROR: examNumber cookie does not exist.");
            }
        } else {
            console.log('No exam buttons found on this page.');
        }
    } else {
        console.log('No exam found on this page.');
    }
}
