<script setup>
import { getApi, postApi } from '@/services/api'
import '../assets/scss/components/userForm.scss'
import { ref, watch, computed } from 'vue'
import { useEditStore } from '@/stores/user'
const formData = ref({
  name: '',
  email: '',
  phone_no: '',
  address: '',
  age: '',
  gender: '',
  dob: '',
})

const editUser = useEditStore()
const userId = editUser.userId

watch(
  () => editUser.isEditing,
  async (newValue) => {
    if (newValue) {
      try {
        const userData = await getApi(`/user/${userId}`)
        formData.value = { ...userData.data }
        console.log(formData)
      } catch (e) {
        console.log(`${userData.message}`)
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

const submitForm = async () => {
  if (
    formData.value.name.trim() !== '' &&
    formData.value.email.trim() !== '' &&
    formData.value.address.trim() !== '' &&
    formData.value.gender.trim() !== '' &&
    formData.value.dob.trim() !== ''
  ) {
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
      console.log(UserData)
      if (editUser.isEditing) {
        let resp = await postApi(`/user/update/${userId}`, UserData)
        console.log(resp)
        formData.value.gender = resp.gender
        editUser.disableEdit()
        alert(`${resp.message}`)
        editUser.fetchUsers()
      } else {
        const resp = await postApi('/user/add', UserData)
        console.log(resp)
        editUser.addUser({
          name: resp.data.name,
          email: resp.data.email,
          phone_no: resp.data.phone_no,
          address: resp.data.address,
          age: resp.data.age,
          gender: resp.data.gender,
          dob: resp.data.dob,
        })
        if (resp.status) {
          alert(`Thank You, ${formData.value.name}!`)
          formData.value.name = ''
          formData.value.email = ''
          formData.value.phone = ''
          formData.value.address = ''
          formData.value.age = ''
          formData.value.gender = ''
          formData.value.dob = ''
          editUser.showForm()
        } else {
          alert(`${resp.message}`)
          console.log(editUser.isShown)
        }
      }
    } catch (e) {
      console.log('Form not submitted', e)
    }
  } else {
    alert(`Enter your details!`)
  }
}
const resetForm = () => {
  editUser.disableEdit()
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
</script>
<template>
  <div class="user-form">
    <h1>User Details</h1>
    <form @submit.prevent="submitForm">
      <div class="form-group">
        <label for="name">Name:</label>
        <input type="text" id="name" v-model="formData.name" placeholder="Enter your name" />
      </div>
      <div class="form-group">
        <label for="email">Email:</label>
        <input type="email" id="email" v-model="formData.email" placeholder="Enter your email" />
      </div>
      <div class="form-group">
        <label for="phone">Phone Number:</label>
        <input
          type="tel"
          id="phone"
          v-model="formData.phone_no"
          placeholder="Enter your phone number"
        />
      </div>
      <div class="form-group">
        <label for="address">Address:</label>
        <textarea
          id="address"
          v-model="formData.address"
          placeholder="Enter your address"
        ></textarea>
      </div>
      <div class="form-group">
        <label for="age">Age:</label>
        <input type="number" id="age" v-model="formData.age" placeholder="Enter your age" />
      </div>
      <div class="form-group">
        <label for="gender">Gender:</label>
        <select id="gender" v-model="formData.gender">
          <option value="">Select your gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
      </div>
      <div class="form-group">
        <label for="dob">Date of Birth:</label>
        <input type="date" id="dob" v-model="birthDate" />
      </div>
      <button type="submit">{{ editUser.isEditing ? 'Update' : 'Submit' }}</button>
      <button type="button" v-if="editUser.isEditing" @click="resetForm">Cancel</button>
    </form>
  </div>
</template>
