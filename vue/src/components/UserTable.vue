<script setup>
import { watchEffect, inject } from 'vue'
import '../assets/scss/components/userForm.scss'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'

const toast = inject('toast')
const router = useRouter()
const userActions = useUserStore()

const updateUser = async (index) => {
  userActions.enableEdit()
  if (userActions.isEditMode) {
    router.push(`/user/${index}`)
    toast.value.showToast('User Edit Mode', 'info')
  } else {
    console.log('Something went Wrong')
    toast.value.showToast('Something went Wrong', 'error')
  }
}
const getUserDetails = async () => {
  try {
    userActions.getUsers()
  } catch (e) {
    console.log('Error fetching data!', e)
  }
}
const deleteUser = async (index) => {
  try {
    let user = await userActions.deleteUser(index)
    await userActions.getUsers()
    if (user) {
      toast.value.showToast('User Deleted Successfully', 'success')
    } else {
      console.log('Not deleted', e)
      toast.value.showToast('User not deleted!', 'error')
    }
  } catch (e) {
    console.log('Something went wrong', e)
  }
}

watchEffect(() => {
  getUserDetails()
})
</script>
<template>
  <div class="user-form user-table">
    <h2>Submitted User Details</h2>
    <table>
      <thead>
        <tr>
          <th>Id</th>
          <th>Name</th>
          <th>Email</th>
          <th>Phone</th>
          <th>Address</th>
          <th>Age</th>
          <th>Gender</th>
          <th>Date of Birth</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(user, index) in userActions.user" :key="user._id">
          <td>{{ index }}</td>
          <td>{{ user.name }}</td>
          <td>{{ user.email }}</td>
          <td>{{ user.phone_no }}</td>
          <td>{{ user.address }}</td>
          <td>{{ user.age }}</td>
          <td>{{ user.gender }}</td>
          <td>{{ user.dob ? user.dob.split('T')[0] : '' }}</td>
          <td>
            <button @click="updateUser(user._id)">Edit</button>
            <button @click="deleteUser(user._id)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
