function setExamCookie(){
    console.log("setExamCookie function called");
    let examNumber = parseInt(prompt("Introduce un examen desde 1 hasta 12:"));
    if (examNumber >= 1 && examNumber <= 12) {
        setCookie("examNumber", examNumber, 1);
    } else {
        alert("Error: introduce un numero del 1 al 12.");
    }
}
