/*TODO: finish implentation and logic */
function answerByType(){
    getBrowserStorage("examFull", (data) => {
        const examFull = JSON.parse(data);
        examFull.questions.forEach((question, index) => {
            switch(question.type){
                case "singleOption":
                    //array lenght must be 1
                    userInput= pickedOption;
                    examFull.questions[index].answer = [examFull.options[index][pickedOption]];
                    break;
                case "multiOptions":
                    //array lenght or order doesnt mather
                    examFull.questions[index].answer 
                    break;
                case "organizeOptions":
                    //array order matters
                    examFull.questions[index].answer 
                    break;
            }
        setBrowserStorage("examFull",examFull);
        });
    });
};