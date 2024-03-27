browser.runtime.onMessage.addListener((message) => {
  if (message && message.type === "buttonClick") {
    switch (message.button) {
    case "getExamData":
      getExamData();
      break;
    case "catExamFull":
      catExamFull();
      break;
    case "delExamFull":
      delExamFull();
      break;
    }
    
  }//message
});
