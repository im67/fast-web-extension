import { NpmWebsiteNS } from '../../typings/npmjs'

const injectReleaseCheckBtnFunction = () => {
  const CHECK_EL_STYLE = {
    color: '#0984e3',
    padding: '0 5px 0 5px',
    textDecoration: 'underline',
    cursor: 'pointer',
  }
  const versionEls = document.querySelectorAll('a.black-60.lh-copy.code')
  Array.from(versionEls).map((el) => {
    const sibling = document.createElement('div')
    Object.assign(sibling.style, CHECK_EL_STYLE)
    sibling.innerHTML = 'log'
    el.parentElement?.insertBefore(sibling, el.nextSibling)
  })
}

const injectReleaseCheckBtn = async (id: number) => {
  try {
    await chrome.scripting.executeScript({
      target: { tabId: id },
      func: injectReleaseCheckBtnFunction,
    })
  } catch (e) {
    console.error(e)
  }
}

const npmjsTabHandler = (tabId: number, info: chrome.tabs.TabChangeInfo, tab: chrome.tabs.Tab) => {
  const { id = -1 } = tab
  const { url = '' } = info
  if (NpmWebsiteNS.VERSION_URL_REGEXP.test(url ?? '')) {
    console.log(info)
    injectReleaseCheckBtn(id)
  }
}

const addTabListenerForNpmjs = () => {
  chrome.tabs.onUpdated.addListener(npmjsTabHandler)
}

export const init = () => {
  addTabListenerForNpmjs()
}
