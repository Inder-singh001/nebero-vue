<script setup>
import { useRouter } from 'vue-router'
import '../assets/scss/components/hero.scss'

const router = useRouter()
const goToList = () => {
  router.push('./list')
}
</script>
<template>
  <div class="hero_section">
    <h2>Welcome to Your Vue Playground</h2>
    <p>
      Discover, learn, and build with these mini-projects designed for developers of all levels.
    </p>
    <button @click="goToList">Get Started</button>
  </div>
</template>
