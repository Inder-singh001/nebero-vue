import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import ListView from '../views/ListView.vue'
import ContactView from '../views/ContactView.vue'
import ProjectView from '../views/ProjectView.vue'
import UserView from '@/views/UserView.vue'
import FromView from '@/views/FromView.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView,
    },
    {
      path: '/contact',
      name: 'contact',
      component: ContactView,
    },
    {
      path: '/list',
      name: 'list',
      component: ListView,
    },
    {
      path: '/list/:project',
      name: 'project',
      component: ProjectView,
    },
    {
      path: '/user',
      name: 'user',
      component: UserView,
    },
    {
      path: '/user/:id',
      name: 'edit',
      component: UserView,
    },
    {
      path: '/user/add',
      name: 'addUser',
      component: FromView,
    },
    {
      path: '/user/edit/:id',
      name: 'editUser',
      component: FromView,
    },
  ],
})

export default router
