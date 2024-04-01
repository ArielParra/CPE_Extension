/**
 * @description Prompts the user to set an exam number as a cookie based on the available exams on the page.
 * 
 * @function setExamCookie
 */
function setExamCookie(){
  if (window.location.pathname.includes("/cursos/view/")){

  if (getPath().includes("/cursos/view/")){
    const appEstructuraCurso = document.querySelector("app-estructura-curso");
    if (appEstructuraCurso) {
        const buttons = appEstructuraCurso.querySelectorAll('button.mat-focus-indicator.mat-button.mat-button-base');
        let count = 0;
        buttons.forEach(button => {
            if (button.textContent.includes("Examen")) {
                count++;
            }
        });

        let examNumber = parseInt(prompt("Introduce un examen desde 1 hasta " + count + ":"));
        if (examNumber >= 1 && examNumber <= count) {
            setCookie("examNumber", examNumber, 1);
        } else {
            alert("ERROR: introduce un numero del 1 al " + count + ".");
        }
    } else {
        console.error('ERROR: no exam found on this page');
    }
    } else {
        console.error("ERROR: Not inside course ");
    }
}
