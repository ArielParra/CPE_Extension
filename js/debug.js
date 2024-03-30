/**
 * @description Logs debug information related to the extension's environment and stored data.
 * Checks the type of browser API (Firefox or Chrome) being used.
 * Checks for the existence of certain data in local storage and cookies.
 * Retrieves and logs the status of the 'examFull' data from browser storage.
 * 
 * @function debug
 */
function debug() {
    typeof browser !== 'undefined' ? console.log("Extension API: firefox") :
    typeof chrome !== 'undefined' ? console.log("Extension API: chrome") :
    console.error("Extension API not detected.");

 
    cookieExists("examNumber") ?
    console.log('examNumber cookie exists, value: ' + getCookie("examNumber")) :
    console.log('examNumber cookie does NOT exist');

    localStorage.getItem("examData") ?
    console.log('examData.json exists in local storage') :
    console.error('examData.json does NOT exist in local storage');
    

    getBrowserStorage("examFull", examFull => console[examFull ? 'log' : 'error'](
    examFull 
        ? 'examFull.json retrieved from browser storage'
        : 'examFull.json NOT retrieved from browser storage'
    ));
    
}
