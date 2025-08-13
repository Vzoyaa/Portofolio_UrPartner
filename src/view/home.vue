<template>
  <div>
    <!-- Hero Section -->
    <Hero />
    
    <!-- About Section -->
    <About />
    
    <!-- Contact Section -->
    <Contact />
    
    <!-- Footer -->
    <Footer />
  </div>
</template>

<script>
import Hero from '../components/Hero.vue'
import About from '../components/About.vue'
import Contact from '../components/Contact.vue'
import Footer from '../components/Footer.vue'

export default {
  name: 'Home',
  components: {
    Hero,
    About,
    Contact,
    Footer
  }
}
</script>

<style scoped>
/* Tidak perlu style khusus untuk halaman home */
</style>