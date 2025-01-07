import { getApi } from '@/services/api';
import { defineStore } from 'pinia'

// export const useCounterStore = defineStore('counter', () => {
//   const count = ref(0)
//   const doubleCount = computed(() => count.value * 2)
//   function increment() {
//     count.value++
//   }

//   return { count, doubleCount, increment }
// })

export const useEditStore = defineStore('edit', {
  state: () => ({
    isEditing: false,
    userId: null,
    isShown: false,
    users: []
  }),
  actions: {
    enableEdit(id) {
      this.isEditing = true;
      this.userId = id;
      this.isShown = true;
    },
    disableEdit() {
      this.isEditing = false;
      this.isShown = false;
    },
    showForm() {
      this.isShown = !this.isShown
    },
    async fetchUsers() {
      try {
        const detail = await getApi('/user')
        this.users = detail.data
      } catch (e) {
        console.log(e)
      }
    },
    addUser(newUser) {
      this.users.push(newUser)
    },
    deleteUser() {
      this.users = this.users.filter(user => {
        return user.userId !== userId
      })
    },
    updateUser(userId) {
      this.users
    }
  },
})