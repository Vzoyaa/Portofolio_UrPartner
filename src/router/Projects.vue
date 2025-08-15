<template>
  <section id="Projects" class="min-h-screen py-20">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Section Header -->
      <div class="text-center mb-16">
        <h2 class="text-4xl lg:text-5xl font-bold text-white mb-4">
          My <span class="text-blue-400">Portfolio</span>
        </h2>
        <div class="w-16 h-1 bg-blue-500 mx-auto mb-6"></div>
        <p class="text-lg text-gray-300 max-w-2xl mx-auto">
          Here are some of the projects I've worked on with dedication and creativity
        </p>
      </div>

      <!-- Navigation Tabs -->
      <div class="flex justify-center mb-12">
        <div class="flex bg-gray-800/50 backdrop-blur-sm rounded-xl p-1 border border-gray-700/50">
          <button
            @click="activeTab = 'Projects'"
            :class="[
              'flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all duration-300',
              activeTab === 'Projects'
                ? 'bg-blue-600 text-white shadow-lg'
                : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
            ]"
          >
            <CodeBracketIcon class="h-5 w-5" />
            Projects
          </button>
          <button
            @click="activeTab = 'Tech Stack'"
            :class="[
              'flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all duration-300',
              activeTab === 'Tech Stack'
                ? 'bg-blue-600 text-white shadow-lg'
                : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
            ]"
          >
            <Cog6ToothIcon class="h-5 w-5" />
            Tech Stack
          </button>
        </div>
      </div>

      <!-- Projects Content -->
      <div v-if="activeTab === 'Projects'">
        <!-- Project Filter Tabs -->
        <div class="flex justify-center mb-12">
          <div class="inline-flex bg-gray-800/30 backdrop-blur-sm rounded-lg p-1 border border-gray-700/30">
            <button
              v-for="category in categories"
              :key="category"
              @click="activeFilter = category"
              :class="[
                'px-6 py-2 rounded-md font-medium transition-all duration-300 text-sm',
                activeFilter === category
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-gray-400 hover:text-white'
              ]"
            >
              {{ category }}
            </button>
          </div>
        </div>

        <!-- Projects Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div
            v-for="project in filteredProjects"
            :key="project.id"
            class="group bg-gray-800/40 backdrop-blur-sm border border-gray-700/50 rounded-xl overflow-hidden hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-300 cursor-pointer"
            @click="openProject(project)"
          >
          <!-- Project Image/Icon -->
          <div class="relative overflow-hidden bg-gray-50">
            <div 
              class="h-48 flex items-center justify-center"
              :class="project.bgColor"
            >
              <component 
                :is="project.icon" 
                class="h-16 w-16 text-white opacity-80 group-hover:opacity-100 transition-opacity duration-300" 
              />
            </div>
            
            <!-- Hover Overlay -->
            <div class="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
              <div class="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div class="bg-white/90 backdrop-blur-sm rounded-full p-3">
                  <EyeIcon class="h-6 w-6 text-gray-800" />
                </div>
              </div>
            </div>
          </div>

          <!-- Project Info -->
          <div class="p-6">
            <div class="flex items-center justify-between mb-3">
              <span class="text-xs font-semibold text-blue-400 bg-blue-500/20 px-2 py-1 rounded-full uppercase tracking-wide">
                {{ project.category }}
              </span>
              <div class="flex space-x-2">
                <a 
                  :href="project.github"
                  class="text-gray-400 hover:text-blue-400 transition-colors duration-300"
                  @click.stop
                  target="_blank"
                >
                  <CodeBracketIcon class="h-5 w-5" />
                </a>
                <a 
                  :href="project.demo"
                  class="text-gray-400 hover:text-blue-400 transition-colors duration-300"
                  @click.stop
                  target="_blank"
                >
                  <LinkIcon class="h-5 w-5" />
                </a>
              </div>
            </div>
            
            <h3 class="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors duration-300">
              {{ project.title }}
            </h3>
            
            <p class="text-gray-300 text-sm mb-4 leading-relaxed">
              {{ project.description }}
            </p>
            
            <!-- Tech Stack -->
            <div class="flex flex-wrap gap-2">
              <span
                v-for="tech in project.technologies.slice(0, 3)"
                :key="tech"
                class="text-xs bg-gray-700/50 text-gray-300 px-2 py-1 rounded-md font-medium"
              >
                {{ tech }}
              </span>
              <span
                v-if="project.technologies.length > 3"
                class="text-xs bg-gray-700/50 text-gray-300 px-2 py-1 rounded-md font-medium"
              >
                +{{ project.technologies.length - 3 }}
              </span>
            </div>
          </div>
        </div>
              </div>
        </div>
      </div>

      <!-- Tech Stack Content -->
      <div v-if="activeTab === 'Tech Stack'">
        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
          <div
            v-for="tech in techStack"
            :key="tech.name"
            class="group bg-gray-800/40 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 text-center hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300 cursor-pointer hover:scale-105"
          >
            <div class="mb-4">
              <div 
                class="w-16 h-16 mx-auto rounded-lg flex items-center justify-center p-2"
                :style="{ backgroundColor: tech.color + '20', border: '1px solid ' + tech.color + '30' }"
              >
                <img 
                  :src="tech.iconUrl"
                  :alt="tech.name + ' icon'"
                  class="w-10 h-10 object-contain"
                  @error="handleImageError"
                />
              </div>
            </div>
            <h3 class="font-semibold text-white group-hover:text-blue-400 transition-colors duration-300">
              {{ tech.name }}
            </h3>
            <p class="text-xs text-gray-400 mt-1">{{ tech.category }}</p>
            
            <!-- Progress Bar -->
            <div class="mt-3">
              <div class="w-full bg-gray-700/50 rounded-full h-1.5">
                <div 
                  class="h-1.5 rounded-full transition-all duration-500"
                  :style="{ width: tech.level + '%', backgroundColor: tech.color }"
                ></div>
              </div>
              <p class="text-xs text-gray-400 mt-1">{{ tech.level }}%</p>
            </div>
          </div>
        </div>
      </div>

    <!-- Project Modal -->
    <transition name="modal" appear>
      <div
        v-if="selectedProject"
        class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
        @click="closeProject"
      >
        <div
          class="bg-gray-900 border border-gray-700 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
          @click.stop
        >
          <!-- Modal Header -->
          <div class="relative px-6 py-4 border-b border-gray-700">
            <div class="flex items-center gap-3">
              <div class="p-2 rounded-lg" :class="selectedProject.bgColor">
                <component :is="selectedProject.icon" class="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 class="text-2xl font-bold text-white">
                  {{ selectedProject.title }}
                </h3>
                <p class="text-sm text-gray-400">{{ selectedProject.category }}</p>
              </div>
            </div>
            <button
              @click="closeProject"
              class="absolute top-4 right-6 text-gray-400 hover:text-white p-2"
            >
              <XMarkIcon class="h-6 w-6" />
            </button>
          </div>

          <!-- Modal Content -->
          <div class="p-6">
            <!-- Project Preview -->
            <div 
              class="h-64 rounded-xl mb-8 flex items-center justify-center shadow-inner border border-gray-700/50"
              :class="selectedProject.bgColor"
            >
              <component :is="selectedProject.icon" class="h-24 w-24 text-white/80" />
            </div>

            <div class="grid lg:grid-cols-2 gap-8">
              <div>
                <h4 class="text-lg font-semibold text-white mb-4">Project Description</h4>
                <p class="text-gray-300 mb-6 leading-relaxed">{{ selectedProject.fullDescription }}</p>

                <h4 class="text-lg font-semibold text-white mb-4">Key Features</h4>
                <ul class="space-y-3">
                  <li v-for="feature in selectedProject.features" :key="feature" class="flex items-start">
                    <CheckCircleIcon class="text-green-400 mr-3 h-5 w-5 mt-0.5 flex-shrink-0" />
                    <span class="text-gray-300">{{ feature }}</span>
                  </li>
                </ul>
              </div>

              <div>
                <h4 class="text-lg font-semibold text-white mb-4">Technologies Used</h4>
                <div class="flex flex-wrap gap-2 mb-8">
                  <span
                    v-for="tech in selectedProject.technologies"
                    :key="tech"
                    class="bg-blue-500/20 text-blue-400 px-3 py-1.5 rounded-lg text-sm font-medium border border-blue-500/30"
                  >
                    {{ tech }}
                  </span>
                </div>

                <div class="space-y-3">
                  <a 
                    :href="selectedProject.github"
                    class="w-full flex items-center justify-center gap-2 px-4 py-3 border border-gray-600 text-gray-300 hover:text-white rounded-lg hover:bg-gray-800/50 transition-colors duration-300 font-medium"
                    target="_blank"
                  >
                    <CodeBracketIcon class="h-5 w-5" />
                    View Source Code
                  </a>
                  <a 
                    :href="selectedProject.demo"
                    class="w-full flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300 font-medium"
                    target="_blank"
                  >
                    <LinkIcon class="h-5 w-5" />
                    Live Demo
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue'

// Heroicons
import { 
  EyeIcon,
  CodeBracketIcon,
  LinkIcon,
  ChevronDownIcon,
  XMarkIcon,
  CheckCircleIcon,
  ShoppingCartIcon,
  ClipboardDocumentCheckIcon,
  DevicePhoneMobileIcon,
  ChatBubbleLeftRightIcon,
  WindowIcon,
  Cog6ToothIcon
} from '@heroicons/vue/24/outline'
// Tech Stack Data
const techStack = [
  { name: 'Vue.js', category: 'Frontend', level: 95, color: '#4FC08D', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg' },
  { name: 'React', category: 'Frontend', level: 90, color: '#61DAFB', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
  { name: 'JavaScript', category: 'Language', level: 95, color: '#F7DF1E', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
  { name: 'Node.js', category: 'Backend', level: 88, color: '#339933', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
  { name: 'Laravel', category: 'Backend', level: 85, color: '#FF2D20', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/laravel/laravel-plain.svg' },
  { name: 'Git', category: 'Tools', level: 92, color: '#F05032', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg' },
  { name: 'Tailwind CSS', category: 'Styling', level: 95, color: '#06B6D4', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-plain.svg' }
]
// Project categories
const categories = ['All', 'Web App', 'Mobile App', 'UI/UX', 'Backend']

// Projects Data
const projects = [
  {
    id: 1,
    title: 'E-Commerce Platform',
    category: 'Web App',
    description: 'Modern e-commerce platform with complete features...',
    fullDescription: 'Full-stack e-commerce platform built with Vue.js and Laravel...',
    technologies: ['Vue.js', 'Laravel', 'Tailwind CSS', 'MySQL', 'Stripe API', 'Redis'],
    bgColor: 'bg-gradient-to-br from-blue-500 to-blue-600',
    icon: ShoppingCartIcon,
    github: 'https://github.com',
    demo: 'https://demo.com',
    features: [
      'Integrated payment system with multiple gateways',
      'Comprehensive admin dashboard',
      'Real-time inventory management',
      'Mobile-responsive design',
      'SEO optimized with meta management'
    ]
  },
  {
    id: 2,
    title: 'Task Management App',
    category: 'Web App',
    description: 'Team collaboration task management application...',
    fullDescription: 'Productivity application that enables effective team collaboration...',
    technologies: ['React', 'Node.js', 'Socket.io', 'MongoDB', 'Express', 'JWT'],
    bgColor: 'bg-gradient-to-br from-green-500 to-green-600',
    icon: ClipboardDocumentCheckIcon,
    github: 'https://github.com',
    demo: 'https://demo.com',
    features: [
      'Real-time team collaboration',
      'Advanced progress tracking',
      'Calendar and deadline integration',
      'Team member management',
      'Mobile-responsive interface'
    ]
  },
  // Tambahkan project lainnya sesuai kebutuhan...
]

// State & logic
const activeTab = ref('Projects')
const activeFilter = ref('All')
const showAll = ref(false)
const selectedProject = ref(null)
const displayLimit = 6

const filteredProjects = computed(() => {
  let filtered = activeFilter.value === 'All' 
    ? projects 
    : projects.filter(project => project.category === activeFilter.value)
  return showAll.value ? filtered : filtered.slice(0, displayLimit)
})

const openProject = (project) => {
  selectedProject.value = project
  document.body.style.overflow = 'hidden'
}

const closeProject = () => {
  selectedProject.value = null
  document.body.style.overflow = 'auto'
}

const loadMore = () => {
  showAll.value = true
}

const handleImageError = (event) => {
  event.target.style.display = 'none'
  console.log('Failed to load image:', event.target.src)
}
</script>

<script>
export default {
  name: 'Projects',
  components: {
    EyeIcon,
    CodeBracketIcon,
    LinkIcon,
    ChevronDownIcon,
    XMarkIcon,
    CheckCircleIcon,
    ShoppingCartIcon,
    ClipboardDocumentCheckIcon,
    DevicePhoneMobileIcon,
    ChatBubbleLeftRightIcon,
    WindowIcon,
    Cog6ToothIcon
  }
}
</script>


<style scoped>
.global-bg {
  background: linear-gradient(135deg, #1e3a8a 0%, #3730a3 50%, #1e1b4b 100%);
  min-height: 100vh;
}

.modal-enter-active, .modal-leave-active {
  transition: all 0.3s ease;
}

.modal-enter-from, .modal-leave-to {
  opacity: 0;
  transform: scale(0.95);
}

.modal-enter-to, .modal-leave-from {
  opacity: 1;
  transform: scale(1);
}

/* Custom scrollbar for modal */
.overflow-y-auto::-webkit-scrollbar {
  width: 6px;
}

.overflow-y-auto::-webkit-scrollbar-track {
  background: #374151;
  border-radius: 3px;
}

.overflow-y-auto::-webkit-scrollbar-thumb {
  background: #6B7280;
  border-radius: 3px;
}

.overflow-y-auto::-webkit-scrollbar-thumb:hover {
  background: #9CA3AF;
}
</style>