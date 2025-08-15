<template>
  <div class="fixed bottom-6 right-6 z-50" id="chatbot">
    <!-- Tombol Floating dengan Label -->
    <div
      @click="toggleChat"
      class="cursor-pointer transition-all duration-300 flex items-center space-x-3 animate-bounceY bg-white/10 backdrop-blur-sm rounded-full px-4 py-3 shadow-lg hover:bg-white/20"
      :class="{ 'hidden': isOpen }"
    >
      <!-- Logo Chatbot -->
      <div class="flex-shrink-0">
        <img src="@/assets/logo.png" alt="Chat Icon" class="w-10 h-10" />
      </div>
      
      <!-- Label Text -->
      <div class="flex-shrink-0">
        <span class="text-sm font-medium bg-gradient-to-r from-purple-400 via-blue-500 to-purple-600 bg-clip-text text-transparent animate-gradient-x drop-shadow-lg">Chatbot</span>
      </div>
    </div>

    <!-- Window Chat -->
    <div
      v-show="isOpen"
      class="w-[400px] h-[540px] bg-white shadow-2xl rounded-2xl overflow-hidden flex flex-col mt-3 border border-gray-200 animate-fade-in"
    >
      <!-- Header -->
      <div class="bg-blue-600 text-white px-4 py-3 flex justify-between items-center relative">
        <!-- Logo di kiri header -->
        <img src="@/assets/logo.png" alt="Chat Logo" class="w-7 h-7 mr-2 rounded-full absolute left-3 top-1/2 -translate-y-1/2 shadow" />
        <h2 class="font-semibold mx-auto">Chatbot</h2>
        <button @click="toggleChat" class="hover:text-gray-200 absolute right-4 top-1/2 -translate-y-1/2 text-xl">✖</button>
      </div>

      <!-- Body Chat -->
      <div ref="chatContainer" class="flex-1 p-4 overflow-y-auto bg-gray-50">
        <div v-for="(msg, index) in messages" :key="index" class="mb-3">
          <div :class="msg.sender === 'user' ? 'text-right' : 'text-left'">
            <span
              :class="msg.sender === 'user'
                ? 'inline-block bg-blue-500 text-white px-4 py-2 rounded-lg'
                : 'inline-block bg-gray-200 text-gray-800 px-4 py-2 rounded-lg'"
            >
              {{ msg.text }}
            </span>
          </div>
        </div>

        <!-- Typing Indicator -->
        <div v-if="isTyping" class="mb-3 text-left">
          <span class="inline-block bg-gray-200 text-gray-800 px-4 py-2 rounded-lg">
            <div class="typing-indicator">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </span>
        </div>
      </div>

      <!-- Input Chat -->
      <form @submit.prevent="sendMessage" class="p-4 border-t border-gray-200 flex gap-2">
        <input
          v-model="newMessage"
          type="text"
          placeholder="Tulis pesan..."
          :disabled="isTyping"
          class="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
        />
        <button
          type="submit"
          :disabled="isTyping || !newMessage.trim()"
          class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
        >
          ➤
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, nextTick } from "vue";

const isOpen = ref(false);
const newMessage = ref("");
const isTyping = ref(false);
const chatContainer = ref(null);
const messages = ref([
  { sender: "bot", text: "Halo! Ada yang bisa saya bantu?" },
]);

const toggleChat = () => {
  isOpen.value = !isOpen.value;
};

const scrollToBottom = async () => {
  await nextTick();
  if (chatContainer.value) {
    chatContainer.value.scrollTop = chatContainer.value.scrollHeight;
  }
};

const sendMessage = async () => {
  if (!newMessage.value.trim() || isTyping.value) return;

  // Simpan pesan user di chat window
  messages.value.push({ sender: "user", text: newMessage.value });
  await scrollToBottom();

  const question = newMessage.value;
  newMessage.value = ""; // reset input

  // Show typing indicator
  isTyping.value = true;
  await scrollToBottom();

  try {
    // Kirim POST ke backend chat API
    const res = await fetch('http://192.168.0.102:2500/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ question }),
    });

    const data = await res.json();

    // Simulate minimum typing time (optional - untuk user experience yang lebih baik)
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Hide typing indicator
    isTyping.value = false;

    if (res.ok) {
      messages.value.push({ sender: "bot", text: data.reply });
    } else {
      messages.value.push({ sender: "bot", text: `Error: ${data.error || 'Gagal mendapatkan balasan'}` });
    }
  } catch (error) {
    // Hide typing indicator on error
    isTyping.value = false;
    messages.value.push({ sender: "bot", text: `Error koneksi: ${error.message}` });
  }

  await scrollToBottom();
};
</script>

<style scoped>
@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fade-in 0.3s ease-in-out;
}

@keyframes bounceY {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-12px);
  }
}

.animate-bounceY {
  animation: bounceY 1.2s infinite;
}

/* Typing Indicator Animation */
.typing-indicator {
  display: flex;
  align-items: center;
  gap: 2px;
}

.typing-indicator span {
  height: 6px;
  width: 6px;
  background-color: #6b7280;
  border-radius: 50%;
  display: inline-block;
  animation: typing-dot 1.4s infinite ease-in-out;
}

.typing-indicator span:nth-child(1) {
  animation-delay: -0.32s;
}

.typing-indicator span:nth-child(2) {
  animation-delay: -0.16s;
}

.typing-indicator span:nth-child(3) {
  animation-delay: 0s;
}

@keyframes typing-dot {
  0%, 80%, 100% {
    transform: scale(0);
    opacity: 0.5;
  }
  40% {
    transform: scale(1);
    opacity: 1;
  }
}

/* Gradient Animation */
@keyframes gradient-x {
  0%, 100% {
    background-size: 200% 200%;
    background-position: left center;
  }
  50% {
    background-size: 200% 200%;
    background-position: right center;
  }
}

.animate-gradient-x {
  animation: gradient-x 3s ease infinite;
  background-size: 200% 200%;
}
</style>