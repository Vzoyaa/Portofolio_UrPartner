<template>
  <section id="Projects" class="section-padding bg-white">
    <div class="container-custom">
      <!-- Section Header -->
      <div class="text-center mb-16">
        <h2 class="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
          Portfolio <span class="text-gradient">Saya</span>
        </h2>
        <div class="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full mb-6"></div>
        <p class="text-xl text-gray-600 max-w-3xl mx-auto">
          Berikut adalah beberapa proyek yang telah saya kerjakan dengan penuh dedikasi dan kreativitas
        </p>
      </div>

      <!-- Filter Tabs -->
      <div class="flex justify-center mb-12">
        <div class="flex flex-wrap gap-2 bg-gray-100 p-2 rounded-full">
          <button
            v-for="category in categories"
            :key="category"
            @click="activeFilter = category"
            :class="[
              'px-6 py-2 rounded-full font-medium transition-all duration-300',
              activeFilter === category
                ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                : 'text-gray-600 hover:text-gray-900 hover:bg-white'
            ]"
          >
            {{ category }}
          </button>
        </div>
      </div>

      <!-- Projects Grid -->
<div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
  <div
    v-for="project in filteredProjects"
    :key="project.id"
    class="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer"
    @click="openProject(project)"
  >
          <!-- Project Image -->
          <div class="relative overflow-hidden">
            <div 
              class="h-64 flex items-center justify-center text-white text-lg font-medium"
              :class="project.gradient"
            >
              <div class="text-center">
                <div class="text-4xl mb-4">{{ project.emoji }}</div>
                <div>{{ project.title }}</div>
              </div>
            </div>
            
            <!-- Overlay on hover -->
            <div class="absolute inset-0 bg-black/60 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <div class="text-center text-white">
                <div class="text-2xl mb-2">👁️</div>
                <p class="text-sm">Lihat Detail</p>
              </div>
            </div>
          </div>

          <!-- Project Info -->
          <div class="p-6">
            <div class="flex items-center justify-between mb-3">
              <span class="text-sm font-medium text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                {{ project.category }}
              </span>
              <div class="flex space-x-2">
                <a 
                  :href="project.github"
                  class="text-gray-400 hover:text-gray-600 transition-colors duration-300"
                  @click.stop
                  target="_blank"
                >
                  💻
                </a>
                <a 
                  :href="project.demo"
                  class="text-gray-400 hover:text-gray-600 transition-colors duration-300"
                  @click.stop
                  target="_blank"
                >
                  🔗
                </a>
              </div>
            </div>
            
            <h3 class="text-xl font-bold text-gray-900 mb-2 hover:text-blue-600 transition-colors duration-300">
              {{ project.title }}
            </h3>
            
            <p class="text-gray-600 mb-4">
              {{ project.description }}
            </p>
            
            <!-- Tech Stack -->
            <div class="flex flex-wrap gap-2">
              <span
                v-for="tech in project.technologies"
                :key="tech"
                class="text-xs font-medium bg-gray-100 text-gray-700 px-2 py-1 rounded-md"
              >
                {{ tech }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- Load More Button -->
      <div class="text-center mt-12" v-if="!showAll">
        <button 
          class="px-8 py-3 bg-gray-200 text-gray-700 rounded-full hover:bg-gray-300 transition-colors duration-300"
          @click="loadMore"
        >
          Lihat Lebih Banyak ⬇️
        </button>
      </div>
    </div>

    <!-- Project Modal -->
    <div
      v-if="selectedProject"
      class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80"
      @click="closeProject"
    >
      <div
        class="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
        @click.stop
      >
        <!-- Modal Header -->
        <div class="relative p-6 border-b">
          <h3 class="text-2xl font-bold text-gray-900">{{ selectedProject.title }}</h3>
          <button
            @click="closeProject"
            class="absolute top-6 right-6 text-gray-400 hover:text-gray-600 text-2xl"
          >
            ✕
          </button>
        </div>

        <!-- Modal Content -->
        <div class="p-6">
          <div 
            class="h-64 rounded-xl mb-6 flex items-center justify-center text-white text-xl"
            :class="selectedProject.gradient"
          >
            <div class="text-6xl">{{ selectedProject.emoji }}</div>
          </div>

          <div class="grid md:grid-cols-2 gap-8">
            <div>
              <h4 class="text-lg font-semibold text-gray-900 mb-3">Deskripsi Project</h4>
              <p class="text-gray-600 mb-6">{{ selectedProject.fullDescription }}</p>

              <h4 class="text-lg font-semibold text-gray-900 mb-3">Fitur Utama</h4>
              <ul class="space-y-2 text-gray-600">
                <li v-for="feature in selectedProject.features" :key="feature" class="flex items-start">
                  <span class="text-green-500 mr-2">✅</span>
                  {{ feature }}
                </li>
              </ul>
            </div>

            <div>
              <h4 class="text-lg font-semibold text-gray-900 mb-3">Teknologi</h4>
              <div class="flex flex-wrap gap-2 mb-6">
                <span
                  v-for="tech in selectedProject.technologies"
                  :key="tech"
                  class="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm font-medium"
                >
                  {{ tech }}
                </span>
              </div>

              <div class="flex gap-4">
                <a 
                  :href="selectedProject.github"
                  class="flex-1 text-center px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors duration-300"
                  target="_blank"
                >
                  💻 Source Code
                </a>
                <a 
                  :href="selectedProject.demo"
                  class="flex-1 text-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300"
                  target="_blank"
                >
                  🔗 Live Demo
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { ref, computed } from 'vue'

export default {
  name: 'Projects',
  setup() {
    const activeFilter = ref('All')
    const showAll = ref(false)
    const selectedProject = ref(null)

    const categories = ['All', 'Web App', 'Mobile App', 'UI/UX', 'Backend']

    const projects = [
      {
        id: 1,
        title: 'E-Commerce Platform',
        category: 'Web App',
        description: 'Platform e-commerce modern dengan fitur lengkap untuk bisnis online',
        fullDescription: 'Platform e-commerce full-stack yang dibangun dengan Vue.js dan Laravel. Dilengkapi dengan sistem pembayaran terintegrasi, dashboard admin yang komprehensif, dan sistem manajemen inventori yang canggih.',
        technologies: ['Vue.js', 'Laravel', 'Tailwind CSS', 'MySQL', 'Stripe API'],
        gradient: 'bg-gradient-to-br from-blue-500 to-purple-600',
        emoji: '🛒',
        github: 'https://github.com',
        demo: 'https://demo.com',
        features: [
          'Sistem pembayaran terintegrasi',
          'Dashboard admin lengkap',
          'Manajemen inventori real-time',
          'Responsive design',
          'SEO optimized'
        ]
      },
      {
        id: 2,
        title: 'Task Management App',
        category: 'Web App',
        description: 'Aplikasi manajemen tugas dengan kolaborasi tim dan tracking progress',
        fullDescription: 'Aplikasi produktivitas yang memungkinkan tim untuk berkolaborasi secara efektif. Dilengkapi dengan fitur tracking progress, integrasi calendar, dan sistem notifikasi real-time.',
        technologies: ['React', 'Node.js', 'Socket.io', 'MongoDB', 'Express'],
        gradient: 'bg-gradient-to-br from-green-500 to-teal-600',
        emoji: '📊',
        github: 'https://github.com',
        demo: 'https://demo.com',
        features: [
          'Real-time collaboration',
          'Progress tracking',
          'Calendar integration',
          'Team management',
          'Mobile responsive'
        ]
      },
      {
        id: 3,
        title: 'Mobile Banking App',
        category: 'Mobile App',
        description: 'Aplikasi mobile banking dengan keamanan tinggi dan UX yang intuitif',
        fullDescription: 'Aplikasi mobile banking yang aman dan user-friendly. Dibangun dengan React Native dan dilengkapi dengan fitur biometrik authentication dan enkripsi end-to-end.',
        technologies: ['React Native', 'TypeScript', 'Firebase', 'Expo', 'Redux'],
        gradient: 'bg-gradient-to-br from-indigo-500 to-blue-600',
        emoji: '📱',
        github: 'https://github.com',
        demo: 'https://demo.com',
        features: [
          'Biometric authentication',
          'End-to-end encryption',
          'Real-time transactions',
          'Offline mode',
          'Push notifications'
        ]
      },
      {
        id: 4,
        title: 'Chat Application',
        category: 'Web App',
        description: 'Aplikasi chat real-time dengan fitur group chat dan file sharing',
        fullDescription: 'Aplikasi chat real-time yang memungkinkan komunikasi instan. Dilengkapi dengan fitur group chat, file sharing, dan video call terintegrasi.',
        technologies: ['Vue.js', 'Socket.io', 'Node.js', 'Redis', 'WebRTC'],
        gradient: 'bg-gradient-to-br from-pink-500 to-rose-600',
        emoji: '💬',
        github: 'https://github.com',
        demo: 'https://demo.com',
        features: [
          'Real-time messaging',
          'Group chat',
          'File sharing',
          'Video call integration',
          'Message encryption'
        ]
      },
      {
        id: 5,
        title: 'Portfolio Website',
        category: 'UI/UX',
        description: 'Website portfolio modern dengan animasi yang menarik',
        fullDescription: 'Website portfolio yang didesain dengan fokus pada user experience dan visual appeal. Menggunakan teknologi modern dan animasi yang smooth.',
        technologies: ['Vue.js', 'Tailwind CSS', 'GSAP', 'Netlify'],
        gradient: 'bg-gradient-to-br from-orange-500 to-red-600',
        emoji: '💻',
        github: 'https://github.com',
        demo: 'https://demo.com',
        features: [
          'Smooth animations',
          'Responsive design',
          'SEO optimized',
          'Fast loading',
          'Modern UI/UX'
        ]
      },
      {
        id: 6,
        title: 'API Gateway',
        category: 'Backend',
        description: 'Microservices API gateway dengan load balancing dan monitoring',
        fullDescription: 'API Gateway yang robust untuk arsitektur microservices. Dilengkapi dengan load balancing, rate limiting, dan monitoring real-time.',
        technologies: ['Node.js', 'Express', 'Redis', 'Docker', 'Kubernetes'],
        gradient: 'bg-gradient-to-br from-gray-500 to-gray-700',
        emoji: '🔧',
        github: 'https://github.com',
        demo: 'https://demo.com',
        features: [
          'Load balancing',
          'Rate limiting',
          'API monitoring',
          'Caching system',
          'Security middleware'
        ]
      }
    ]

    const filteredProjects = computed(() => {
      let filtered = activeFilter.value === 'All' 
        ? projects 
        : projects.filter(project => project.category === activeFilter.value)
      
      return showAll.value ? filtered : filtered.slice(0, 6)
    })

    const openProject = (project) => {
      selectedProject.value = project
    }

    const closeProject = () => {
      selectedProject.value = null
    }

    const loadMore = () => {
      showAll.value = true
    }

    return {
      activeFilter,
      showAll,
      selectedProject,
      categories,
      projects,
      filteredProjects,
      openProject,
      closeProject,
      loadMore
    }
  }
}
</script>

<style scoped>
.section-padding {
  padding: 5rem 0;
}

.container-custom {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

.text-gradient {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
</style>