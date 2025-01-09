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

// State variables
const visible = ref(false)
const message = ref('')
const type = ref('info') // Default type: 'info', can also be 'success' or 'error'
const position = ref({
  bottom: 20,
  right: 20,
}) // Default bottom-right position
let timer = null

// Function to show the toast
const showToast = (
  msg,
  toastType = 'info',
  toastPosition = { bottom: 20, right: 20 },
  duration = 3000,
) => {
  message.value = msg
  type.value = toastType
  position.value = toastPosition
  visible.value = true

  if (timer) clearTimeout(timer) // Clear any existing timers

  // Auto-hide toast after the specified duration
  timer = setTimeout(() => {
    visible.value = false
  }, duration)
}

// Function to close the toast manually
const close = () => {
  visible.value = false
  if (timer) clearTimeout(timer)
}

// Expose `showToast` for external usage
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
  font-size: 14px;
  animation: fadeIn 0.3s ease;
}

.toast.success {
  background-color: #4caf50; /* Green for success */
}

.toast.error {
  background-color: #f44336; /* Red for error */
}

.toast.info {
  background-color: #2196f3; /* Blue for info */
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

/* Fade-in animation for the toast */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
