function clickButtons() {
    const appEstructuraCurso = document.querySelector("app-estructura-curso");
    if (appEstructuraCurso) {
        const buttons = appEstructuraCurso.querySelectorAll('button.mat-focus-indicator.mat-button.mat-button-base');
        for (let i = 0; i < buttons.length; i++) {
            /* TODO: find why this doesnt end */
            const button = buttons[i];
            if (!button.textContent.includes("Examen")) {
                button.click();
            }
            if(i==buttons.length-1){
                return;
            }
        }
    } else {
        console.log('No exam found on this page.');
    }
}
