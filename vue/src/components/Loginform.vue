<script setup>
import { ref, computed, inject } from 'vue'
import useVuelidate from '@vuelidate/core'
import { required, email } from '@vuelidate/validators'
import { useUserStore } from '@/stores/user'
import '@/assets/scss/components/auth.scss'
import { useRouter } from 'vue-router'
const userActions = useUserStore()

const toast = inject('toast')
const router = useRouter()
const loginData = ref({
  email: '',
  password: '',
})

const togglePage = () => {
  router.push('/signup')
}

const validationRules = computed(() => {
  return {
    email: { required, email },
    password: { required },
  }
})
const v$ = useVuelidate(validationRules, loginData)

const handleLogin = async () => {
  const result = await v$.value.$validate()
  if (result) {
    const UserData = {
      email: loginData.value.email,
      password: loginData.value.password,
    }
    console.log(UserData)
    try {
      const resp = await userActions.loginUser(UserData)
      console.log(resp.status)
      if (resp.status) {
        // userActions.Authenticate()
        toast.value.showToast('User Logged-in Successfully', 'success')
        router.push('/')
      } else {
        toast.value.showToast('User Not Logged-in!', 'error')
      }
    } catch (e) {
      toast.value.showToast('Incorrect credentials', 'error')
    }
  } else {
    toast.value.showToast('Enter your credentials!', 'error')
  }
}
</script>

<template>
  <div class="auth-container">
    <div class="form-container">
      <h2>Login</h2>
      <form @submit.prevent="handleLogin">
        <div class="form-group">
          <label for="loginEmail">Email:</label>
          <input type="email" id="loginEmail" v-model="loginData.email" required />
          <span v-for="error in v$.email.$errors" :key="error.$uid">{{ error.$message }}</span>
        </div>
        <div class="form-group">
          <label for="loginPassword">Password:</label>
          <input type="password" id="loginPassword" v-model="loginData.password" required />
          <span v-for="error in v$.password.$errors" :key="error.$uid">{{ error.$message }}</span>
        </div>
        <button type="submit">Login</button>
      </form>
      <p>Don't have an account? <span @click="togglePage">Sign up</span></p>
    </div>
  </div>
</template>
