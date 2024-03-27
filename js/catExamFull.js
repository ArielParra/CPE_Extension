function catExamFull() {
  console.log("catExamFull function called");

  if (localStorage.getItem("examData")) {
    const examData = JSON.parse(localStorage.getItem("examData"));

    if (localStorage.getItem("examFull")) {
      const examFull = JSON.parse(localStorage.getItem("examFull"));
      if(examData.title!=examFull.title){ 
        alert("El examen no es el mismo, favor de primero borra el examFull.json y vuelve a cargar el examData.json")
        return;
      }
      const uniqueQuestions = examData.questions.filter((question) => {
        return !examFull.questions.some((fullQuestion) => fullQuestion.title === question.title);
      });

      examFull.questions.push(...uniqueQuestions);

      localStorage.setItem("examFull", JSON.stringify(examFull));

      alert("Preguntas únicas agregadas a examFull.json");

    } else {
      localStorage.setItem("examFull", JSON.stringify(examData));
      alert("Archivo examFull.json creado y poblado con las preguntas de examData.json");
    }
  } else {
    alert("Error: No se encontró el archivo examData.json");
  }
}
