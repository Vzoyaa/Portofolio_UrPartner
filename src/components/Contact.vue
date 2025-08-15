<template>
  <section id="contact" class="min-h-screen bg-transparent overflow-hidden">
    <!-- Background Pattern -->
    <div class="absolute inset-0 opacity-20">
      <div class="absolute inset-0" style="background-image: radial-gradient(circle at 1px 1px, rgba(139, 92, 246, 0.3) 1px, transparent 0); background-size: 20px 20px;"></div>
    </div>

    <!-- Floating Elements -->
    <div class="absolute top-20 left-10 w-72 h-72 bg-purple-600 rounded-full opacity-10 blur-3xl animate-pulse"></div>
    <div class="absolute bottom-20 right-10 w-96 h-96 bg-blue-600 rounded-full opacity-10 blur-3xl animate-pulse delay-1000"></div>

    <div class="container mx-auto px-4 py-20 relative z-10">
      <!-- Header -->
      <div class="text-center mb-16">
        <h2 
          class="text-5xl lg:text-6xl font-bold text-white mb-4 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent"
          data-aos="fade-up"
        >
          Hubungi Saya
        </h2>
        <p 
          class="text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          Punya pertanyaan? Kirim saya pesan, dan saya akan segera membalasnya.
        </p>
      </div>

      <!-- Grid: Form & Comments -->
      <div class="grid lg:grid-cols-2 gap-12 max-w-7xl mx-auto">
        <!-- Left: Contact Form -->
        <div 
          class="space-y-8"
          data-aos="fade-right"
          data-aos-delay="300"
        >
          <!-- Contact Form Card -->
          <div class="bg-slate-800/50 backdrop-blur-lg rounded-2xl p-8 border border-slate-700/50 shadow-2xl hover:shadow-purple-500/10 transition-all duration-500">
            <div class="flex items-center space-x-3 mb-6">
              <div class="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                <span class="text-white text-sm font-bold">✉</span>
              </div>
              <h3 class="text-xl font-bold text-white">Hubungi</h3>
            </div>
            
            <p class="text-gray-400 mb-8 leading-relaxed">
              Ada yang ingin didiskusikan? Kirim saya pesan, dan mari kita bicara.
            </p>

            <!-- Contact Form -->
            <form @submit.prevent="handleSubmit" class="space-y-6">
              <!-- Name Field -->
              <div class="group">
                <div class="relative">
                  <UserIcon class="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-purple-400 transition-colors duration-300" />
                  <input
                    v-model="form.name"
                    type="text"
                    required
                    placeholder="Nama Anda"
                    class="w-full pl-12 pr-4 py-4 bg-slate-700/50 border border-slate-600/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 hover:bg-slate-700/70"
                  >
                </div>
              </div>

              <!-- Email Field -->
              <div class="group">
                <div class="relative">
                  <EnvelopeIcon class="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-purple-400 transition-colors duration-300" />
                  <input
                    v-model="form.email"
                    type="email"
                    required
                    placeholder="Email Anda"
                    class="w-full pl-12 pr-4 py-4 bg-slate-700/50 border border-slate-600/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 hover:bg-slate-700/70"
                  >
                </div>
              </div>

              <!-- Message Field -->
              <div class="group">
                <div class="relative">
                  <ChatBubbleLeftIcon class="absolute left-4 top-4 h-5 w-5 text-gray-400 group-focus-within:text-purple-400 transition-colors duration-300" />
                  <textarea
                    v-model="form.message"
                    required
                    rows="4"
                    placeholder="Pesan Anda"
                    class="w-full pl-12 pr-4 py-4 bg-slate-700/50 border border-slate-600/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 resize-none hover:bg-slate-700/70"
                  ></textarea>
                </div>
              </div>

              <!-- Submit Button -->
              <button
                type="submit"
                :disabled="isSubmitting"
                class="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold py-4 px-6 rounded-xl hover:from-purple-700 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-slate-800 transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg hover:shadow-purple-500/25 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none group"
              >
                <span v-if="!isSubmitting" class="flex items-center justify-center">
                  <CheckIcon class="mr-2 h-5 w-5 group-hover:rotate-12 transition-transform duration-300" />
                  Kirim Pesan
                </span>
                <span v-else class="flex items-center justify-center">
                  <svg class="animate-spin -ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Mengirim...
                </span>
              </button>
            </form>

            <!-- Success Message -->
            <div
              v-if="showSuccess"
              class="mt-6 p-4 bg-green-500/20 border border-green-500/30 rounded-xl text-green-100 animate-fadeIn"
            >
              <div class="flex items-center">
                <CheckCircleIcon class="h-5 w-5 mr-2 animate-bounce" />
                Pesan berhasil dikirim! Saya akan segera merespon.
              </div>
            </div>
          </div>
        </div>

        <!-- Right: Comments Section -->
        <div 
          class="space-y-8"
          data-aos="fade-left"
          data-aos-delay="400"
        >
          <!-- Comments Section -->
          <div class="bg-slate-800/50 backdrop-blur-lg rounded-2xl p-8 border border-slate-700/50 shadow-2xl hover:shadow-purple-500/10 transition-all duration-500">
            <div class="flex items-center justify-between mb-6">
              <div class="flex items-center space-x-3">
                <div class="w-8 h-8 bg-gradient-to-r from-green-500 to-teal-500 rounded-full flex items-center justify-center">
                  <span class="text-white text-sm font-bold">💬</span>
                </div>
                <h3 class="text-xl font-bold text-white">Comments</h3>
              </div>
              <span class="bg-purple-600/20 text-purple-300 px-3 py-1 rounded-full text-sm font-semibold">({{ comments.length }})</span>
            </div>

            <!-- Comments List -->
            <div class="space-y-4 max-h-80 overflow-y-auto custom-scrollbar">
              <div
                v-for="(comment, index) in comments"
                :key="index"
                class="bg-slate-700/30 rounded-xl p-4 hover:bg-slate-700/50 transition-all duration-300 group"
                data-aos="fade-up"
                :data-aos-delay="500 + (index * 100)"
              >
                <div class="flex items-start space-x-3">
                  <div class="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <span class="text-white text-xs font-bold">{{ comment.name.charAt(0).toUpperCase() }}</span>
                  </div>
                  <div class="flex-grow">
                    <div class="flex items-center justify-between mb-1">
                      <h4 class="text-white font-semibold text-sm">{{ comment.name }}</h4>
                      <span class="text-gray-400 text-xs">{{ comment.date }}</span>
                    </div>
                    <p class="text-gray-300 text-sm leading-relaxed group-hover:text-white transition-colors duration-300">{{ comment.message }}</p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Add Comment Form -->
            <form @submit.prevent="handleAddComment" class="mt-6 space-y-4">
              <input 
                v-model="newCommentName"
                type="text" 
                placeholder="Nama Anda"
                required
                class="w-full px-4 py-3 rounded-xl bg-slate-700/50 border border-slate-600/50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <textarea
                v-model="newCommentMessage"
                rows="3"
                placeholder="Tulis komentar Anda..."
                required
                class="w-full px-4 py-3 rounded-xl bg-slate-700/50 border border-slate-600/50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
              ></textarea>
              <button
                type="submit"
                class="w-full bg-gradient-to-r from-green-600 to-teal-600 text-white font-semibold py-3 rounded-xl hover:from-green-700 hover:to-teal-700 transition-all duration-300"
              >
                Kirim Komentar
              </button>
            </form>
          </div>
        </div>
      </div>

      <!-- Connect With Me pindah ke bawah -->
      <div 
        class="mt-12 max-w-3xl mx-auto"
        data-aos="fade-up"
        data-aos-delay="600"
      >
        <div class="bg-slate-800/50 backdrop-blur-lg rounded-2xl p-8 border border-slate-700/50 shadow-2xl hover:shadow-purple-500/10 transition-all duration-500">
          <div class="flex items-center space-x-3 mb-6">
            <div class="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
              <span class="text-white text-sm font-bold">🔗</span>
            </div>
            <h3 class="text-xl font-bold text-white">Connect With Me</h3>
          </div>
          <!-- Let's Connect Button -->
          <div class="mb-8">
            <button class="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-4 px-6 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg hover:shadow-blue-500/25 group">
              <span class="flex items-center justify-center">
                <LinkIcon class="mr-2 h-5 w-5 group-hover:rotate-12 transition-transform duration-300" />
                Let's Connect
              </span>
            </button>
          </div>
          <!-- Social Links -->
          <div class="grid grid-cols-2 gap-4">
            <a
              v-for="social in socialLinks"
              :key="social.name"
              :href="social.href"
              target="_blank"
              rel="noopener noreferrer"
              class="group bg-slate-700/50 hover:bg-gradient-to-r border border-slate-600/50 hover:border-transparent rounded-xl p-4 transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
              :class="social.hoverClass"
            >
              <div class="flex items-center space-x-3">
                <div :class="social.iconBg" class="w-10 h-10 rounded-lg flex items-center justify-center group-hover:bg-white/20 transition-all duration-300">
                  <img :src="social.icon" class="h-6 w-6" alt="" />
                </div>
                <div>
                  <h4 class="text-white font-semibold text-sm">{{ social.name }}</h4>
                  <p class="text-gray-400 text-xs group-hover:text-white/80 transition-colors duration-300">{{ social.handle }}</p>
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { ref } from 'vue'
import { 
  EnvelopeIcon,
  ChatBubbleLeftIcon,
  ChatBubbleLeftRightIcon,
  UserIcon,
  CheckIcon,
  CheckCircleIcon,
  LinkIcon
} from '@heroicons/vue/24/outline'

import instagramIcon from '@/assets/instagram.svg'
import whatsappIcon from '@/assets/whatsapp.svg'
import gmailIcon from '@/assets/gmail.svg'
import githubIcon from '@/assets/github.svg'
import tiktokIcon from '@/assets/tiktok.svg'

export default {
  name: 'ModernContact',
  components: {
    EnvelopeIcon,
    ChatBubbleLeftIcon,
    ChatBubbleLeftRightIcon,
    UserIcon,
    CheckIcon,
    CheckCircleIcon,
    LinkIcon
  },
  setup() {
    const form = ref({
      name: '',
      email: '',
      message: ''
    })

    const isSubmitting = ref(false)
    const showSuccess = ref(false)

    const socialLinks = [
      {
        name: 'Instagram',
        handle: '@urpartner.id',
        href: 'https://www.instagram.com/urpartnerid/',
        icon: instagramIcon,
        iconBg: 'bg-pink-600',
        hoverClass: 'hover:from-pink-600 hover:to-red-600'
      },
      {
        name: 'WhatsApp',
        handle: '+62 UrPartnerID',
        href: 'https://wa.me/6285161346599',
        icon: whatsappIcon,
        iconBg: 'bg-green-600',
        hoverClass: 'hover:from-green-600 hover:to-green-700'
      },
      {
        name: 'Email',
        handle: 'support@urpartnerid.com',
        href: 'mailto:support@urpartnerid.com',
        icon: gmailIcon,
        iconBg: 'bg-red-500',
        hoverClass: 'hover:from-red-500 hover:to-red-700'
      },
      {
        name: 'GitHub',
        handle: '',
        href: 'https://github.com/your-username',
        icon: githubIcon,
        iconBg: 'bg-gray-800',
        hoverClass: 'hover:from-gray-700 hover:to-gray-900'
      },
      {
        name: 'TikTok',
        handle: '@urpartnerid',
        href: 'https://tiktok.com/@urpartnerid',
        icon: tiktokIcon,
        iconBg: 'bg-grey',
        hoverClass: 'hover:from-gray-900 hover:to-black'
      }
    ]

    const comments = ref([
      
    ])

    // New comment inputs
    const newCommentName = ref('')
    const newCommentMessage = ref('')

    // Submit contact form
    const handleSubmit = async () => {
      isSubmitting.value = true
      try {
        await new Promise(resolve => setTimeout(resolve, 2000))
        form.value = { name: '', email: '', message: '' }
        showSuccess.value = true
        setTimeout(() => { showSuccess.value = false }, 5000)
      } catch (error) {
        console.error(error)
      } finally {
        isSubmitting.value = false
      }
    }

    // Submit new comment
    const handleAddComment = () => {
      if (!newCommentName.value.trim() || !newCommentMessage.value.trim()) return;

      const today = new Date()
      const options = { year: 'numeric', month: 'short', day: 'numeric' }
      const formattedDate = today.toLocaleDateString('en-US', options)

      comments.value.unshift({
        name: newCommentName.value.trim(),
        message: newCommentMessage.value.trim(),
        date: formattedDate
      })

      newCommentName.value = ''
      newCommentMessage.value = ''
    }

    return {
      form,
      isSubmitting,
      showSuccess,
      socialLinks,
      comments,
      newCommentName,
      newCommentMessage,
      handleSubmit,
      handleAddComment
    }
  }
}
</script>

<style scoped>
.custom-scrollbar {
  scrollbar-width: thin;
  scrollbar-color: #7c3aed #2d2d37;
}
.custom-scrollbar::-webkit-scrollbar {
  width: 8px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: #2d2d37;
  border-radius: 10px;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background-color: #7c3aed;
  border-radius: 10px;
  border: 2px solid #2d2d37;
}
@keyframes fadeIn {
  from {opacity: 0;}
  to {opacity: 1;}
}
.animate-fadeIn {
  animation: fadeIn 0.5s ease forwards;
}
</style>