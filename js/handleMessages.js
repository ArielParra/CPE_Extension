/**
 * This script is responsible for handling messages from the browser extension's runtime.
 * It detects the type of browser extension API available and attaches event listeners accordingly.
 * If no extension API is detected, it logs an error message.
 */
if (typeof browser !== 'undefined') {
  browser.runtime.onMessage.addListener((message) => {
    handleMessages(message);
  });
} else if (typeof chrome !== 'undefined') {
  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    handleMessages(message);
  });
} else {
  console.error("No se pudo detectar la API de extensiones.");
}

/**
 * Attaches a message listener to the appropriate runtime API based on the browser type.
 * @param {Object} message The message received from the extension's runtime.
 */
function handleMessages(message) {
  if (message) {
  //button Message
    if (message.type === "buttonClick") {
      switch (message.button) {
        case "clickExam":
          clickExam();
          break;
        case "setExamFull":
            getExamData();
            setExamFull();
            //viewExamFull();
          break;
        case "delExamFull":
          delExamFull();
          break;
      }
    }
    //catExamFull
    if (message.type === "catExamFull") {
      console.log("catExamFull message received "+message.examFull);
    }
  }
}

