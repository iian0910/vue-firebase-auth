import {
  createRouter,
  createWebHashHistory
} from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Login',
    component: () => import('../pages/loginPage.vue')
  },
  {
    path: '/resetPassword',
    name: 'resetPassword',
    component: () => import('../pages/resetPassword.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router