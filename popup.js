document.querySelectorAll("button").forEach(button => {
  button.addEventListener("click", function() {
    const buttonId = this.id;
    browser.tabs.query({active: true, currentWindow: true}, function(tabs) {
      browser.tabs.sendMessage(tabs[0].id, {type: "buttonClick", button: buttonId});
    });
  });
});

