<script setup>
import { useRouter } from 'vue-router'
import '../assets/scss/components/card.scss'
import { defineProps } from 'vue'

defineProps({
  listData: Array,
})

// console.log(listData)
const router = useRouter()

const navigate = (link) => {
  // console.log(link)
  if (link) {
    router.push(link)
  } else {
    alert('In Development')
  }
}
</script>
<template>
  <div class="card" v-for="(items, index) in listData" :key="index">
    <div class="card-image">
      <img :src="items.image" alt="Image" />
    </div>
    <div class="card-data">
      <div class="card-head">{{ items.title }}</div>
      <div class="card-body">{{ items.body }}</div>
      <div class="card-button">
        <button @click="navigate(items.link)">Show</button>
      </div>
    </div>
  </div>
</template>
