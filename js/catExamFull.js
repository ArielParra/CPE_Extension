/**
 * catExamFull function retrieves the examFull data from local storage and sends a message.
 */
function catExamFull() {
    console.log("catExamFull function called");

    const examFull= localStorage.getItem("examFull");
    if(examFull){
        console.log("exist examFull");
        const message = {type: "catExamFull", examFull};
        //Error in event handler: TypeError: Cannot read properties of undefined (reading 'query')
        sendMessage(message);
    }
    console.log("end of catExamFull function");
}