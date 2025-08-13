<template>
  <div id="app">
    <Navbarv />
    <ChatBot />
    <router-view />
  </div>
</template>

<script>
import Navbarv from './components/Navbarv.vue'
import ChatBot from './components/ChatBot.vue'
export default {
  name: 'App',
  components: {
    Navbarv,
    ChatBot
  }
}
</script>

<style>
/* Global styles */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Arial', sans-serif;
  line-height: 1.6;
  color: #333;
}

#app {
  min-height: 100vh;
}
</style>