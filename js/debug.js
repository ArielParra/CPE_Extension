function debug() {
    typeof browser !== 'undefined' ? console.log("Extension API: firefox") :
    typeof chrome !== 'undefined' ? console.log("Extension API: chrome") :
    console.error("Extension API not detected.");

    localStorage.getItem("examData") ?
    console.log('examData exists in local storage') :
    console.log('examData does NOT exist in local storage');

    localStorage.getItem("examFull") ?
    console.log('examFull exists in local storage') :
    console.log('examFull does NOT exist in local storage');

    cookieExists("examNumber") ?
    console.log('examNumber cookie exists, value: ' + getCookie("examNumber")) :
    console.log('examNumber cookie does NOT exist');

    getBrowserStorage("examFull", examFull => console.log(examFull 
    ? 'examFull data retrieved from browser storage'
    : 'examFull data NOT retrieved from browser storage'));
    
}
