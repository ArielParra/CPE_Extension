/**
 * @description Finds and clicks buttons within a specific DOM element, excluding those containing the text "Examen".
 * This function is designed to automate button clicks on a webpage.
 * It searches for buttons within the 'app-estructura-curso' element and clicks them sequentially.
 * Buttons are clicked asynchronously to allow for delays between clicks.
 *
 * @function clickButtons
 */
function clickButtons() {
    const appEstructuraCurso = document.querySelector("app-estructura-curso");
    if (appEstructuraCurso) {
        const buttons = appEstructuraCurso.querySelectorAll('button.mat-focus-indicator.mat-button.mat-button-base');
        /**
         * @description Recursive function to click buttons at specified indices within the 'buttons' NodeList.
         * @async
         * @param {number} index - The index of the button to be clicked.
         * @returns {Promise<void>}
         */
        async function clickButtonAtIndex(index) {
            if (index < buttons.length) {
                if (!buttons[index].textContent.includes("Examen")) {
                    buttons[index].click();
                    await new Promise(resolve => setTimeout(resolve, 100)); 
                }
                await clickButtonAtIndex(index + 1); 
            } else {
                location.reload(); // After all buttons have been clicked, reload the page
            }
        }
        clickButtonAtIndex(0); 
    } else {
        console.log('No exam found on this page.');
    }
}
