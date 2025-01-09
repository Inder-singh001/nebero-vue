<script setup>
import { RouterLink, RouterView } from 'vue-router'
import './assets/scss/main/navbar.scss'
import Toast from '@/components/Toast.vue'
import { ref, provide } from 'vue'

const toast = ref(null)
provide('toast', toast)
</script>

<template>
  <div class="content">
    <div class="body">
      <header class="navbar">
        <h2>Mini Projects</h2>
        <nav>
          <RouterLink to="/" class="nav_link">Home</RouterLink>
          <RouterLink to="/list" class="nav_link">Listing</RouterLink>
          <RouterLink to="/about" class="nav_link">About</RouterLink>
          <RouterLink to="/contact" class="nav_link">Contact Us</RouterLink>
          <RouterLink to="/user" class="nav_link">Users</RouterLink>
        </nav>
      </header>
    </div>
  </div>
  <div class="content view_container">
    <div class="body">
      <RouterView />
    </div>
  </div>
  <Toast ref="toast" />
</template>
<style scoped lang="scss">
.content {
  display: flex;
  justify-content: center;
  padding: 0px 15px;
  background-color: #007bff;
  &.view_container {
    // background: linear-gradient(135deg, #007bff, #0056b3);
    background-color: #fff;
    // padding-top: 24px;
  }
  .body {
    max-width: 1140px;
    width: 100%;
  }
}
</style>
