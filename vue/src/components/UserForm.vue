<script setup>
import '../assets/scss/components/userForm.scss'
import { inject, ref, watch, computed, watchEffect } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import useVuelidate from '@vuelidate/core'
import { required, email, numeric, minLength } from '@vuelidate/validators'
import { useUserStore } from '@/stores/user'

const toast = inject('toast')
const route = useRoute()
const router = useRouter()
const userActions = useUserStore()

const userId = ref(route.params.id)

const formData = ref({
  name: '',
  email: '',
  phone_no: '',
  address: '',
  age: '',
  gender: '',
  dob: '',
})
watch(
  () => route.params.id,
  (newId) => {
    userId.value = newId
    console.log('Updated userId:', newId)
  },
  { immediate: true },
)
watch(
  () => [userActions.isEditMode, userId.value],
  async ([isEditMode, currentUserId]) => {
    if (isEditMode && currentUserId) {
      try {
        const userData = await userActions.getUserById(currentUserId)
        formData.value = { ...userData.data }
      } catch (e) {
        console.log('error')
      }
    } else {
      formData.value = {
        name: '',
        email: '',
        phone_no: '',
        address: '',
        age: '',
        gender: '',
        dob: '',
      }
    }
  },
  { immediate: true },
)
const birthDate = computed({
  get() {
    return formData.value.dob ? formData.value.dob.split('T')[0] : ''
  },
  set(value) {
    console.log(value)
    formData.value.dob = value
  },
})

const validationRules = computed(() => {
  return {
    name: { required },
    email: { required, email },
    phone_no: { required, numeric, minLength: minLength(10) },
    address: { required },
    age: { required, numeric, minLength: minLength(2) },
    gender: { required },
    dob: { required },
  }
})

const v$ = useVuelidate(validationRules, formData)

const submitForm = async () => {
  const result = await v$.value.$validate()
  if (result) {
    try {
      const UserData = {
        name: formData.value.name,
        email: formData.value.email,
        phone_no: formData.value.phone_no,
        address: formData.value.address,
        age: formData.value.age,
        gender: formData.value.gender,
        dob: formData.value.dob,
      }
      if (userActions.isEditMode) {
        const resp = await userActions.updateUser(UserData, userId.value)
        console.log(resp)
        toast.value.showToast('User updated Successfully', 'success')
        userActions.disableEdit()
        userActions.getUsers()
      } else {
        const resp = await userActions.addUser(UserData)
        if (resp.status) {
          userActions.recentUser({
            name: resp.data.name,
            email: resp.data.email,
            phone_no: resp.data.phone_no,
            address: resp.data.address,
            age: resp.data.age,
            gender: resp.data.gender,
            dob: resp.data.dob,
          })
          toast.value.showToast('User added Successfully', 'success')
          userActions.showForm()
          formData.value.name = ''
          formData.value.email = ''
          formData.value.phone = ''
          formData.value.address = ''
          formData.value.age = ''
          formData.value.gender = ''
          formData.value.dob = ''
        } else {
          toast.value.showToast('User not added!', 'error')
        }
      }
      // router.push('/user')
    } catch (e) {
      toast.value.showToast('Form not submitted', 'error')
    }
  } else {
    toast.value.showToast('Form Fields are empty!', 'error')
  }
}
const resetForm = () => {
  toast.value.showToast('User Not Updated!', 'info')
  userActions.disableEdit()
  formData.value = {
    name: '',
    email: '',
    phone_no: '',
    address: '',
    age: '',
    gender: '',
    dob: '',
  }
  router.push('/user')
}
</script>
<template>
  <div class="user-form">
    <h1>User Details</h1>
    <form @submit.prevent="submitForm">
      <div class="form-group">
        <label for="name">Name:</label>
        <input type="text" id="name" v-model="formData.name" placeholder="Enter your name" />
        <span v-for="error in v$.name.$errors" :key="error.$uid">{{ error.$message }}</span>
      </div>
      <div class="form-group">
        <label for="email">Email:</label>
        <input type="email" id="email" v-model="formData.email" placeholder="Enter your email" />
        <span v-for="error in v$.email.$errors" :key="error.$uid">{{ error.$message }}</span>
      </div>
      <div class="form-group">
        <label for="phone">Phone Number:</label>
        <input
          type="tel"
          id="phone"
          v-model="formData.phone_no"
          placeholder="Enter your phone number"
        />
        <span v-for="error in v$.phone_no.$errors" :key="error.$uid">{{ error.$message }}</span>
      </div>

      <div class="form-group">
        <label for="age">Age:</label>
        <input type="number" id="age" v-model="formData.age" placeholder="Enter your age" />
        <span v-for="error in v$.age.$errors" :key="error.$uid">{{ error.$message }}</span>
      </div>
      <div class="form-group">
        <label for="gender">Gender:</label>
        <select id="gender" v-model="formData.gender">
          <option value="">Select your gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
        <span v-for="error in v$.gender.$errors" :key="error.$uid">{{ error.$message }}</span>
      </div>
      <div class="form-group">
        <label for="dob">Date of Birth:</label>
        <input type="date" id="dob" v-model="birthDate" />
        <span v-for="error in v$.dob.$errors" :key="error.$uid">{{ error.$message }}</span>
      </div>
      <div class="form-group">
        <label for="address">Address:</label>
        <textarea
          id="address"
          v-model="formData.address"
          placeholder="Enter your address"
        ></textarea>
        <span v-for="error in v$.address.$errors" :key="error.$uid">{{ error.$message }}</span>
      </div>
      <button type="submit">{{ userActions.isEditMode ? 'Update' : 'Submit' }}</button>
      <button type="button" v-if="userActions.isEditMode" @click="resetForm">Cancel</button>
    </form>
  </div>
</template>
