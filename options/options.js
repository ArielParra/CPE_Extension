chrome.runtime.sendMessage({ type: 'catExamFull' }, response => {
  if (response && response.data) {
    console.log(response.data);
  }
});