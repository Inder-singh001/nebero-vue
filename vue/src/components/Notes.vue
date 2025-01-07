<script setup>
import '../assets/scss/components/todo.scss'
import { ref, watchEffect } from 'vue'
import { getApi, postApi } from '@/services/api'

const newNote = ref('')
const listNotes = ref([])

// const addNote = () => {
//   if (newNote.value.trim() !== '') {
//     listNotes.value.push(newNote.value)
//     newNote.value = ''
//   }
// }
const addNote = async () => {
  try {
    const resp = await postApi('/note/add', { note: newNote.value })
    newNote.value = ''
    getNotes()
    console.log(resp)
  } catch (e) {
    console.log(e)
  }
}
const getNotes = async () => {
  try {
    const res = await getApi('/note')
    listNotes.value = res.data
  } catch (e) {
    console.log(e)
  }
}

const deleteNote = async (index) => {
  try {
    const resp = await postApi('/note/delete', { _id: index })
    console.log(resp)
    getNotes()
  } catch (e) {
    console.error('Error deleting Note:', e)
  }
}

const multiline = (text) => {
  return text.replace(/\n/g, '<br/>')
}

watchEffect(() => {
  getNotes()
})
</script>
<template>
  <div class="todo_section note_section">
    <h2>Notes</h2>
    <form class="list_add note_add" @submit.prevent="addNote">
      <textarea
        type="text"
        id="newNote"
        name="newNote"
        class="text_area"
        placeholder="Enter a note"
        v-model="newNote"
      />
      <button type="submit" i>Add</button>
    </form>
    <div class="list_data">
      <div class="list_display" v-for="(note, index) in listNotes" :key="note._id">
        <input type="checkbox" value="note" />
        <p v-html="multiline(note.note)"></p>
        <span>
          <button @click="deleteNote(note._id)">Delete</button>
          <!-- <button @click="editNote(index)">Done</button> -->
        </span>
      </div>
    </div>
  </div>
</template>
