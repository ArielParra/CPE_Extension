document.querySelectorAll("button").forEach(button => {
  button.addEventListener("click", function() {
    const buttonId = this.id;
    if (typeof browser !== 'undefined') {
      browser.tabs.query({active: true, currentWindow: true}, function(tabs) {
        browser.tabs.sendMessage(tabs[0].id, {type: "buttonClick", button: buttonId});
      });
    } else if (typeof chrome !== 'undefined') {
      chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {type: "buttonClick", button: buttonId});
      });
    } else {
      console.error("No se pudo detectar la API de extensiones.");
    }
  });
});

