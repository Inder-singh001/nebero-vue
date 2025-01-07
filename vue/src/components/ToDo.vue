<script setup>
import '../assets/scss/components/todo.scss'
import { getApi, postApi } from '@/services/api'

import { ref, watchEffect } from 'vue'
const newTask = ref('')
const list = ref([])

// const addTask = () => {
//   if (newTask.value.trim() !== '') {
//     list.value.push(newTask.value)
//     newTask.value = ''
//   }
// }

const addTask = async () => {
  try {
    const resp = await postApi('/todo/add', { task: newTask.value })
    getTasks()
    newTask.value = ''
    console.log(resp)
  } catch (e) {
    console.log(e)
  }
}
const getTasks = async () => {
  try {
    const res = await getApi('/todo')
    list.value = res.data
  } catch (e) {
    console.log(e)
  }
}

const deleteTask = async (index) => {
  try {
    const req = await postApi('/todo/delete', { _id: index })
    console.log(req)
    getTasks()
  } catch (e) {
    console.error('Error deleting task:', e)
  }
}

watchEffect(() => {
  getTasks()
})
</script>
<template>
  <div class="todo_section">
    <h2>To-Do List</h2>
    <form class="list_add" @submit.prevent="addTask">
      <input
        class="todo_input"
        type="text"
        id="newTask"
        name="newTask"
        placeholder="Enter Task"
        v-model="newTask"
      />
      <button type="submit" i>Add</button>
    </form>
    <div class="list_data">
      <div class="list_display" v-for="(task, index) in list" :key="task.id">
        <input type="checkbox" value="task" />
        {{ task.task }}
        <span>
          <button @click="deleteTask(task._id)">Delete</button>
        </span>
      </div>
    </div>
  </div>
</template>
