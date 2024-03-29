function clickButtons() {
    const appEstructuraCurso = document.querySelector("app-estructura-curso");
    if (appEstructuraCurso) {
        const buttons = appEstructuraCurso.querySelectorAll('button.mat-focus-indicator.mat-button.mat-button-base');
        async function clickButtonAtIndex(index) {
            if (index < buttons.length) {
                if (!buttons[index].textContent.includes("Examen")) {
                    buttons[index].click();
                    await new Promise(resolve => setTimeout(resolve, 100)); 
                }
                await clickButtonAtIndex(index + 1); 
            }
        }
        clickButtonAtIndex(0);
    } else {
        console.log('No exam found on this page.');
    }
}
