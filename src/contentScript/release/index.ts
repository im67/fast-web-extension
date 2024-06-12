import { NpmWebsiteNS } from '@/typings/npmjs'

export const npmjsReleaseInject = () => {
  const handleUrlChange = () => {
    console.log('13456')
  }
  console.log('000')
  window.addEventListener('popstate', handleUrlChange)
  window.addEventListener('replaceState', handleUrlChange)
}
