function clickExam(){
    console.log("clickExam function called");
    const appEstructuraCurso = document.querySelector("app-estructura-curso");
    if (appEstructuraCurso) {
        const buttons = appEstructuraCurso.querySelectorAll('button.mat-focus-indicator.mat-button.mat-button-base');
        const examButton = buttons[buttons.length - 1]; // Select the last button
        if (examButton) {
            examButton.click();
            console.log('clicked the exam button');
        } else {
            console.error('No buttons found within app-estructura-curso.');
        }
    } else {
        console.error('Element app-estructura-curso not found.');
        alert('No se encontro el examen en esta pagina.')
    }
}
