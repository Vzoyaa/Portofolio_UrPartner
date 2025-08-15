import { reactive } from 'vue'

// 🚨 DEBUGGING: Log ketika file dimuat
console.log('🏪 AUTH STORE: File loaded at', new Date().toLocaleTimeString())

// Simulasi database user
const mockUsers = [
  {
    id: 1,
    email: 'admin@urpartnerid.com',
    password: 'admin123',
    role: 'super_admin',
    name: 'Super Admin'
  },
  {
    id: 2,
    email: 'user@urpartnerid.com',
    password: 'user123',
    role: 'user',
    name: 'Regular User'
  }
]

// 🚨 DEBUGGING: Log mock users
console.log('👥 MOCK USERS loaded:', mockUsers)

// State management
const state = reactive({
  currentUser: null,
  isAuthenticated: false,
  token: null
})

const authStore = {
  // State getters
  get currentUser() {
    return state.currentUser
  },

  get isAuthenticated() {
    return state.isAuthenticated
  },

  get token() {
    return state.token
  },

  // Login method
  async login(email, password) {
    try {
      console.log('Auth Store: Attempting login with:', email)
      
      // Simulasi delay API call
      await new Promise(resolve => setTimeout(resolve, 1000))

      // Cari user berdasarkan email dan password
      const user = mockUsers.find(u => 
        u.email.toLowerCase() === email.toLowerCase() && 
        u.password === password
      )

      console.log('Auth Store: User found:', user ? user.email : 'No user found')

      if (user) {
        // Login berhasil
        const token = `token_${Date.now()}_${user.id}`
        
        state.currentUser = {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role
        }
        state.isAuthenticated = true
        state.token = token

        // Simpan ke localStorage untuk persistence
        localStorage.setItem('auth_token', token)
        localStorage.setItem('current_user', JSON.stringify(state.currentUser))

        return {
          success: true,
          user: state.currentUser,
          token: token
        }
      } else {
        // Login gagal
        return {
          success: false,
          error: 'Invalid email or password'
        }
      }
    } catch (error) {
      console.error('Login error:', error)
      return {
        success: false,
        error: 'Login failed. Please try again.'
      }
    }
  },

  // Logout method
  logout() {
    state.currentUser = null
    state.isAuthenticated = false
    state.token = null

    // Hapus dari localStorage
    localStorage.removeItem('auth_token')
    localStorage.removeItem('current_user')
  },

  // Check authentication on app load
  checkAuth() {
    const token = localStorage.getItem('auth_token')
    const userStr = localStorage.getItem('current_user')

    if (token && userStr) {
      try {
        const user = JSON.parse(userStr)
        state.currentUser = user
        state.isAuthenticated = true
        state.token = token
        return true
      } catch (error) {
        console.error('Error parsing stored user data:', error)
        this.logout()
        return false
      }
    }
    return false
  },

  // Verify if user has specific role
  hasRole(role) {
    return state.currentUser?.role === role
  },

  // Check if user is super admin
  isSuperAdmin() {
    return this.hasRole('super_admin')
  }
}

export default authStore