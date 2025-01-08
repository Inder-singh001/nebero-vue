<template>
  <div
    v-if="visible"
    :class="['toast', type]"
    :style="{
      bottom: `${position.bottom}px`,
      right: `${position.right}px`,
    }"
  >
    <span>{{ message }}</span>
    <button @click="close">X</button>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const visible = ref(false)
const message = ref('')
const type = ref('') // 'success' | 'error' | 'info'
const position = ref({
  bottom: 20,
  right: 20, // Default position for bottom-right
})
let timer = null

const showToast = (
  { msg },
  toastType = type,
  toastPosition = { bottom: 20, right: 20 },
  duration = 3000,
) => {
  message.value = String(msg)
  type.value = toastType
  position.value = toastPosition
  visible.value = true

  if (timer) clearTimeout(timer)

  timer = setTimeout(() => {
    visible.value = false
  }, duration)
}

const close = () => {
  visible.value = false
  if (timer) clearTimeout(timer)
}

defineExpose({
  showToast,
})
</script>

<style>
.toast {
  position: fixed;
  background-color: #333;
  color: #fff;
  padding: 10px 20px;
  border-radius: 4px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 1000;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
}

.toast.success {
  background-color: #4caf50;
}

.toast.error {
  background-color: #f44336;
}

.toast.info {
  background-color: #2196f3;
}

.toast button {
  background: none;
  border: none;
  color: #fff;
  font-size: 16px;
  cursor: pointer;
}

.toast button:hover {
  color: #ddd;
}
</style>
