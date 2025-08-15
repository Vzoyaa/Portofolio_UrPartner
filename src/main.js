import { createApp } from 'vue'
import App from './App.vue'
import './assets/css/tailwind.css'
import AOS from 'aos'
import 'aos/dist/aos.css'
import router from './router' // ✅ tambahin router
import authStore from './store/auth'

// 🚨 DEBUGGING: Log saat aplikasi dimulai
console.log('🚀 APPLICATION STARTING...')
console.log('⏰ Time:', new Date().toLocaleString())

// Initialize auth store
console.log('🔑 INITIALIZING AUTH STORE...')
const authInitialized = authStore.checkAuth()
console.log('✅ Auth initialized:', authInitialized)
console.log('👤 Current user after init:', authStore.currentUser)
console.log('🔐 Is authenticated after init:', authStore.isAuthenticated)

const app = createApp(App)
app.use(router)

console.log('🎯 VUE APP CREATED AND MOUNTED')
console.log('=====================================')

app.use(router) // ✅ aktifin router
app.mount('#app')

// Initialize AOS
AOS.init({
  duration: 1000,
  easing: 'ease-in-out',
  once: true,
  mirror: false
})
