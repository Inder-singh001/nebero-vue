<script setup>
import ToDo from '@/components/ToDo.vue'
import Notes from '@/components/Notes.vue'
import Calculator from '@/components/Calculator.vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const projectRoute = route.params.project
</script>
<template>
  <div class="view" v-if="projectRoute === 'to-do'">
    <ToDo />
  </div>
  <div class="view" v-else-if="projectRoute === 'notes'">
    <Notes />
  </div>
  <div class="view" v-else-if="projectRoute === 'cal'">
    <Calculator />
  </div>
</template>
