import { createApp } from 'vue'
import App from './App.vue'
import './assets/css/tailwind.css'
import AOS from 'aos'
import 'aos/dist/aos.css'
import router from './router' // ✅ tambahin router

const app = createApp(App)

app.use(router) // ✅ aktifin router
app.mount('#app')

// Initialize AOS
AOS.init({
  duration: 1000,
  easing: 'ease-in-out',
  once: true,
  mirror: false
})
