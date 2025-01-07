<script setup>
import Card from './Card.vue'
import toDo from '../assets/images/todo.jpeg'
import notes from '../assets/images/notes.jpeg'
import cal from '../assets/images/cal.jpeg'
import '../assets/scss/components/list.scss'
import { ref } from 'vue'
const ProjectList = ref([
  {
    image: toDo,
    title: 'To-Do List',
    body: 'A simple CRUD app to manage tasks.',
    link: 'list/to-do',
  },
  {
    image: notes,
    title: 'Notes',
    body: 'Create, edit, and delete notes, stored locally or via an API.',
    link: 'list/notes',
  },
  {
    image: cal,
    title: 'Calculator',
    body: 'A fully functional calculator with basic arithmetic operations.',
    link: 'list/cal',
  },
])
</script>
<template>
  <div class="project_list">
    <Card :listData="ProjectList" />
  </div>
  <router-view />
</template>
