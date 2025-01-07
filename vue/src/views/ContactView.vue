<script setup>
import { postApi } from '@/services/api'
import { ref } from 'vue'

const formData = ref({
  name: '',
  email: '',
  message: '',
})

const submitForm = async () => {
  if (
    formData.value.name.trim() !== '' &&
    formData.value.email.trim() !== '' &&
    formData.value.message.trim() !== ''
  ) {
    const feedback = {
      name: formData.value.name,
      email: formData.value.email,
      message: formData.value.message,
    }
    try {
      const resp = await postApi('/contact', feedback)
      if (resp.status) {
        alert(`Thank You, ${formData.value.name}!`)
        formData.value.email = ''
        formData.value.name = ''
        formData.value.message = ''
      } else alert(`${resp.message}`)
    } catch (e) {
      console.log(e)
      alert(`${resp.message}`)
    }
  } else {
    alert(`Enter your feedback!`)
  }
}
</script>

<template>
  <div class="contact_page">
    <h1>Contact Us</h1>
    <form @submit.prevent="submitForm()">
      <div class="form_group">
        <label for="name">Name:</label>
        <input type="text" id="name" v-model="formData.name" placeholder="Enter your name" />
      </div>
      <div class="form_group">
        <label for="email">Email:</label>
        <input type="email" id="email" v-model="formData.email" placeholder="Enter your email" />
      </div>
      <div class="form_group">
        <label for="message">Message:</label>
        <textarea id="message" v-model="formData.message" placeholder="Your message"></textarea>
      </div>
      <button type="submit">Send Message</button>
    </form>
  </div>
</template>
<style scoped lang="scss">
.contact_page {
  padding: 20px;
  max-width: 600px;
  margin: 0 auto;

  h1 {
    text-align: center;
    font-size: 2.5rem;
    margin-bottom: 20px;
    color: #007bff;
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 15px;

    .form_group {
      display: flex;
      flex-direction: column;

      label {
        font-size: 1rem;
        margin-bottom: 5px;
        color: #333;
      }

      input,
      textarea {
        padding: 10px;
        font-size: 1rem;
        border: 1px solid #ccc;
        border-radius: 5px;
      }

      textarea {
        resize: none;
        height: 100px;
      }
    }

    button {
      padding: 10px 20px;
      font-size: 1rem;
      font-weight: bold;
      color: #fff;
      background-color: #007bff;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      transition: background-color 0.3s;

      &:hover {
        background-color: #0056b3;
      }
    }
  }
}
</style>
