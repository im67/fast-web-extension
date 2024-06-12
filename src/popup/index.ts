import { createApp } from 'vue'
import '@/styles/popup.scss'
import Popup from './Popup.vue'
import route from '../router/route'

createApp(Popup).use(route).mount('#app')
