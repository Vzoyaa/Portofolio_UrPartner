<template>
  <div id="app" class="global-bg">
    <Navbarv v-if="!isDashboard" />
    <ChatBot />
    <router-view />
  </div>
</template>

<script>
import { useRoute } from 'vue-router'
import { computed } from 'vue'
import Navbarv from './components/Navbarv.vue'
import ChatBot from './components/ChatBot.vue'

export default {
  name: 'App',
  components: { Navbarv, ChatBot },
  setup() {
    const route = useRoute()
    const isDashboard = computed(() => route.path.startsWith('/super-admin'))
    return { isDashboard }
  }
}
</script>

<style>
/* Global Background CSS - Tambahkan ke main.css atau app.css */

/* Background utama dengan gradient */
body {
  background: linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%);
  min-height: 100vh;
  position: relative;
  overflow-x: hidden;
}

/* Pattern garis-garis kotak */
body::before {
  content: '';
  position: fixed;
  inset: 0;
  background-image: radial-gradient(circle at 2px 2px, rgba(139, 92, 246, 0.4) 1px, transparent 0);
  background-size: 40px 40px;
  opacity: 0.1;
  pointer-events: none;
  z-index: -3;
}

/* Floating elements - Purple */
body::after {
  content: '';
  position: fixed;
  top: 80px;
  left: 40px;
  width: 288px; /* w-72 = 18rem = 288px */
  height: 288px; /* h-72 = 18rem = 288px */
  background: #9333ea; /* purple-600 */
  border-radius: 50%;
  opacity: 0.1;
  filter: blur(48px); /* blur-3xl */
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  pointer-events: none;
  z-index: -2;
}

/* Floating elements - Blue (menggunakan pseudo-element tambahan) */
.floating-blue-element {
  position: fixed;
  bottom: 80px;
  right: 40px;
  width: 384px; /* w-96 = 24rem = 384px */
  height: 384px; /* h-96 = 24rem = 384px */
  background: #2563eb; /* blue-600 */
  border-radius: 50%;
  opacity: 0.1;
  filter: blur(48px); /* blur-3xl */
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  animation-delay: 1s;
  pointer-events: none;
  z-index: -2;
}

/* Pulse animation */
@keyframes pulse {
  0%, 100% {
    opacity: 0.1;
  }
  50% {
    opacity: 0.05;
  }
}

/* Responsive adjustments */
@media (max-width: 768px) {
  body::after {
    width: 200px;
    height: 200px;
    top: 40px;
    left: 20px;
  }
  
  .floating-blue-element {
    width: 250px;
    height: 250px;
    bottom: 40px;
    right: 20px;
  }
}

/* Alternatif dengan Tailwind CSS classes jika menggunakan @apply */
/*
.global-bg {
  @apply min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden;
}

.global-bg::before {
  @apply fixed inset-0 opacity-10 pointer-events-none;
  content: '';
  background-image: radial-gradient(circle at 2px 2px, rgba(139, 92, 246, 0.4) 1px, transparent 0);
  background-size: 40px 40px;
  z-index: -3;
}
*/
</style>