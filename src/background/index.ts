import { init as initNpmjsBackground } from './npmjs/tabMontior'
console.log('background is running')

initNpmjsBackground()

chrome.runtime.onMessage.addListener((request) => {
  if (request.type === 'COUNT') {
    console.log('background has received a message from popup, and count is ', request?.count)
  }
})
