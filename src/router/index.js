import {
  createRouter,
  createWebHistory
} from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Index',
    component: () => import('../pages/indexPage.vue')
  },
  {
    path: '/resetPassword',
    name: 'resetPassword',
    component: () => import('../pages/resetPassword.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router