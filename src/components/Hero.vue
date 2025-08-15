<template>
  <section id="home" class="relative min-h-screen flex items-center justify-center overflow-hidden">

    <!-- Canvas untuk Partikel -->
    <canvas ref="particleCanvas" class="absolute inset-0 w-full h-full"></canvas>

    <!-- Content -->
    <div class="relative z-10 text-center text-white px-4 sm:px-6 lg:px-8">
      <div class="max-w-4xl mx-auto">
        <!-- Name with Typing Effect -->
        <h1 
          class="text-4xl sm:text-6xl lg:text-7xl font-bold mb-6"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          <span ref="typingText" class="inline-block min-h-[1.2em]">{{ displayText }}</span>
          <span class="animate-pulse">|</span>
        </h1>
        
        <!-- Subtitle -->
        <p 
          class="text-xl sm:text-2xl lg:text-3xl mb-8 opacity-90 font-light"
          data-aos="fade-up"
          data-aos-delay="300"
        >
          {{ currentRole }}
        </p>
        
        <!-- Description -->
        <p 
          class="text-lg sm:text-xl mb-12 opacity-80 max-w-3xl mx-auto leading-relaxed"
          data-aos="fade-up"
          data-aos-delay="400"
        >
          Kami menciptakan pengalaman digital yang menakjubkan dengan teknologi modern. 
          Mari wujudkan ide-ide kreatif Anda menjadi kenyataan!
        </p>
        
        <!-- CTA Buttons -->
        <div 
          class="flex flex-col sm:flex-row gap-4 justify-center items-center"
          data-aos="fade-up"
          data-aos-delay="500"
        >
          <router-link to="/projects" class="btn-primary group">
            <span class="flex items-center">
              Lihat Portfolio
              <ArrowRightIcon class="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
            </span>
          </router-link>
          
          <a 
            href="#contact" 
            class="btn-secondary bg-white/10 border-white/30 text-white hover:bg-white hover:text-primary-700"
          >
            Hubungi Saya
          </a>
        </div>
        
        <!-- Social Links -->
        <div 
          class="flex justify-center space-x-6 mt-12"
          data-aos="fade-up"
          data-aos-delay="600"
        >
          <a 
            v-for="social in socialLinks" 
            :key="social.name"
            :href="social.href"
            class="text-white/70 hover:text-white transition-colors duration-300 transform hover:scale-110"
            target="_blank"
            rel="noopener noreferrer"
          >
            <component :is="social.icon" class="h-6 w-6" />
          </a>
        </div>
      </div>
    </div>

    <!-- Scroll Indicator -->
    <div 
      class="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/70 animate-bounce-slow"
      data-aos="fade-up"
      data-aos-delay="800"
    >
      <ChevronDownIcon class="h-8 w-8" />
    </div>
  </section>
</template>

<script>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { ArrowRightIcon, ChevronDownIcon } from '@heroicons/vue/24/outline'

export default {
  name: 'Hero',
  components: {
    ArrowRightIcon,
    ChevronDownIcon
  },
  setup() {
    const displayText = ref('')
    const currentRole = ref('')
    const particleCanvas = ref(null)
    let animationId

    const name = 'UrPartner'
    const roles = ['UI/UX Designer', 'Mobile Developer', 'Web Developer']
    const socialLinks = [
      { name: 'GitHub', href: 'https://github.com', icon: 'github-icon' },
      { name: 'Instagram', href: 'https://instagram.com', icon: 'instagram-icon' }
    ]

    // Canvas Particles
    const particles = []
    const particleCount = 60

    const initParticles = (ctx, w, h) => {
      particles.length = 0
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * w,
          y: Math.random() * h,
          size: Math.random() * 3 + 1,
          speedX: (Math.random() - 0.5) * 0.5,
          speedY: (Math.random() - 0.5) * 0.5
        })
      }
    }

    const drawParticles = (ctx, w, h) => {
      ctx.clearRect(0, 0, w, h)
      ctx.fillStyle = 'rgba(255,255,255,0.8)'
      particles.forEach(p => {
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fill()
        p.x += p.speedX
        p.y += p.speedY

        // Bounce
        if (p.x < 0 || p.x > w) p.speedX *= -1
        if (p.y < 0 || p.y > h) p.speedY *= -1
      })
    }

    const animateParticles = () => {
      const canvas = particleCanvas.value
      const ctx = canvas.getContext('2d')
      const w = canvas.width = canvas.offsetWidth
      const h = canvas.height = canvas.offsetHeight

      drawParticles(ctx, w, h)
      animationId = requestAnimationFrame(animateParticles)
    }

    // Typing animation
    const startTypingAnimation = () => {
      let nameIndex = 0
      let roleIndex = 0
      let currentRoleIndex = 0
      let isDeleting = false

      const typeSpeed = 100
      const deleteSpeed = 50
      const pauseTime = 2000

      const typeText = () => {
        if (nameIndex < name.length) {
          displayText.value = name.slice(0, nameIndex + 1)
          nameIndex++
          setTimeout(typeText, typeSpeed)
        } else {
          setTimeout(typeRole, pauseTime)
        }
      }

      const typeRole = () => {
        const currentRoleText = roles[roleIndex]
        if (!isDeleting && currentRoleIndex <= currentRoleText.length) {
          currentRole.value = currentRoleText.slice(0, currentRoleIndex)
          currentRoleIndex++
          setTimeout(typeRole, typeSpeed)
        } else if (isDeleting && currentRoleIndex >= 0) {
          currentRole.value = currentRoleText.slice(0, currentRoleIndex)
          currentRoleIndex--
          setTimeout(typeRole, deleteSpeed)
        } else if (!isDeleting) {
          isDeleting = true
          setTimeout(typeRole, pauseTime)
        } else {
          isDeleting = false
          roleIndex = (roleIndex + 1) % roles.length
          currentRoleIndex = 0
          setTimeout(typeRole, typeSpeed)
        }
      }

      typeText()
    }

    onMounted(() => {
      const canvas = particleCanvas.value
      const ctx = canvas.getContext('2d')
      initParticles(ctx, canvas.offsetWidth, canvas.offsetHeight)
      animateParticles()
      setTimeout(startTypingAnimation, 1000)
    })

    onBeforeUnmount(() => {
      cancelAnimationFrame(animationId)
    })

    return {
      displayText,
      currentRole,
      socialLinks,
      particleCanvas
    }
  }
}
</script>
