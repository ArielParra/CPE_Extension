function answerByType(){
    getBrowserStorage("examFull", (data) => {
        const examFull = JSON.parse(data);
        examFull.questions.forEach((question, index) => {
            switch(question.type){
                case "singleOption":
                    //array lenght must be 1
                    break;
                case "multiOptions":
                    //array lenght or order doesnt mather
                    break;
                case "organizeOptions":
                    //array order matters
                    break;
            }
        });
    });
};