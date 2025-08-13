<template>
  <div class="fixed bottom-4 right-4 z-50"
  id="chatbot">
    <!-- Tombol Floating -->
    <button
  @click="toggleChat"
  class="bg-white hover:bg-gray-100 p-2 rounded-full shadow-lg transition-all duration-300 flex items-center justify-center"
>
  <img src="@/assets/logo.png" alt="Chat Icon" class="w-5 h-5" />
</button>


    <!-- Window Chat -->
    <div
      v-show="isOpen"
      class="w-80 h-96 bg-white shadow-xl rounded-lg overflow-hidden flex flex-col mt-3 border border-gray-200 animate-fade-in"
    >
      <!-- Header -->
      <div class="bg-blue-600 text-white px-4 py-3 flex justify-between items-center">
        <h2 class="font-semibold">Chatbot</h2>
        <button @click="toggleChat" class="hover:text-gray-200">✖</button>
      </div>

      <!-- Body Chat -->
      <div class="flex-1 p-3 overflow-y-auto bg-gray-50">
        <div v-for="(msg, index) in messages" :key="index" class="mb-3">
          <div
            :class="msg.sender === 'user' ? 'text-right' : 'text-left'"
          >
            <span
              :class="msg.sender === 'user'
                ? 'inline-block bg-blue-500 text-white px-3 py-2 rounded-lg'
                : 'inline-block bg-gray-200 text-gray-800 px-3 py-2 rounded-lg'"
            >
              {{ msg.text }}
            </span>
          </div>
        </div>
      </div>

      <!-- Input Chat -->
      <form @submit.prevent="sendMessage" class="p-3 border-t border-gray-200 flex gap-2">
        <input
          v-model="newMessage"
          type="text"
          placeholder="Tulis pesan..."
          class="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
        >
          ➤
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const isOpen = ref(false);
const newMessage = ref("");
const messages = ref([
  { sender: "bot", text: "Halo! Ada yang bisa saya bantu?" },
]);

const toggleChat = () => {
  isOpen.value = !isOpen.value;
};

const sendMessage = () => {
  if (!newMessage.value.trim()) return;

  // Tambah pesan user
  messages.value.push({ sender: "user", text: newMessage.value });

  // Simulasi balasan bot
  setTimeout(() => {
    messages.value.push({ sender: "bot", text: "Oke, saya mengerti 👍" });
  }, 800);

  newMessage.value = "";
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
</style>
