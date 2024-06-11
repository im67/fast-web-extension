import { NpmWebsiteNS } from '../../typings/npmjs'

const npmjsTabHandler = (tabId: number, info: chrome.tabs.TabChangeInfo, tab: chrome.tabs.Tab) => {
  if (tab.url === NpmWebsiteNS.VERSION_URL) {
    
  }
}

const addTabListenerForNpmjs = () => {
  chrome.tabs.onUpdated.addListener(npmjsTabHandler)
}

export const init = () => {
  addTabListenerForNpmjs()
}
