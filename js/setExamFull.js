/**
 * @descriotion Updates the 'examFull' data in browser storage based on the 'examData' stored.
 * 
 * If 'examData' is present in local storage:
 * - If 'examFull' is already present, checks if the exam is the same. If not, prompts the user to delete 'examFull'.
 * - Compares 'examData' and 'examFull' to find unique questions and adds them to 'examFull'.
 * - Saves the updated 'examFull' in browser storage.
 * - Logs appropriate messages based on the actions performed.
 * 
 * If 'examData' is not present in local storage, logs an error message.
 * 
 * @function setExamFull
 */
function setExamFull() {
  const examData = JSON.parse(localStorage.getItem("examData"));

  if (examData) {
      const examDataNumberAndTitle = examData.number + examData.title;
      console.log("examData.json saved in localStorage", examData);
      getBrowserStorage("examFull", (examFull) => {
          if (examFull) {
              console.log("Retrieved examFull from browser storage:", examFull);
              try {
                  examFull = JSON.parse(examFull);
                  const examFullNumberAndTitle = examFull.number + examFull.title;

                  if (examDataNumberAndTitle !== examFullNumberAndTitle) {
                      alert("El examen no es el mismo, favor de primero borrar el examFull.json y volver a cargar el examData.json");
                      return;
                  }

                  const uniqueQuestions = examData.questions.filter((question) => {
                      return !examFull.questions.some((fullQuestion) => fullQuestion.title === question.title);
                  });

                  examFull.questions.push(...uniqueQuestions);

                  if (uniqueQuestions.length !== 0) {
                      setBrowserStorage("examFull", JSON.stringify(examFull));
                      console.log("Unique questions added to examFull.json");
                  } else {
                      console.log("No unique questions to add");
                  }
              } catch (error) {
                  console.error("Error parsing examFull JSON:", error);
              }
          } else {
              setBrowserStorage("examFull", JSON.stringify(examData));
              console.log("examFull.json file created and filled with questions from examData.json");
          }
      });
  } else {
      console.log("Error: examData.json not found in localStorage");
  }
}
