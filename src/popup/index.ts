import { createApp } from 'vue'
import '@/styles/popup.css'
import Popup from './Popup.vue'
import route from '../router/route'

createApp(Popup).use(route).mount('#app')
