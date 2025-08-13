<template>
  <nav
    :class="['fixed top-0 w-full z-50 transition-all duration-300', isScrolled ? 'bg-white shadow-md' : 'bg-transparent']"
  >
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between h-16">
        
        <!-- Logo -->
        <div class="flex items-center">
          <router-link 
            to="/" 
            class="text-2xl font-bold transition-colors duration-300"
            :class="isScrolled ? 'text-gray-900' : 'text-white'"
          >
            MyPorto<span class="text-blue-500">.</span>
          </router-link>
        </div>

        <!-- Desktop Menu -->
        <div class="hidden md:flex space-x-8 items-center">
          <template v-for="item in navItems" :key="item.name">
            <router-link
              v-if="item.to.startsWith('/')"
              :to="item.to"
              class="flex items-center space-x-2 relative group transition-colors duration-300 px-3 py-2 rounded-md"
              :class="isActive(item) ? 'text-blue-600 font-semibold' : isScrolled ? 'text-gray-700 hover:text-blue-600' : 'text-white hover:text-blue-300'"
            >
              <component :is="item.icon" class="h-5 w-5" />
              <span>{{ item.name }}</span>
              <span
                class="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300 group-hover:w-full"
              ></span>
            </router-link>

            <a
              v-else
              :href="item.to"
              class="flex items-center space-x-2 relative group transition-colors duration-300 cursor-pointer px-3 py-2 rounded-md"
              :class="isActive(item) ? 'text-blue-600 font-semibold' : isScrolled ? 'text-gray-700 hover:text-blue-600' : 'text-white hover:text-blue-300'"
              @click.prevent="scrollToSection(item.to)"
            >
              <component :is="item.icon" class="h-5 w-5" />
              <span>{{ item.name }}</span>
              <span
                class="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300 group-hover:w-full"
              ></span>
            </a>
          </template>
        </div>

        <!-- Mobile Toggle -->
        <div class="md:hidden flex items-center">
          <button 
            @click="toggleMenu" 
            class="focus:outline-none p-2 rounded-md transition-colors duration-300"
            :class="isScrolled ? 'text-gray-700 hover:bg-gray-100' : 'text-white hover:bg-white/10'"
          >
            <Bars3Icon v-if="!isMenuOpen" class="h-6 w-6" />
            <XMarkIcon v-else class="h-6 w-6" />
          </button>
        </div>

      </div>
    </div>

    <!-- Mobile Menu -->
    <div 
      v-if="isMenuOpen" 
      class="md:hidden bg-white/95 backdrop-blur-sm shadow-lg border-t border-gray-200"
    >
      <div class="px-4 py-4 space-y-2">
        <template v-for="item in navItems" :key="item.name">
          <router-link
            v-if="item.to.startsWith('/')"
            :to="item.to"
            class="flex items-center space-x-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 px-4 py-3 rounded-lg transition-all duration-300"
            @click="closeMenu"
          >
            <component :is="item.icon" class="h-5 w-5" />
            <span class="font-medium">{{ item.name }}</span>
          </router-link>

          <a
            v-else
            :href="item.to"
            class="flex items-center space-x-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 px-4 py-3 rounded-lg transition-all duration-300 cursor-pointer"
            @click.prevent="scrollToSection(item.to); closeMenu()"
          >
            <component :is="item.icon" class="h-5 w-5" />
            <span class="font-medium">{{ item.name }}</span>
          </a>
        </template>
      </div>
    </div>
  </nav>
</template>

<script>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { 
  HomeIcon, 
  UserIcon, 
  FolderIcon, 
  EnvelopeIcon,
  Bars3Icon,
  XMarkIcon
} from '@heroicons/vue/24/outline'

export default {
  name: 'Navbar',
  components: {
    HomeIcon,
    UserIcon,
    FolderIcon,
    EnvelopeIcon,
    Bars3Icon,
    XMarkIcon
  },
  setup() {
    const route = useRoute()
    const router = useRouter()
    const isScrolled = ref(false)
    const isMenuOpen = ref(false)
    const activeSection = ref('')

    // Menu Items dengan Heroicons
    const navItems = [
      { name: 'Home', to: '#home', icon: HomeIcon },
      { name: 'About', to: '#about', icon: UserIcon },
      { name: 'Projects', to: '/projects', icon: FolderIcon },
      { name: 'Contact', to: '#contact', icon: EnvelopeIcon }
    ]

    const toggleMenu = () => {
      isMenuOpen.value = !isMenuOpen.value
    }

    const closeMenu = () => {
      isMenuOpen.value = false
    }

    // Scroll Detection
    const handleScroll = () => {
      isScrolled.value = window.scrollY > 20

      // Detect active section untuk home page
      if (route.path === '/') {
        const sections = ['home', 'about', 'contact']
        const scrollPosition = window.scrollY + 100

        for (const sectionId of sections) {
          const section = document.getElementById(sectionId)
          if (section) {
            const { offsetTop, offsetHeight } = section
            if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
              activeSection.value = `#${sectionId}`
              break
            }
          }
        }
      }
    }

    // Scroll to section
    const scrollToSection = async (id) => {
      // Jika tidak di home page, redirect ke home dulu
      if (route.path !== '/') {
        await router.push('/')
        // Wait for navigation to complete
        setTimeout(() => {
          const element = document.querySelector(id)
          if (element) {
            element.scrollIntoView({ 
              behavior: 'smooth',
              block: 'start'
            })
          }
        }, 100)
      } else {
        // Jika sudah di home page, langsung scroll
        const element = document.querySelector(id)
        if (element) {
          element.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
          })
        }
      }
    }

    const isActive = (item) => {
      if (item.to.startsWith('/')) {
        return route.path === item.to
      }
      return activeSection.value === item.to
    }

    onMounted(() => {
      window.addEventListener('scroll', handleScroll)
      handleScroll() // Check initial state
    })

    onUnmounted(() => {
      window.removeEventListener('scroll', handleScroll)
    })

    return {
      isScrolled,
      isMenuOpen,
      activeSection,
      navItems,
      toggleMenu,
      closeMenu,
      scrollToSection,
      isActive
    }
  }
}
</script>

<style scoped>
/* Custom transitions */
</style>