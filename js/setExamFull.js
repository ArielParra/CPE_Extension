/**
 * Checks if examData is available in local storage, then updates or creates examFull accordingly.
 * If examFull already exists, it appends unique questions from examData to it.
 * If examData is not found, an error message is logged.
 */
function setExamFull() {
  console.log("setExamFull function called");

  if (localStorage.getItem("examData")) {
    const examData = JSON.parse(localStorage.getItem("examData"));
    const examDataNumberAndTitle= examData.number + examData.title;

    if (localStorage.getItem("examFull")) {
      const examFull = JSON.parse(localStorage.getItem("examFull"));
      const examFullNumberAndTitle= examFull.number + examFull.title;

      if(examDataNumberAndTitle!=examFullNumberAndTitle){ 
        alert("El examen no es el mismo, favor de primero borra el examFull.json y vuelve a cargar el examData.json")
        return;
      }
      const uniqueQuestions = examData.questions.filter((question) => {
        return !examFull.questions.some((fullQuestion) => fullQuestion.title === question.title);
      });

      examFull.questions.push(...uniqueQuestions);

      if(uniqueQuestions != 0){
        localStorage.setItem("examFull", JSON.stringify(examFull));
        console.log("Preguntas únicas agregadas a examFull.json");
        alert("Preguntas únicas agregadas a examFull.json");
      } else {
        console.log("No habia Preguntas únicas para agregar");
        alert("No habia Preguntas únicas para agregar");
      }
 
    } else {
      localStorage.setItem("examFull", JSON.stringify(examData));
      console.log("Archivo examFull.json creado y poblado con las preguntas de examData.json");
      alert("Archivo examFull.json creado y poblado con las preguntas de examData.json");
    }
  } else {
    console.log("Error: No se encontró examData.json");
  }
}
