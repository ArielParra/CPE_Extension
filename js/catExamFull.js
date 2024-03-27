function catExamFull() {
    console.log("catExamFull function called");

    const examFull= localStorage.getItem("examFull");
    if(examFull){
        const message = {type: "catExamFull", examFull};
        //Error in event handler: TypeError: Cannot read properties of undefined (reading 'query')
        sendMessage(message);
    }
}