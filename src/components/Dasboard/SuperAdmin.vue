<template>
  <div class="min-h-screen bg-gray-100">
    <!-- Header -->
    <header class="bg-white shadow-sm border-b">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <div class="flex items-center">
            <h1 class="text-2xl font-bold text-gray-900">Super Admin Dashboard</h1>
          </div>
          <div class="flex items-center space-x-4">
            <span class="text-gray-700">Welcome, {{ currentUser?.name || 'Admin' }}</span>
            <button @click="handleLogout" class="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors duration-200">
              Logout
            </button>
          </div>
        </div>
      </div>
    </header>

    <!-- Navigation Tabs -->
    <nav class="bg-white shadow-sm">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex space-x-8">
          <button 
            v-for="tab in tabs" 
            :key="tab.id"
            @click="activeTab = tab.id"
            :class="[
              'py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200',
              activeTab === tab.id 
                ? 'border-blue-500 text-blue-600' 
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            ]"
          >
            {{ tab.name }}
          </button>
        </div>
      </div>
    </nav>

    <!-- Content -->
    <main class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      
      <!-- Users Tab -->
      <div v-if="activeTab === 'users'" class="px-4 py-6 sm:px-0">
        <div class="border-4 border-dashed border-gray-200 rounded-lg p-6">
          <div class="flex justify-between items-center mb-6">
            <h2 class="text-xl font-semibold text-gray-900">User Management</h2>
            <button @click="openAddUserModal" class="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors duration-200">
              Add New User
            </button>
          </div>
          
          <div class="overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50">
                <tr>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Username</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Full Name</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <tr v-for="user in users" :key="user.id" class="hover:bg-gray-50">
                  <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{{ user.username }}</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ user.email }}</td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <span :class="[
                      'px-2 inline-flex text-xs leading-5 font-semibold rounded-full',
                      user.role === 'super_admin' ? 'bg-red-100 text-red-800' : 
                      user.role === 'partner' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'
                    ]">
                      {{ user.role }}
                    </span>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ user.fullname }}</td>
                  <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button @click="editUser(user)" class="text-indigo-600 hover:text-indigo-900 mr-3 transition-colors duration-200">Edit</button>
                    <button @click="deleteUser(user.id)" class="text-red-600 hover:text-red-900 transition-colors duration-200">Delete</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <!-- Clients Tab -->
      <div v-if="activeTab === 'clients'" class="px-4 py-6 sm:px-0">
        <div class="border-4 border-dashed border-gray-200 rounded-lg p-6">
          <div class="flex justify-between items-center mb-6">
            <h2 class="text-xl font-semibold text-gray-900">Client Management</h2>
            <button @click="openAddClientModal" class="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors duration-200">
              Add New Client
            </button>
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div v-for="client in clients" :key="client.id" class="bg-white overflow-hidden shadow rounded-lg hover:shadow-md transition-shadow duration-200">
              <div class="px-4 py-5 sm:p-6">
                <div class="flex items-center">
                  <div class="flex-shrink-0">
                    <div class="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                      <span class="text-sm font-medium text-gray-700">{{ client.name.charAt(0) }}</span>
                    </div>
                  </div>
                  <div class="ml-5 w-0 flex-1">
                    <dl>
                      <dt class="text-sm font-medium text-gray-500 truncate">Client Name</dt>
                      <dd class="text-lg font-medium text-gray-900">{{ client.name }}</dd>
                    </dl>
                  </div>
                </div>
                <div class="mt-5">
                  <div class="text-sm text-gray-500 mb-3">
                    <p>{{ client.email }}</p>
                    <p>{{ client.phone }}</p>
                  </div>
                  <div class="flex space-x-3">
                    <button @click="editClient(client)" class="bg-blue-600 text-white px-3 py-2 rounded-md text-sm hover:bg-blue-700 transition-colors duration-200">
                      Edit
                    </button>
                    <button @click="deleteClient(client.id)" class="bg-red-600 text-white px-3 py-2 rounded-md text-sm hover:bg-red-700 transition-colors duration-200">
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Partners Tab -->
      <div v-if="activeTab === 'partners'" class="px-4 py-6 sm:px-0">
        <div class="border-4 border-dashed border-gray-200 rounded-lg p-6">
          <div class="flex justify-between items-center mb-6">
            <h2 class="text-xl font-semibold text-gray-900">Partner Management</h2>
            <button @click="openAddPartnerModal" class="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors duration-200">
              Add New Partner
            </button>
          </div>
          
          <div class="overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50">
                <tr>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Expertise</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <tr v-for="partner in partners" :key="partner.id" class="hover:bg-gray-50">
                  <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{{ partner.name }}</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ partner.phone }}</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ partner.expertise }}</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ partner.department }}</td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <span :class="[
                      'px-2 inline-flex text-xs leading-5 font-semibold rounded-full',
                      partner.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    ]">
                      {{ partner.status }}
                    </span>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button @click="editPartner(partner)" class="text-indigo-600 hover:text-indigo-900 mr-3 transition-colors duration-200">Edit</button>
                    <button @click="deletePartner(partner.id)" class="text-red-600 hover:text-red-900 transition-colors duration-200">Delete</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <!-- Portfolio Tab -->
      <div v-if="activeTab === 'portfolio'" class="px-4 py-6 sm:px-0">
        <div class="border-4 border-dashed border-gray-200 rounded-lg p-6">
          <div class="flex justify-between items-center mb-6">
            <h2 class="text-xl font-semibold text-gray-900">Portfolio Management</h2>
            <button @click="openAddPortfolioModal" class="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors duration-200">
              Add New Project
            </button>
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div v-for="project in portfolio" :key="project.id" class="bg-white overflow-hidden shadow rounded-lg hover:shadow-md transition-shadow duration-200">
              <div class="aspect-w-16 aspect-h-9">
                <img :src="project.image" :alt="project.title" class="w-full h-48 object-cover">
              </div>
              <div class="px-4 py-5 sm:p-6">
                <h3 class="text-lg font-medium text-gray-900 mb-2">{{ project.title }}</h3>
                <p class="text-sm text-gray-500 mb-4">{{ project.description }}</p>
                <div class="flex items-center justify-between">
                  <a :href="project.link" target="_blank" class="text-blue-600 hover:text-blue-800 text-sm transition-colors duration-200">
                    View Project
                  </a>
                  <div class="flex space-x-2">
                    <button @click="editPortfolio(project)" class="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 transition-colors duration-200">
                      Edit
                    </button>
                    <button @click="deletePortfolio(project.id)" class="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700 transition-colors duration-200">
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Services Tab -->
      <div v-if="activeTab === 'services'" class="px-4 py-6 sm:px-0">
        <div class="border-4 border-dashed border-gray-200 rounded-lg p-6">
          <div class="flex justify-between items-center mb-6">
            <h2 class="text-xl font-semibold text-gray-900">Service Management</h2>
            <button @click="openAddServiceModal" class="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors duration-200">
              Add New Service
            </button>
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div v-for="service in services" :key="service.id" class="bg-white overflow-hidden shadow rounded-lg hover:shadow-md transition-shadow duration-200">
              <div class="px-4 py-5 sm:p-6">
                <div class="flex items-center">
                  <div class="flex-shrink-0">
                    <div class="h-15 w-15 rounded-lg bg-blue-100 flex items-center justify-center">
                      <span class="text-2xl font-bold text-blue-600">{{ service.name.charAt(0) }}</span>
                    </div>
                  </div>
                  <div class="ml-5 w-0 flex-1">
                    <dl>
                      <dt class="text-sm font-medium text-gray-500 truncate">Service</dt>
                      <dd class="text-lg font-medium text-gray-900">{{ service.name }}</dd>
                    </dl>
                  </div>
                </div>
                <div class="mt-5">
                  <p class="text-sm text-gray-500 mb-3">{{ service.description }}</p>
                  <div class="flex space-x-3">
                    <button @click="editService(service)" class="bg-blue-600 text-white px-3 py-2 rounded-md text-sm hover:bg-blue-700 transition-colors duration-200">
                      Edit
                    </button>
                    <button @click="deleteService(service.id)" class="bg-red-600 text-white px-3 py-2 rounded-md text-sm hover:bg-red-700 transition-colors duration-200">
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import authStore from '../../store/auth'

export default {
  name: 'SuperAdmin',
  setup() {
    const router = useRouter()

    // Reactive data
    const activeTab = ref('users')
    
    const tabs = ref([
      { id: 'users', name: 'Users' },
      { id: 'clients', name: 'Clients' },
      { id: 'partners', name: 'Partners' },
      { id: 'portfolio', name: 'Portfolio' },
      { id: 'services', name: 'Services' }
    ])

    const users = ref([
      {
        id: 1,
        username: 'admin',
        email: 'admin@urpartnerid.com',
        role: 'super_admin',
        fullname: 'Super Administrator'
      },
      {
        id: 2,
        username: 'partner1',
        email: 'partner1@urpartnerid.com',
        role: 'partner',
        fullname: 'John Partner'
      },
      {
        id: 3,
        username: 'user1',
        email: 'user@urpartnerid.com',
        role: 'user',
        fullname: 'Regular User'
      }
    ])

    const clients = ref([
      {
        id: 1,
        name: 'PT ABC Company',
        email: 'contact@abc.com',
        phone: '021-123456'
      },
      {
        id: 2,
        name: 'CV XYZ Solutions',
        email: 'info@xyz.com',
        phone: '021-789012'
      },
      {
        id: 3,
        name: 'PT Teknologi Maju',
        email: 'tech@maju.com',
        phone: '021-345678'
      }
    ])

    const partners = ref([
      {
        id: 1,
        name: 'John Doe',
        phone: '081234567890',
        expertise: 'Full Stack Developer',
        department: 'Engineering',
        status: 'active'
      },
      {
        id: 2,
        name: 'Jane Smith',
        phone: '081234567891',
        expertise: 'UI/UX Designer',
        department: 'Design',
        status: 'active'
      },
      {
        id: 3,
        name: 'Mike Johnson',
        phone: '081234567892',
        expertise: 'DevOps Engineer',
        department: 'Infrastructure',
        status: 'inactive'
      }
    ])

    const portfolio = ref([
      {
        id: 1,
        title: 'E-commerce Website',
        description: 'Modern online store with payment integration',
        image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250',
        link: 'https://example-ecommerce.com'
      },
      {
        id: 2,
        title: 'Corporate Website',
        description: 'Professional business website with CMS',
        image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250',
        link: 'https://example-corporate.com'
      },
      {
        id: 3,
        title: 'Mobile Banking App',
        description: 'Secure banking application with biometric authentication',
        image: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250',
        link: 'https://example-banking.com'
      }
    ])

    const services = ref([
      {
        id: 1,
        name: 'Web Development',
        description: 'Custom website development using modern technologies like Vue.js, React, and Node.js'
      },
      {
        id: 2,
        name: 'Mobile App Development',
        description: 'Native and cross-platform mobile applications for iOS and Android'
      },
      {
        id: 3,
        name: 'UI/UX Design',
        description: 'User-centered design solutions for web and mobile applications'
      },
      {
        id: 4,
        name: 'Digital Marketing',
        description: 'SEO, social media marketing, and digital advertising services'
      }
    ])

    // Computed properties
    const currentUser = computed(() => authStore.currentUser)

    // Methods
    const handleLogout = () => {
      authStore.logout()
      router.push('/')
    }

    // User methods
    const openAddUserModal = () => {
      console.log('Open add user modal')
      alert('Add User Modal - Feature coming soon!')
    }

    const editUser = (user) => {
      console.log('Edit user:', user)
      alert(`Edit User: ${user.fullname} - Feature coming soon!`)
    }

    const deleteUser = (userId) => {
      if (confirm('Are you sure you want to delete this user?')) {
        users.value = users.value.filter(user => user.id !== userId)
        console.log('User deleted:', userId)
      }
    }

    // Client methods
    const openAddClientModal = () => {
      console.log('Open add client modal')
      alert('Add Client Modal - Feature coming soon!')
    }

    const editClient = (client) => {
      console.log('Edit client:', client)
      alert(`Edit Client: ${client.name} - Feature coming soon!`)
    }

    const deleteClient = (clientId) => {
      if (confirm('Are you sure you want to delete this client?')) {
        clients.value = clients.value.filter(client => client.id !== clientId)
        console.log('Client deleted:', clientId)
      }
    }

    // Partner methods
    const openAddPartnerModal = () => {
      console.log('Open add partner modal')
      alert('Add Partner Modal - Feature coming soon!')
    }

    const editPartner = (partner) => {
      console.log('Edit partner:', partner)
      alert(`Edit Partner: ${partner.name} - Feature coming soon!`)
    }

    const deletePartner = (partnerId) => {
      if (confirm('Are you sure you want to delete this partner?')) {
        partners.value = partners.value.filter(partner => partner.id !== partnerId)
        console.log('Partner deleted:', partnerId)
      }
    }

    // Portfolio methods
    const openAddPortfolioModal = () => {
      console.log('Open add portfolio modal')
      alert('Add Portfolio Modal - Feature coming soon!')
    }

    const editPortfolio = (project) => {
      console.log('Edit portfolio:', project)
      alert(`Edit Project: ${project.title} - Feature coming soon!`)
    }

    const deletePortfolio = (projectId) => {
      if (confirm('Are you sure you want to delete this project?')) {
        portfolio.value = portfolio.value.filter(project => project.id !== projectId)
        console.log('Portfolio deleted:', projectId)
      }
    }

    // Service methods
    const openAddServiceModal = () => {
      console.log('Open add service modal')
      alert('Add Service Modal - Feature coming soon!')
    }

    const editService = (service) => {
      console.log('Edit service:', service)
      alert(`Edit Service: ${service.name} - Feature coming soon!`)
    }

    const deleteService = (serviceId) => {
      if (confirm('Are you sure you want to delete this service?')) {
        services.value = services.value.filter(service => service.id !== serviceId)
        console.log('Service deleted:', serviceId)
      }
    }

    // Lifecycle
    onMounted(() => {
      // Check if user is actually super admin
      if (!authStore.isSuperAdmin()) {
        console.log('Access denied: Not a super admin')
        router.push('/')
        return
      }

      console.log('Super Admin dashboard loaded for:', currentUser.value?.name)
    })

    return {
      // Data
      activeTab,
      tabs,
      users,
      clients,
      partners,
      portfolio,
      services,
      
      // Computed
      currentUser,
      
      // Methods
      handleLogout,
      openAddUserModal,
      editUser,
      deleteUser,
      openAddClientModal,
      editClient,
      deleteClient,
      openAddPartnerModal,
      editPartner,
      deletePartner,
      openAddPortfolioModal,
      editPortfolio,
      deletePortfolio,
      openAddServiceModal,
      editService,
      deleteService
    }
  }
}
</script>

<style scoped>
/* Custom styles */
.aspect-w-16 {
  position: relative;
  padding-bottom: 56.25%; /* 16:9 aspect ratio */
}

.aspect-w-16 > img {
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  object-fit: cover;
}

/* Hover effects */
.hover\:shadow-md:hover {
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

/* Transition effects */
.transition-all {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}

.transition-colors {
  transition-property: color, background-color, border-color, text-decoration-color, fill, stroke;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}

.transition-shadow {
  transition-property: box-shadow;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}

.duration-200 {
  transition-duration: 200ms;
}
</style>