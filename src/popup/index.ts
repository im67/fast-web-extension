import { createApp } from 'vue'
import '@/styles/popup.scss'
import Popup from './Popup.vue'
import route from '../router/route'
import i18n from '@/i18n/i18n'

createApp(Popup).use(route).use(i18n).mount('#app')
