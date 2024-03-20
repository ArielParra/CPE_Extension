browser.runtime.onMessage.addListener((message) => {
  if (message && message.type === "buttonClick") {
    switch (message.button) {
    case "getExamData":
      getExamData();
      break;
    }

  }//message
});
