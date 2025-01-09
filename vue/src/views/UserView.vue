<!-- <script setup>
import UserTable from '@/components/UserTable.vue'
import UserForm from '@/components/UserForm.vue'
import { useUserStore } from '@/stores/user'
import { inject } from 'vue'

const toast = inject('toast')

const userActions = useUserStore()
const toggleShowFormBtn = async () => {
  userActions.showForm()
  if (userActions.isShow) {
    toast.value.showToast('Adding new User!', 'success')
  } else {
    toast.value.showToast('No User Added!', 'error')
  }
}
</script>
<template>
  <div class="hideForm">
    <button @click="toggleShowFormBtn()">
      {{ !userActions.isShow ? 'Add User Form' : 'Hide User Form' }}
    </button>
    <UserForm v-if="userActions.isShow" />
  </div>
  <UserTable />
</template>
<style scoped lang="scss">
.hideForm {
  display: flex;
  flex-direction: column;
  align-items: center;
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
</style> -->

<script setup>
import UserTableRt from '@/components/UserTableRt.vue'
</script>
<template>
  <UserTableRt />
</template>
