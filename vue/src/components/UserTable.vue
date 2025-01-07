<script setup>
import { getApi, postApi } from '@/services/api'
import { watchEffect, ref } from 'vue'
import { useEditStore } from '@/stores/user'
import '../assets/scss/components/userForm.scss'
import { useRouter } from 'vue-router'

const editUser = useEditStore()
const router = useRouter()

const getUserDetails = async () => {
  try {
    editUser.fetchUsers()
  } catch (e) {
    console.log('Error fetching data!')
  }
}
const updateUser = async (index) => {
  editUser.enableEdit(index)
  router.push('/user')
  console.log(editUser)
}
const deleteUser = async (index) => {
  let getUser = await postApi(`/user/delete/${index}`)
  console.log(getUser)
  getUserDetails()
}
// const splitDob = computed((dob) => {
//   console.log(dob)
//   let date = data.value.dob.split('T')[0]
//   return date
// })
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
        <tr v-for="(user, index) in editUser.users" :key="user._id">
          <td>{{ index }}</td>
          <td>{{ user.name }}</td>
          <td>{{ user.email }}</td>
          <td>{{ user.phone_no }}</td>
          <td>{{ user.address }}</td>
          <td>{{ user.age }}</td>
          <td>{{ user.gender }}</td>
          <td>{{ user.dob }}</td>
          <td>
            <button @click="updateUser(user._id)">Edit</button>
            <button @click="deleteUser(user._id)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
