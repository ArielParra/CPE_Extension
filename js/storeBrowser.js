async function storeBrowser(name, data) {
  try {
    if (typeof browser !== 'undefined') {
      await browser.storage.local.set({ [name]: data });
    } else if (typeof chrome !== 'undefined' && chrome.storage) {
      chrome.storage.local.set({ [name]: data });
    }
    console.log(`${name} stored successfully`);
  } catch (error) {
    console.error(`Error storing ${name}: `, error);
  }
}

