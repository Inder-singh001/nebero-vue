<!-- <script setup>
import UserTable from '@/components/UserTable.vue'
import UserForm from '@/components/UserForm.vue'
import { useEditStore } from '@/stores/user'
const addUserForm = useEditStore()
const toggleShowFormBtn = async () => {
  addUserForm.showForm()
}
</script>
<template>
  <div class="hideForm">
    <button @click="toggleShowFormBtn()">
      {{ !addUserForm.isShown ? 'Add User Form' : 'Hide User Form' }}
    </button>
    <UserForm v-if="addUserForm.isShown" />
  </div>
  <UserTable />
</template> -->

<script setup>
import UserTableRt from '@/components/UserTableRt.vue'
// import { useUserStore } from '@/stores/userRoute'
</script>
<template>
  <UserTableRt />
</template>
