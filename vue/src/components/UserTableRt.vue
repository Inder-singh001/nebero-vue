<script setup>
import { useUserStore } from '@/stores/userRoute'
import '../assets/scss/components/userForm.scss'
import { watchEffect } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const userActions = useUserStore()
const addUserBtn = () => {
  userActions.disableEdit()
  if (!userActions.isEditMode) {
    router.push('/user/add')
  } else {
    console.log('Something went Wrong!')
  }
}

const editUserBtn = (index) => {
  userActions.enableEdit()
  if (userActions.isEditMode) {
    router.push(`/user/edit/${index}`)
  } else {
    console.log('Something went Wrong')
  }
}

const getUserDetail = async () => {
  try {
    userActions.getUsers()
  } catch (e) {
    console.log('Error fetching data!', e)
  }
}
const deleteUser = async (index) => {
  try {
    userActions.deleteUser(index)
  } catch (e) {
    console.log('Not deleted', e)
  }
}
watchEffect(() => {
  getUserDetail()
})
</script>
<template>
  <div class="hideForm">
    <button @click="addUserBtn()">Add User</button>
  </div>
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
        <tr v-for="(user, index) in userActions.user.slice().reverse()" :key="user._id">
          <td>{{ index + 1 }}</td>
          <td>{{ user.name }}</td>
          <td>{{ user.email }}</td>
          <td>{{ user.phone_no }}</td>
          <td>{{ user.address }}</td>
          <td>{{ user.age }}</td>
          <td>{{ user.gender }}</td>
          <td>{{ user.dob ? user.dob.split('T')[0] : '' }}</td>
          <td>
            <button @click="editUserBtn(user._id)">Edit</button>
            <button @click="deleteUser(user._id)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<style scoped lang="scss">
.hideForm {
  display: flex;
  flex-direction: column;
  align-items: end;
  padding-top: 20px;

  button {
    margin-bottom: 20px;
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

    &:focus {
      outline: none;
      box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
    }
  }

  /* Add spacing for the form below the button */
  > *:not(button) {
    width: 100%;
    max-width: 600px;
  }
}
</style>
