<script setup>
import UserFormRt from '@/components/UserFormRt.vue'
import { useUserStore } from '@/stores/user'
import { useRoute } from 'vue-router'

const userActions = useUserStore()

const route = useRoute()
const id = route.params.id
</script>

<template>
  <UserFormRt v-if="userActions.isEditMode" :id="id" />
  <UserFormRt v-else />
</template>
