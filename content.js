if (typeof browser !== 'undefined') {
  browser.runtime.onMessage.addListener((message) => {
    handleMessage(message);
  });
} else if (typeof chrome !== 'undefined') {
  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    handleMessage(message);
  });
} else {
  console.error("No se pudo detectar la API de extensiones.");
}

function handleMessage(message) {
  if (message && message.type === "buttonClick") {
    switch (message.button) {
      case "getExamData":
        getExamData();
        break;
      case "setExamFull":
        setExamFull();
        break;
      case "delExamFull":
        delExamFull();
        break;
    }
  }
}

