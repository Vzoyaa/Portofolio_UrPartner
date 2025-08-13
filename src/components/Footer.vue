<template>
  <footer class="bg-gray-900 text-white border-t border-b border-gray-700 w-full">
    <div class="container-custom">
      <div class="py-6 flex flex-col md:flex-row justify-between items-center">
        <p class="text-gray-400 text-center w-full">
          &copy; {{ currentYear }} UrPartnerID. All rights reserved.
        </p>
      </div>
    </div>
  </footer>
</template>

<script>
import { computed } from 'vue'

export default {
  name: 'Footer',
  setup() {
    const currentYear = computed(() => new Date().getFullYear())
    return { currentYear }
  }
}
</script>

<style scoped>
.container-custom {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}
</style>