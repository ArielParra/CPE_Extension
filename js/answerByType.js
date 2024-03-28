function answerByType(){
    getBrowserStorage("examFull", (data) => {
        const examFull = JSON.parse(data);
        examFull.questions.forEach((question, index) => {
            switch(question.type){
                case "singleOption":
                    //array lenght must be 1
                    examFull.answer = [1];
                    break;
                case "multiOptions":
                    //array lenght or order doesnt mather
                    examFull.answer = [2,1];
                    break;
                case "organizeOptions":
                    //array order matters
                    examFull.answer = [1,2,3];
                    break;
            }
        setBrowserStorage("examFull",examFull);
        });
    });
};