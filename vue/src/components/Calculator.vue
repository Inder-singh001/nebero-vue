<script setup>
import { ref } from 'vue'
import '@/assets/scss/components/calculator.scss'
const currentInput = ref('') // Stores the current input
const result = ref(null) // Stores the result

// Function to append numbers/operators to the current input
const appendValue = (value) => {
  currentInput.value += value
}

// Function to calculate the result
const calculateResult = () => {
  try {
    result.value = eval(currentInput.value) // Use eval carefully; sanitize inputs in real applications
  } catch (error) {
    result.value = 'Error'
  }
}

// Function to clear the input and result
const clearAll = () => {
  currentInput.value = ''
  result.value = null
}
</script>

<template>
  <div class="calculator">
    <div class="calculator-display">
      <div class="current-input">{{ currentInput || '0' }}</div>
      <div class="result" v-if="result !== null">= {{ result }}</div>
    </div>
    <div class="calculator-buttons">
      <button v-for="button in ['7', '8', '9', '/']" :key="button" @click="appendValue(button)">
        {{ button }}
      </button>
      <button v-for="button in ['4', '5', '6', '*']" :key="button" @click="appendValue(button)">
        {{ button }}
      </button>
      <button v-for="button in ['1', '2', '3', '-']" :key="button" @click="appendValue(button)">
        {{ button }}
      </button>
      <button v-for="button in ['0', '', '.', '+']" :key="button" @click="appendValue(button)">
        {{ button }}
      </button>
      <button class="clear" @click="clearAll">C</button>
      <button class="equals" @click="calculateResult">=</button>
    </div>
  </div>
</template>
