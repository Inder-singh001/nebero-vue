<script setup>
import Loginform from '@/components/Loginform.vue'
import UserFormRt from '@/components/UserFormRt.vue'
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const currentView = computed(() => {
  switch (route.path) {
    case '/login':
      return 'login'
    case '/signup':
      return 'signup'
    default:
      return 'notFound'
  }
})
</script>

<template>
  <div>
    <Loginform v-if="currentView === 'login'" />
    <UserFormRt v-else-if="currentView === 'signup'" />
    <div v-else class="not-found">
      <p>Page not found. Please check the URL or navigate back to the homepage.</p>
    </div>
  </div>
</template>
