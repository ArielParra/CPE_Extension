/**
 * This function attaches event listeners to all buttons in the document and sends a message to the active tab
 * when a button is clicked, the message is the id string of the button.
 * It first checks the type of browser extension API available and sends the message accordingly.
 */
document.querySelectorAll("button").forEach(button => {
  button.addEventListener("click", function() {
    const buttonId = this.id;
    const message = { type: "buttonClick", button: buttonId };
    sendMessage(message);
  });
});