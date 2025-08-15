<template>
  <nav class="fixed top-0 w-full z-50 transition-all duration-500 bg-transparent">
    
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-14 sm:h-16">
        
        <!-- Logo Section -->
        <div class="flex items-center gap-2 sm:gap-3 flex-shrink-0">
          <img 
            alt="Logo" 
            src="@/assets/logo.png" 
            class="h-6 w-6 sm:h-8 sm:w-8 object-contain"
          />
          <span class="text-lg sm:text-xl font-semibold text-white">
            UrPartnerID
          </span>
        </div>

        <!-- Center Menu - Hidden on mobile -->
        <div class="hidden lg:flex">
          <div class="flex items-center space-x-1 bg-white/10 backdrop-blur-sm rounded-full px-2 py-1 border border-white/20">
            <template v-for="item in navItems" :key="item.name">
              <router-link
                v-if="item.to.startsWith('/')"
                :to="item.to"
                class="relative px-4 xl:px-6 py-2 text-sm font-medium text-white/80 hover:text-white transition-all duration-300 rounded-full hover:bg-white/10"
                :class="isActive(item) ? 'bg-white/20 text-white shadow-lg' : ''"
              >
                {{ item.name }}
              </router-link>

              <a
                v-else
                :href="item.to"
                class="relative px-4 xl:px-6 py-2 text-sm font-medium text-white/80 hover:text-white transition-all duration-300 rounded-full hover:bg-white/10 cursor-pointer"
                :class="isActive(item) ? 'bg-white/20 text-white shadow-lg' : ''"
                @click.prevent="scrollToSection(item.to)"
              >
                {{ item.name }}
              </a>
            </template>
          </div>
        </div>

        <!-- Right Side - Login (Hidden on mobile) -->
        <div class="hidden md:block flex-shrink-0">
          <button
            @click="openLoginModal"
            class="px-4 lg:px-6 py-2 text-sm font-medium bg-white/10 backdrop-blur-sm rounded-full border border-white/20 text-white hover:bg-white/20 transition-all duration-300 hover:scale-105 transform"
          >
            LOGIN
          </button>
        </div>

        <!-- Mobile Toggle -->
        <div class="md:hidden flex items-center">
          <button 
            @click="toggleMenu" 
            class="p-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 transition-all duration-300"
          >
            <Bars3Icon v-if="!isMenuOpen" class="h-5 w-5" />
            <XMarkIcon v-else class="h-5 w-5" />
          </button>
        </div>

      </div>
    </div>

    <!-- Mobile Menu -->
    <div 
      v-if="isMenuOpen" 
      class="md:hidden absolute top-full left-0 w-full bg-white/10 backdrop-blur-md border-b border-white/20"
    >
      <div class="px-4 py-4 space-y-2">
        <template v-for="item in navItems" :key="item.name">
          <router-link
            v-if="item.to.startsWith('/')"
            :to="item.to"
            class="block text-white/80 hover:text-white px-4 py-3 rounded-lg hover:bg-white/10 transition-all duration-300 font-medium"
            @click="closeMenu"
          >
            {{ item.name }}
          </router-link>

          <a
            v-else
            :href="item.to"
            class="block text-white/80 hover:text-white px-4 py-3 rounded-lg hover:bg-white/10 transition-all duration-300 cursor-pointer font-medium"
            @click.prevent="scrollToSection(item.to); closeMenu()"
          >
            {{ item.name }}
          </a>
        </template>
        
        <!-- Mobile Login -->
        <button
          @click="openLoginModal(); closeMenu()"
          class="block text-white/80 hover:text-white px-4 py-3 rounded-lg hover:bg-white/10 transition-all duration-300 font-medium w-full text-left"
        >
          LOGIN
        </button>
      </div>
    </div>

    <!-- Login Modal -->
    <div 
      v-if="showLoginModal" 
      class="fixed inset-0 z-[100] flex items-center justify-center p-4"
      @click="closeLoginModal"
    >
      <!-- Backdrop -->
      <div class="absolute inset-0 backdrop-blur-sm"></div>
      
      <!-- Modal Content -->
      <div 
        class="relative w-full max-w-xs sm:max-w-sm md:max-w-md bg-white/10 backdrop-blur-lg rounded-2xl sm:rounded-3xl border border-white/20 shadow-2xl p-4 sm:p-6 md:p-8 animate-modal-enter"
        @click.stop
      >
        <!-- Close Button -->
        <button 
          @click="closeLoginModal"
          class="absolute top-3 right-3 sm:top-4 sm:right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors duration-200"
        >
          <XMarkIcon class="h-4 w-4 sm:h-5 sm:w-5 text-white" />
        </button>

        <!-- Header -->
        <div class="text-center mb-3 sm:mb-4">
          <!-- Logo Section -->
          <div class="flex justify-center items-center gap-1.5 sm:gap-2 mb-2 sm:mb-3">
            <!-- Your Logo -->
            <div class="w-7 h-7 sm:w-8 sm:h-8 bg-white/10 backdrop-blur-sm rounded-lg flex items-center justify-center border border-white/20">
              <img 
                alt="UrPartnerID Logo" 
                src="@/assets/logo.png" 
                class="h-4 w-4 sm:h-5 sm:w-5 object-contain"
                onerror="this.style.display='none'; this.nextElementSibling.style.display='flex'"
              />
              <!-- Fallback if logo fails to load -->
              <UserIcon class="h-3 w-3 sm:h-4 sm:w-4 text-white" style="display: none;" />
            </div>
            <span class="text-sm sm:text-base font-semibold text-white">UrPartnerID</span>
          </div>
          <h2 class="text-lg sm:text-xl md:text-2xl font-bold text-white mb-1">Welcome Back</h2>
          <p class="text-white/70 text-xs">Sign in to your account</p>
        </div>

        <!-- Login Form -->
        <form @submit.prevent="handleLogin" class="space-y-2.5 sm:space-y-3">
          
          <!-- Email Field -->
          <div>
            <label for="modal-email" class="block text-xs font-medium text-white/80 mb-1">
              Email Address
            </label>
            <div class="relative">
              <EnvelopeIcon class="absolute left-2.5 top-1/2 transform -translate-y-1/2 h-3.5 w-3.5 text-white/50" />
              <input
                id="modal-email"
                v-model="form.email"
                type="email"
                required
                class="w-full pl-8 pr-3 py-1.5 sm:py-2 bg-white/5 backdrop-blur-sm border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-white/40 focus:bg-white/10 transition-all duration-300 text-xs sm:text-sm"
                placeholder="Enter your email"
                :class="{ 'border-red-400 focus:border-red-400': errors.email }"
              />
            </div>
            <p v-if="errors.email" class="mt-0.5 text-red-400 text-xs">{{ errors.email }}</p>
          </div>

          <!-- Password Field -->
          <div>
            <label for="modal-password" class="block text-xs font-medium text-white/80 mb-1">
              Password
            </label>
            <div class="relative">
              <LockClosedIcon class="absolute left-2.5 top-1/2 transform -translate-y-1/2 h-3.5 w-3.5 text-white/50" />
              <input
                id="modal-password"
                v-model="form.password"
                :type="showPassword ? 'text' : 'password'"
                required
                class="w-full pl-8 pr-8 py-1.5 sm:py-2 bg-white/5 backdrop-blur-sm border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-white/40 focus:bg-white/10 transition-all duration-300 text-xs sm:text-sm"
                placeholder="Enter your password"
                :class="{ 'border-red-400 focus:border-red-400': errors.password }"
              />
              <button
                type="button"
                @click="togglePassword"
                class="absolute right-2.5 top-1/2 transform -translate-y-1/2 text-white/50 hover:text-white/70 transition-colors duration-200"
              >
                <EyeIcon v-if="!showPassword" class="h-3.5 w-3.5" />
                <EyeSlashIcon v-else class="h-3.5 w-3.5" />
              </button>
            </div>
            <p v-if="errors.password" class="mt-0.5 text-red-400 text-xs">{{ errors.password }}</p>
          </div>

          <!-- Remember & Forgot -->
          <div class="flex items-center justify-between text-xs pt-1">
            <label class="flex items-center">
              <input
                v-model="form.remember"
                type="checkbox"
                class="w-2.5 h-2.5 bg-white/5 border border-white/20 rounded text-blue-500 focus:ring-blue-500 focus:ring-1"
              />
              <span class="ml-1 text-white/80">Remember me</span>
            </label>
            <a href="#" class="text-white/80 hover:text-white transition-colors duration-200">
              Forgot password?
            </a>
          </div>

          <!-- Login Button -->
          <button
            type="submit"
            :disabled="isLoading"
            class="w-full py-2 px-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2 text-xs sm:text-sm mt-3"
          >
            <span v-if="!isLoading">Sign In</span>
            <span v-else class="flex items-center gap-2">
              <div class="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              Signing In...
            </span>
          </button>

          <!-- Error Message (only show when needed) -->
          <div v-if="loginError" class="p-2 bg-red-500/10 border border-red-500/30 rounded-lg animate-shake mt-2">
            <div class="flex items-center gap-1.5">
              <ExclamationTriangleIcon class="h-3.5 w-3.5 text-red-400 flex-shrink-0" />
              <div>
                <p class="text-red-400 text-xs font-medium">Login Failed</p>
                <p class="text-red-300 text-xs">{{ loginError }}</p>
              </div>
            </div>
          </div>

          <!-- Divider -->
          <div class="relative my-2.5">
            <div class="absolute inset-0 flex items-center">
              <div class="w-full border-t border-white/20"></div>
            </div>
            <div class="relative flex justify-center text-xs">
              <span class="px-2 text-white/60 bg-transparent">Or continue with</span>
            </div>
          </div>

          <!-- Google Login Only -->
          <button
            type="button"
            @click="handleGoogleLogin"
            class="w-full flex items-center justify-center gap-2 py-1.5 sm:py-2 px-4 bg-white/5 backdrop-blur-sm border border-white/20 rounded-lg text-white/80 hover:bg-white/10 hover:text-white transition-all duration-300 hover:scale-[1.02] transform"
          >
            <!-- Google Logo -->
            <div class="w-4 h-4 bg-white rounded-sm p-0.5">
              <svg viewBox="0 0 24 24" class="w-full h-full">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC04" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
            </div>
            <span class="font-medium text-xs sm:text-sm">Continue with Google</span>
          </button>

        </form>

        <!-- Sign Up Link -->
        <div class="text-center mt-3 pt-2.5 border-t border-white/20">
          <p class="text-white/70 text-xs">
            Don't have an account? 
            <a 
              href="#" 
              @click.prevent="switchToSignUp"
              class="text-white font-semibold hover:text-blue-300 transition-colors duration-200"
            >
              Sign up
            </a>
          </p>
        </div>

      </div>
    </div>
  </nav>
</template>

<script>
import { ref, reactive, onMounted, onUnmounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import authStore from '../store/auth'
import { 
  Bars3Icon,
  XMarkIcon,
  UserIcon,
  EnvelopeIcon,
  LockClosedIcon,
  EyeIcon,
  EyeSlashIcon,
  ExclamationTriangleIcon
} from '@heroicons/vue/24/outline'

export default {
  name: 'Navbar',
  components: {
    Bars3Icon,
    XMarkIcon,
    UserIcon,
    EnvelopeIcon,
    LockClosedIcon,
    EyeIcon,
    EyeSlashIcon,
    ExclamationTriangleIcon
  },
  setup() {
    const route = useRoute()
    const router = useRouter()
    const isMenuOpen = ref(false)
    const activeSection = ref('')
    
    // Login Modal State
    const showLoginModal = ref(false)
    const isLoading = ref(false)
    const showPassword = ref(false)
    const loginError = ref('')

    const form = reactive({
      email: '',
      password: '',
      remember: false
    })

    const errors = reactive({
      email: '',
      password: ''
    })

    // Menu Items - Portfolio dipindah ke tengah menggantikan Services
    const navItems = [
      { name: 'HOME', to: '#home' },
      { name: 'ABOUT', to: '#about' },
      { name: 'PORTFOLIO', to: '/projects' },
      { name: 'CONTACT', to: '#contact' }
    ]

    const toggleMenu = () => {
      isMenuOpen.value = !isMenuOpen.value
    }

    const closeMenu = () => {
      isMenuOpen.value = false
    }

    // Login Modal Functions
    const openLoginModal = () => {
      showLoginModal.value = true
      resetForm()
    }

    const closeLoginModal = () => {
      showLoginModal.value = false
      resetForm()
    }

    const resetForm = () => {
      form.email = ''
      form.password = ''
      form.remember = false
      errors.email = ''
      errors.password = ''
      loginError.value = ''
    }

    const togglePassword = () => {
      showPassword.value = !showPassword.value
    }

    const validateForm = () => {
      let isValid = true
      
      // Reset errors
      errors.email = ''
      errors.password = ''

      // Email validation
      if (!form.email) {
        errors.email = 'Email is required'
        isValid = false
      } else if (!/\S+@\S+\.\S+/.test(form.email)) {
        errors.email = 'Please enter a valid email'
        isValid = false
      }

      // Password validation
      if (!form.password) {
        errors.password = 'Password is required'
        isValid = false
      } else if (form.password.length < 6) {
        errors.password = 'Password must be at least 6 characters'
        isValid = false
      }

      return isValid
    }

    const handleLogin = async () => {
  // 🚨 DEBUGGING LOGS - Akan muncul di Browser Console
  console.log('🔑 LOGIN ATTEMPT STARTED')
  console.log('📧 Email:', form.email)
  console.log('🔒 Password:', form.password)
  console.log('📝 Form data:', { 
    email: form.email, 
    password: form.password,
    remember: form.remember 
  })
  
  if (!validateForm()) {
    console.log('❌ FORM VALIDATION FAILED')
    console.log('🔍 Validation errors:', errors)
    return
  }

  console.log('✅ FORM VALIDATION PASSED')
  isLoading.value = true
  loginError.value = ''

  try {
    console.log('🚀 CALLING authStore.login...')
    console.log('🏪 AuthStore current state BEFORE login:', {
      isAuthenticated: authStore.isAuthenticated,
      currentUser: authStore.currentUser,
      token: authStore.token
    })
    
    const result = await authStore.login(form.email, form.password)
    
    console.log('📥 LOGIN RESULT:', result)
    console.log('🏪 AuthStore current state AFTER login:', {
      isAuthenticated: authStore.isAuthenticated,
      currentUser: authStore.currentUser,
      token: authStore.token
    })
    
    if (result.success) {
      console.log('✅ LOGIN SUCCESSFUL!')
      console.log('👤 Logged in user:', result.user)
      console.log('🎯 User role:', result.user?.role)
      
      closeLoginModal()
      
      // Redirect berdasarkan role
      if (authStore.currentUser?.role === 'super_admin') {
        console.log('🚀 REDIRECTING TO SUPER ADMIN DASHBOARD')
        console.log('🛣️  Route: /super-admin')
        await router.push('/super-admin')
        console.log('✅ REDIRECT COMPLETED')
      } else {
        console.log('🏠 REDIRECTING TO HOME')
        console.log('🛣️  Route: /')
        await router.push('/')
        console.log('✅ REDIRECT COMPLETED')
      }
    } else {
      console.log('❌ LOGIN FAILED')
      console.log('🚫 Error reason:', result.error)
      loginError.value = result.error || 'Login failed. Please try again.'
    }
  } catch (error) {
    console.error('💥 LOGIN ERROR OCCURRED:', error)
    console.error('🔍 Error details:', error.message)
    console.error('📚 Error stack:', error.stack)
    loginError.value = 'Connection error. Please check your internet connection and try again.'
  } finally {
    isLoading.value = false
    console.log('🏁 LOGIN PROCESS COMPLETED')
    console.log('⏰ Timestamp:', new Date().toLocaleTimeString())
    console.log('=====================================')
  }
}

    // Google Login Handler (placeholder for future implementation)
    const handleGoogleLogin = () => {
      console.log('Google login clicked - not implemented yet')
      loginError.value = 'Google login is not yet implemented. Please use email/password login.'
    }

    // Switch to Sign Up (placeholder for future implementation)
    const switchToSignUp = () => {
      console.log('Switch to sign up clicked - not implemented yet')
      closeLoginModal()
      loginError.value = 'Sign up feature is not yet implemented.'
    }

    // Scroll to section
    const scrollToSection = async (id) => {
      if (route.path !== '/') {
        await router.push('/')
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

    // Close modal when pressing Escape
    const handleKeydown = (e) => {
      if (e.key === 'Escape' && showLoginModal.value) {
        closeLoginModal()
      }
    }

const handleScroll = () => {
  const navbar = document.querySelector('nav')
  navbar.classList.add('bg-transparent')
  navbar.classList.remove('bg-black/80', 'backdrop-blur-md')
}


    onMounted(() => {
      window.addEventListener('scroll', handleScroll)
      window.addEventListener('keydown', handleKeydown)
      handleScroll()
    })

    onUnmounted(() => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('keydown', handleKeydown)
    })

    return {
      isMenuOpen,
      activeSection,
      navItems,
      showLoginModal,
      form,
      errors,
      isLoading,
      showPassword,
      loginError,
      toggleMenu,
      closeMenu,
      scrollToSection,
      isActive,
      openLoginModal,
      closeLoginModal,
      togglePassword,
      handleLogin,
      handleGoogleLogin,
      switchToSignUp
    }
  }
}
</script>

<style scoped>
/* Custom backdrop blur fallback */
@supports not (backdrop-filter: blur(12px)) {
  .backdrop-blur-md {
    background-color: rgba(255, 255, 255, 0.15);
  }
  .backdrop-blur-lg {
    background-color: rgba(255, 255, 255, 0.1);
  }
  .backdrop-blur-sm {
    background-color: rgba(255, 255, 255, 0.05);
  }
}

/* Modal animations */
@keyframes modal-enter {
  from {
    opacity: 0;
    transform: scale(0.9) translateY(-10px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

@keyframes shake {
  0%, 100% { transform: translateX(0); }
  10%, 30%, 50%, 70%, 90% { transform: translateX(-2px); }
  20%, 40%, 60%, 80% { transform: translateX(2px); }
}

.animate-modal-enter {
  animation: modal-enter 0.3s ease-out;
}

.animate-shake {
  animation: shake 0.5s ease-in-out;
}

/* Custom checkbox styling */
input[type="checkbox"]:checked {
  background-image: url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='m13.854 3.646-7.5 7.5a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L6 10.293l7.146-7.147a.5.5 0 0 1 .708.708z'/%3e%3c/svg%3e");
}

/* Responsive improvements */
@media (max-width: 640px) {
  .fixed {
    position: fixed;
  }
  
  /* Ensure modal is properly sized on small screens */
  .max-w-xs {
    max-width: 16rem; /* 256px - lebih kecil lagi */
  }
}

@media (max-width: 480px) {
  /* Extra small screens */
  .max-w-xs {
    max-width: 15rem; /* 240px */
  }
}

@media (max-width: 360px) {
  /* Very small screens */
  .max-w-xs {
    max-width: 14rem; /* 224px */
    margin: 0 0.5rem;
  }
}

/* Better spacing for tablet sizes */
@media (min-width: 768px) and (max-width: 1023px) {
  .max-w-7xl {
    padding-left: 1.5rem;
    padding-right: 1.5rem;
  }
}

/* Ultra-wide screen adjustments */
@media (min-width: 1536px) {
  .max-w-7xl {
    max-width: 90rem;
  }
}
</style>