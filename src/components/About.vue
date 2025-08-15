<template>
  <section id="about" class="section-padding min-h-screen bg-transparent">
    <div class="container-custom max-w-7xl mx-auto px-6">
      <!-- Judul Section -->
      <div class="text-center mb-20">
        <h2 class="section-title font-bold text-white mb-6 animate-title">
          Tentang <span class="gradient-text">Saya</span>
        </h2>
      </div>

      <div class="main-grid gap-16 items-start">
        <!-- Kolom Kiri - Foto Slider -->
        <div class="relative">
          <!-- Container Foto -->
          <div class="photo-container relative overflow-hidden rounded-3xl shadow-2xl">
            <div 
              class="flex transition-transform duration-700 ease-in-out h-full"
              :style="{ transform: `translateX(-${currentSlide * 100}%)` }"
              @touchstart="handleTouchStart"
              @touchmove="handleTouchMove"
              @touchend="handleTouchEnd"
              @mousedown="handleMouseDown"
              @mousemove="handleMouseMove"
              @mouseup="handleMouseEnd"
              @mouseleave="handleMouseEnd"
            >
              <div
                v-for="(item, index) in slides"
                :key="`photo-${index}`"
                class="min-w-full h-full relative group"
              >
                <img 
                  :src="item.image" 
                  :alt="item.title"
                  class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 select-none"
                  draggable="false"
                />
                <!-- Overlay gradient -->
                <div class="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <!-- Icon overlay -->
                <div class="absolute top-6 right-6 p-3 bg-white/20 backdrop-blur-lg rounded-2xl border border-white/30 animate-icon-float">
                  <component :is="item.icon" class="h-8 w-8 text-white drop-shadow-lg" />
                </div>
              </div>
            </div>
          </div>



          <!-- Navigation Dots -->
          <div class="flex justify-center gap-3 mt-8">
            <button
              type="button"
              v-for="(slide, index) in slides"
              :key="`dot-${index}`"
              @click="goToSlide(index)"
              class="dot-button transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              :class="{
                'dot-active': index === currentSlide,
                'dot-inactive': index !== currentSlide
              }"
            ></button>
          </div>

          <!-- Decorative Elements -->
          <div class="decoration-1"></div>
          <div class="decoration-2"></div>
        </div>

        <!-- Kolom Kanan - Deskripsi -->
        <div class="space-y-8">
          <!-- Content Card -->
          <div class="content-card bg-white/80 backdrop-blur-lg p-8 rounded-3xl shadow-xl border border-white/30">
            <div 
              class="space-y-6 animate-content animate-slide-in"
              :key="`content-${currentSlide}`"
            >
              <!-- Title dengan Icon -->
              <div class="flex items-center gap-4 mb-6">
                <div class="p-4 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl shadow-lg animate-icon-pulse">
                  <component :is="slides[currentSlide].icon" class="h-10 w-10 text-white" />
                </div>
                <h3 class="content-title font-bold text-gray-900">
                  {{ slides[currentSlide].title }}
                </h3>
              </div>
              
              <!-- Description -->
              <p class="content-description text-gray-700 leading-relaxed font-medium">
                {{ slides[currentSlide].description }}
              </p>

              <!-- Progress Bar -->
              <div class="pt-6">
                <div class="flex justify-between text-sm text-gray-500 mb-2">
                  <span>Progress</span>
                  <span>{{ currentSlide + 1 }} / {{ slides.length }}</span>
                </div>
                <div class="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    class="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-700 ease-out"
                    :style="{ width: `${((currentSlide + 1) / slides.length) * 100}%` }"
                  ></div>
                </div>
              </div>
            </div>
          </div>

          <!-- Additional Info Cards -->
          <div class="grid grid-cols-2 gap-4">
            <div class="info-card bg-white/60 backdrop-blur-lg p-4 rounded-2xl shadow-lg border border-white/20 text-center animate-float-medium">
              <div class="text-2xl font-bold text-blue-600 mb-1">5+</div>
              <div class="text-sm text-gray-600">Years Experience</div>
            </div>
            <div class="info-card bg-white/60 backdrop-blur-lg p-4 rounded-2xl shadow-lg border border-white/20 text-center animate-float-slow">
              <div class="text-2xl font-bold text-purple-600 mb-1">100+</div>
              <div class="text-sm text-gray-600">Projects Done</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'

// Icons (menggunakan emoji sebagai fallback jika Heroicons tidak tersedia)
const RocketLaunchIcon = { template: '<div class="text-4xl">🚀</div>' }
const CodeBracketIcon = { template: '<div class="text-4xl">💻</div>' }
const LightBulbIcon = { template: '<div class="text-4xl">💡</div>' }
const BookOpenIcon = { template: '<div class="text-4xl">📚</div>' }
const UserGroupIcon = { template: '<div class="text-4xl">👥</div>' }
const ChatBotIcon = { template: '<div class="text-4xl">🤖</div>' }

const currentSlide = ref(0)

// Touch/Mouse handling
const startX = ref(0)
const currentX = ref(0)
const isDragging = ref(false)
const threshold = 50 // minimum distance to trigger swipe

const slides = [
  {
    title: "CEO",
    image: new URL('@/assets/kangmj.webp', import.meta.url).href,
    description: "",
    icon: RocketLaunchIcon
  },
  {
    title: "UI/UX Designer",
    image: new URL('@/assets/afthan.webp', import.meta.url).href,
    description: "",
    icon: CodeBracketIcon
  },
  {
    title: "Frond End Developer",
    image: new URL('@/assets/rendi.webp', import.meta.url).href,
    description: "Hallo saya Rendi, saya seorang Front End Developer, keahlian saya meliputi vue.js, tailwindcss, bootstrap, dan berbagai framework terkini. Saya selalu mengikuti perkembangan teknologi untuk memberikan hasil terbaik dalam proyek yang saya kerjakan",
    icon: LightBulbIcon
  },
  {
    title: "Back End Developer",
    image: new URL('@/assets/vie.webp', import.meta.url).href,
    description: "Hey! I'm Viee, a passionate web wizard turning ideas into interactive, eye-catching websites. I thrive on experimenting with new tech, crafting smooth user experiences, and making digital stuff that people actually enjoy. Always caffeinated, always curious, and always coding my way to the next cool project!",
    icon: BookOpenIcon
  },
  {
    title: "Content Creator",
    image: new URL('@/assets/dede.webp', import.meta.url).href,
    description: "🤝 Saya senang berkolaborasi untuk menghadirkan solusi yang inovatif dan bermanfaat. Kerja sama tim yang solid adalah kunci kesuksesan setiap proyek besar. Komunikasi yang baik menghasilkan produk yang luar biasa.",
    icon: UserGroupIcon
  },
  {
    title: "QA/QC",
    image: new URL('@/assets/binek.webp', import.meta.url).href,
    description: "Hai, saya Rizky Ramadhan! Saat ini saya berperan sebagai QA/QC (Quality Assurance & Quality Control), yang fokus memastikan setiap proses dan hasil akhir sesuai dengan standar kualitas terbaik. Tugas saya tidak hanya menemukan bug atau kesalahan, tetapi juga mencegahnya sejak awal, agar produk yang dihasilkan benar-benar memenuhi ekspektasi pengguna.",
    icon: ChatBotIcon
  }
]

// Navigation functions
const goToSlide = (index) => {
  currentSlide.value = index
}

// Touch events
const handleTouchStart = (e) => {
  startX.value = e.touches[0].clientX
  isDragging.value = true
}

const handleTouchMove = (e) => {
  if (!isDragging.value) return
  currentX.value = e.touches[0].clientX
}

const handleTouchEnd = () => {
  if (!isDragging.value) return
  
  const diffX = startX.value - currentX.value
  
  if (Math.abs(diffX) > threshold) {
    if (diffX > 0) {
      nextSlide()
    } else {
      prevSlide()
    }
  }
  
  isDragging.value = false
}

// Mouse events (for desktop)
const handleMouseDown = (e) => {
  startX.value = e.clientX
  isDragging.value = true
}

const handleMouseMove = (e) => {
  if (!isDragging.value) return
  currentX.value = e.clientX
}

const handleMouseEnd = () => {
  if (!isDragging.value) return
  
  const diffX = startX.value - currentX.value
  
  if (Math.abs(diffX) > threshold) {
    if (diffX > 0) {
      nextSlide()
    } else {
      prevSlide()
    }
  }
  
  isDragging.value = false
}
</script>

<style scoped>
/* Base Styles */
.section-padding {
  padding: 100px 0;
}

.container-custom {
  max-width: 1200px;
}

/* Grid Layout */
.main-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: start;
}

/* Typography */
.section-title {
  font-size: 3rem;
  line-height: 1.2;
}

.content-title {
  font-size: 2rem;
  line-height: 1.3;
}

.content-description {
  font-size: 1.125rem;
  line-height: 1.7;
}

/* Photo Container */
.photo-container {
  height: 500px;
}

/* Content Card */
.content-card {
  min-height: 400px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

/* Navigation Dots - FIXED STYLES */
.dot-button {
  width: 18px;
  height: 18px;
  border-radius: 50%;
  border: 2px solid;
  transition: all 0.3s ease;
  cursor: pointer;
  background: transparent;
  outline: none;
  position: relative;
  z-index: 10;
}

.dot-button:hover {
  transform: scale(1.1);
}

.dot-active {
  background: linear-gradient(45deg, #3b82f6, #8b5cf6);
  border-color: #3b82f6;
  transform: scale(1.2);
  box-shadow: 0 0 12px rgba(59, 130, 246, 0.5);
}

.dot-inactive {
  background-color: rgba(255, 255, 255, 0.4);
  border-color: rgba(255, 255, 255, 0.6);
}

.dot-inactive:hover {
  background-color: rgba(255, 255, 255, 0.6);
  border-color: rgba(255, 255, 255, 0.8);
  transform: scale(1.1);
}

/* Prevent text selection on draggable elements */
.select-none {
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

/* Decorative Elements */
.decoration-1 {
  position: absolute;
  top: -2rem;
  left: -2rem;
  width: 5rem;
  height: 5rem;
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.2), rgba(147, 51, 234, 0.2));
  backdrop-filter: blur(16px);
  border-radius: 1rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
  animation: floatSlow 6s ease-in-out infinite;
}

.decoration-2 {
  position: absolute;
  bottom: -1.5rem;
  right: -1.5rem;
  width: 4rem;
  height: 4rem;
  background: linear-gradient(135deg, rgba(236, 72, 153, 0.2), rgba(239, 68, 68, 0.2));
  backdrop-filter: blur(16px);
  border-radius: 0.75rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
  animation: floatFast 3s ease-in-out infinite;
}

/* Animations */
.animate-title {
  animation: titleFade 1.5s ease-out;
}

@keyframes titleFade {
  0% {
    opacity: 0;
    transform: translateY(-30px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-slide-in {
  animation: slideInRight 0.8s ease-out;
}

@keyframes slideInRight {
  0% {
    opacity: 0;
    transform: translateX(30px);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
}

.animate-icon-pulse {
  animation: iconPulse 2s ease-in-out infinite;
}

@keyframes iconPulse {
  0%, 100% {
    transform: scale(1);
    box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.4);
  }
  50% {
    transform: scale(1.05);
    box-shadow: 0 0 0 10px rgba(59, 130, 246, 0);
  }
}

.animate-icon-float {
  animation: iconFloat 3s ease-in-out infinite;
}

@keyframes iconFloat {
  0%, 100% {
    transform: translateY(0px) rotate(0deg);
  }
  50% {
    transform: translateY(-8px) rotate(3deg);
  }
}

.animate-float-slow {
  animation: floatSlow 6s ease-in-out infinite;
}

.animate-float-medium {
  animation: floatMedium 4s ease-in-out infinite;
}

.animate-float-fast {
  animation: floatFast 3s ease-in-out infinite;
}

@keyframes floatSlow {
  0%, 100% {
    transform: translateY(0px) rotate(0deg);
  }
  50% {
    transform: translateY(-15px) rotate(8deg);
  }
}

@keyframes floatMedium {
  0%, 100% {
    transform: translateY(0px) rotate(0deg);
  }
  50% {
    transform: translateY(-10px) rotate(-5deg);
  }
}

@keyframes floatFast {
  0%, 100% {
    transform: translateY(0px) rotate(0deg);
  }
  50% {
    transform: translateY(-12px) rotate(10deg);
  }
}

/* Gradient Text */
.gradient-text {
  background: linear-gradient(45deg, #3b82f6, #8b5cf6, #ec4899);
  background-size: 300%;
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: gradientShift 3s ease-in-out infinite;
}

@keyframes gradientShift {
  0%, 100% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
}

/* Responsive Design */
@media (max-width: 1024px) {
  .main-grid {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
  
  .content-card {
    min-height: 300px;
  }
  
  .photo-container {
    height: 400px;
  }
  
  .section-title {
    font-size: 2.5rem;
  }
  
  .content-title {
    font-size: 1.8rem;
  }
}

@media (max-width: 768px) {
  .section-title {
    font-size: 2rem;
  }
  
  .content-title {
    font-size: 1.5rem;
  }
  
  .content-description {
    font-size: 1rem;
  }
  
  .photo-container {
    height: 350px;
  }
  
  .main-grid {
    gap: 1.5rem;
  }
  
  .section-padding {
    padding: 60px 0;
  }
}

@media (max-width: 480px) {
  .section-title {
    font-size: 1.8rem;
  }
  
  .content-title {
    font-size: 1.3rem;
  }
  
  .photo-container {
    height: 300px;
  }
  
  .content-card {
    padding: 1.5rem;
  }
  
  .dot-button {
    width: 16px;
    height: 16px;
  }
}
</style>