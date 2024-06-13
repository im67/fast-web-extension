import { NpmWebsiteNS } from '../../typings/npmjs'
const RELEASE_CODE = 'release'

const injectReleaseCheckBtnFunction = () => {
  const RELEASE_CODE = 'release'
  let githuUrl = ''
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
    sibling.addEventListener('click', () => {
      const aEl: HTMLAnchorElement | null = document.querySelector(
        "a[aria-labelledby='repository repository-link']",
      )
      if (aEl) {
        githuUrl = aEl.href
      }
      chrome.runtime.sendMessage({
        code: RELEASE_CODE,
        data: { version: el.textContent, url: githuUrl },
      })
    })
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
  chrome.runtime.onMessage.addListener((request) => {
    const {
      code,
      data: { version, url },
    } = request
    if (code === RELEASE_CODE) {
      chrome.windows.create({
        url: chrome.runtime.getURL(`popup.html#/github_log?version=${version}&url=${url}`),
        type: 'popup',
        width: 350,
        height: 450,
      })
    }
  })
}

export const init = () => {
  addTabListenerForNpmjs()
}
