import { createI18n } from 'vue-i18n'
import { CommonNS } from '@/typings/common'
import messages from './locale'

console.log(messages)
const i18n = createI18n({
  legacy: false,
  locale: navigator.language,
  fallbackLocale: CommonNS.Language.ZH,
  warnHtmlMessage: false,
  messages,
})

export default i18n
