/**
 * @descriotion Updates the 'examFull' data in local storage based on the 'examData' stored.
 * 
 * If 'examData' is present in local storage:
 * - If 'examFull' is already present, checks if the exam is the same. If not, prompts the user to delete 'examFull'.
 * - Compares 'examData' and 'examFull' to find unique questions and adds them to 'examFull'.
 * - Saves the updated 'examFull' in local storage.
 * - Logs appropriate messages based on the actions performed.
 * 
 * If 'examData' is not present in local storage, logs an error message.
 * 
 * @function setExamFull
 */
function setExamFull() {

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
        console.log("Unique questions added to examFull.json");
      } else {
        console.log("No unique questions to add");
      }
    } else {
      localStorage.setItem("examFull", JSON.stringify(examData));
      console.log("examFull.json file created and filled with questions from examData.json");
    }
  } else {
    console.log("Error: examData.json not found in localStorage");
  }
}
