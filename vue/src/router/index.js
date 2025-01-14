import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import ListView from '../views/ListView.vue'
import ContactView from '../views/ContactView.vue'
import ProjectView from '../views/ProjectView.vue'
import UserView from '@/views/UserView.vue'
import FromView from '@/views/FromView.vue'
import AuthView from '@/views/AuthView.vue'
import { useUserStore } from '@/stores/user'
import { setMapStoreSuffix } from 'pinia'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: { auth: false }
    },
    {
      path: '/login',
      name: 'login',
      component: AuthView,
      meta: { auth: false }

    },
    {
      path: '/signup',
      name: 'signup',
      component: AuthView,
      meta: { auth: false }

    },
    {
      path: '/about',
      name: 'about',
      component: AboutView,
      meta: { auth: false }

    },
    {
      path: '/contact',
      name: 'contact',
      component: ContactView,
      meta: { auth: false }

    },
    {
      path: '/list',
      name: 'list',
      component: ListView,
      meta: { auth: false }

    },
    {
      path: '/list/:project',
      name: 'project',
      component: ProjectView,
      meta: { auth: false }

    },
    {
      path: '/user',
      name: 'user',
      component: UserView,
      meta: { auth: true }

    },
    {
      path: '/user/:id',
      name: 'edit',
      component: UserView,
      meta: { auth: true }

    },
    {
      path: '/user/add',
      name: 'addUser',
      component: FromView,
      meta: { auth: true }

    },
    {
      path: '/user/edit/:id',
      name: 'editUser',
      component: FromView,
      meta: { auth: true }
    },
  ],
})


router.beforeEach((to, from, next) => {
  const userActions = useUserStore()
  console.log(!to.meta.auth)
  console.log(userActions.isAuthenticated)
  if (to.meta.auth && !userActions.isAuthenticated) {
    next('/login')
  }
  else if (!to.meta.auth && userActions.isAuthenticated && (to.path === '/login' || to.path === '/signup')) {
    next('/')
  }
  else
    next()
})

export default router
