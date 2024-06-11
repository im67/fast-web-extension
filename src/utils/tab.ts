export const getCurrentActiveTab = async () => {
  return new Promise<chrome.tabs.Tab>((resolve, reject) => {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      if (tabs.length > 0) {
        resolve(tabs[0])
      }
      reject()
    })
  })
}
