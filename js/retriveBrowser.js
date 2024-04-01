async function retrieveBrowser(key) {
  try {
    let storedData;
    if (typeof browser !== 'undefined') {
      // Using browser.storage.local for WebExtensions API
      storedData = await browser.storage.local.get({ [key]: null });
    } else if (typeof chrome !== 'undefined' && chrome.storage) {
      // Fallback to chrome.storage.local for Chromium-based browsers
      storedData = await new Promise((resolve, reject) => {
        chrome.storage.local.get([key], (data) => {
          resolve(data);
        });
      });
    } else {
      console.error('Browser storage API not found');
      return null;
    }
    
    // Extract data for the given key
    const data = storedData[key] || null;
    console.log(`${key} retrieved successfully:`, data);
    
    // You can return data here if you need to use it outside this function
    return data;
  } catch (error) {
    console.error(`Error retrieving ${key}: `, error);
    return null;
  }
}

