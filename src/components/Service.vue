<template>
  <section class="min-h-screen py-20 px-4 relative"
  id="services">
    <!-- Konten section tanpa background -->

    <div class="container mx-auto max-w-6xl relative z-10">
      <!-- Header -->
      <div class="text-center mb-16">
        <h2 class="text-5xl lg:text-6xl font-bold text-white mb-6 bg-gradient-to-r from-purple-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
          Layanan Utama
        </h2>
        <p class="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
          Solusi teknologi terdepan untuk mengembangkan bisnis Anda dengan layanan profesional dan inovatif
        </p>
      </div>

      <!-- Services Grid -->
      <div class="grid lg:grid-cols-2 gap-8 mb-16">
        <div 
          v-for="service in services"
          :key="service.id"
          class="bg-slate-800/50 backdrop-blur-lg rounded-2xl border border-slate-700/50 shadow-2xl hover:shadow-purple-500/20 transition-all duration-500 overflow-hidden"
        >
          <!-- Service Header -->
          <div 
            class="p-6 cursor-pointer"
            @click="toggleService(service.id)"
          >
            <div class="flex items-center justify-between mb-4">
              <div class="flex items-center space-x-4">
                <div :class="`w-16 h-16 bg-gradient-to-r ${service.color} rounded-xl flex items-center justify-center text-white shadow-lg`">
                  <component :is="service.icon" class="h-8 w-8" />
                </div>
                <div>
                  <h3 class="text-2xl font-bold text-white">{{ service.title }}</h3>
                  <p class="text-gray-400 mt-1">{{ service.description }}</p>
                </div>
              </div>
              <div class="text-white">
                <ChevronUpIcon v-if="expandedService === service.id" class="h-6 w-6" />
                <ChevronDownIcon v-else class="h-6 w-6" />
              </div>
            </div>
          </div>

          <!-- Expanded Content -->
          <div :class="`transition-all duration-500 overflow-hidden ${
            expandedService === service.id ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          }`">
            <div class="px-6 pb-6">
              <ul class="space-y-3">
                <li 
                  v-for="(item, index) in service.items" 
                  :key="index" 
                  class="flex items-start space-x-3 text-gray-300"
                >
                  <div :class="`w-2 h-2 bg-gradient-to-r ${service.color} rounded-full mt-2 flex-shrink-0`"></div>
                  <span class="leading-relaxed">{{ item }}</span>
                </li>
              </ul>

              <!-- Team Roles for Collaboration Service -->
              <div v-if="service.id === 4" class="mt-6 pt-6 border-t border-slate-600/50">
                <h4 class="text-lg font-semibold text-white mb-4">Posisi Tersedia:</h4>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div 
                    v-for="(team, index) in teamRoles" 
                    :key="index" 
                    class="flex items-center space-x-3 bg-slate-700/30 rounded-lg p-3 hover:bg-slate-700/50 transition-colors duration-300"
                  >
                    <div class="text-orange-400">
                      <component :is="team.icon" class="h-5 w-5" />
                    </div>
                    <span class="text-gray-300 text-sm">{{ team.role }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- CTA Section -->
      <div class="text-center">
        <div class="bg-slate-800/30 backdrop-blur-lg rounded-2xl p-8 border border-slate-700/30 max-w-4xl mx-auto hover:bg-slate-800/50 transition-all duration-500 hover:shadow-xl hover:shadow-purple-500/10">
          <h3 class="text-3xl font-bold text-white mb-4">Siap Memulai Proyek Anda?</h3>
          <p class="text-gray-300 mb-8 text-lg">
            Konsultasikan kebutuhan teknologi bisnis Anda dengan tim ahli kami
          </p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <button class="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25">
              Konsultasi Gratis
            </button>
            <button class="bg-slate-700 hover:bg-slate-600 border border-slate-600 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-slate-500/25">
              Lihat Portfolio
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { ref } from 'vue'
import { 
  GlobeAltIcon, 
  ChatBubbleBottomCenterTextIcon, 
  WrenchScrewdriverIcon, 
  UserGroupIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  CodeBracketIcon,
  CircleStackIcon,
  PaintBrushIcon,
  ChartBarIcon,
  BeakerIcon,
  DocumentMagnifyingGlassIcon,
  ShieldCheckIcon,
  DevicePhoneMobileIcon
} from '@heroicons/vue/24/outline'

export default {
  name: 'ServicesSection',
  components: {
    GlobeAltIcon,
    ChatBubbleBottomCenterTextIcon,
    WrenchScrewdriverIcon,
    UserGroupIcon,
    ChevronDownIcon,
    ChevronUpIcon,
    CodeBracketIcon,
    CircleStackIcon,
    PaintBrushIcon,
    ChartBarIcon,
    BeakerIcon,
    DocumentMagnifyingGlassIcon,
    ShieldCheckIcon,
    DevicePhoneMobileIcon
  },
  setup() {
    const expandedService = ref(null)

    const services = [
      {
        id: 1,
        title: "Website Development",
        icon: "GlobeAltIcon",
        description: "Solusi website profesional untuk kebutuhan bisnis Anda",
        color: "from-blue-500 to-cyan-500",
        items: [
          "Pembuatan website statis dan dinamis sesuai kebutuhan bisnis",
          "Integrasi database yang terstruktur untuk manajemen data usaha UMKM, seperti pencatatan pelanggan, produk, stok, dan transaksi",
          "Optimasi SEO dasar agar website mudah ditemukan di mesin pencari"
        ]
      },
      {
        id: 2,
        title: "AI Assistant",
        icon: "ChatBubbleBottomCenterTextIcon",
        description: "Chatbot cerdas untuk meningkatkan customer service",
        color: "from-purple-500 to-pink-500",
        items: [
          "Chatbot berbasis knowledge base perusahaan",
          "Integrasi chatbot ke berbagai platform seperti website, Telegram, WhatsApp, Instagram dan lainnya"
        ]
      },
      {
        id: 3,
        title: "Maintenance & Support",
        icon: "WrenchScrewdriverIcon",
        description: "Dukungan teknis berkelanjutan untuk sistem Anda",
        color: "from-green-500 to-emerald-500",
        items: [
          "Perbaikan bug dan troubleshooting",
          "Pembaruan konten & fitur baru secara berkala"
        ]
      },
      {
        id: 4,
        title: "Kolaborasi Proyek",
        icon: "UserGroupIcon",
        description: "Tim profesional untuk mendukung proyek Anda",
        color: "from-orange-500 to-red-500",
        items: [
          "Penyediaan tenaga ahli profesional sesuai kebutuhan klien"
        ]
      }
    ]

    const teamRoles = [
      { role: "Chief Technology Officer (CTO)", icon: "CodeBracketIcon" },
      { role: "Frontend Developer", icon: "PaintBrushIcon" },
      { role: "Backend Developer", icon: "CircleStackIcon" },
      { role: "UI/UX Designer", icon: "DevicePhoneMobileIcon" },
      { role: "Data Engineer", icon: "CircleStackIcon" },
      { role: "Data Analyst", icon: "ChartBarIcon" },
      { role: "Data Scientist", icon: "BeakerIcon" },
      { role: "Business Analyst", icon: "DocumentMagnifyingGlassIcon" },
      { role: "Quality Assurance (QA)", icon: "ShieldCheckIcon" }
    ]

    const toggleService = (serviceId) => {
      expandedService.value = expandedService.value === serviceId ? null : serviceId
    }

    return {
      expandedService,
      services,
      teamRoles,
      toggleService
    }
  }
}
</script>

<style scoped>
/* Custom animations jika diperlukan */
.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: .5;
  }
}

.delay-1000 {
  animation-delay: 1s;
}
</style>