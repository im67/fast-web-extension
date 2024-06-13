import { defineManifest } from '@crxjs/vite-plugin'
import packageData from '../package.json'

//@ts-ignore
const isDev = process.env.NODE_ENV == 'development'

export default defineManifest({
  name: `${packageData.displayName || packageData.name}${isDev ? ` ➡️ Dev` : ''}`,
  description: packageData.description,
  version: packageData.version,
  manifest_version: 3,
  icons: {
    32: 'img/logo-32.jpg',
    48: 'img/logo-48.jpg',
    128: 'img/logo-128.jpg',
  },
  action: {
    default_popup: 'popup.html',
    default_icon: 'img/logo-48.jpg',
  },
  options_page: 'options.html',
  devtools_page: 'devtools.html',
  background: {
    service_worker: 'src/background/index.ts',
    type: 'module',
  },
  content_scripts: [
    {
      matches: ['<all_urls>'],
      js: ['src/contentScript/index.ts'],
    },
  ],
  side_panel: {
    default_path: 'sidepanel.html',
  },
  web_accessible_resources: [
    {
      resources: ['img/logo-32.jpg', 'img/logo-48.jpg', 'img/logo-128.jpg'],
      matches: [],
    },
  ],
  permissions: ['sidePanel', 'storage', 'activeTab', 'tabs', 'scripting', '<all_urls>'],
  chrome_url_overrides: {
    newtab: 'newtab.html',
  },
  // content_security_policy: {
  //   extension_pages: "script-src 'self' 'unsafe-eval'; object-src 'self'",
  // },
})
