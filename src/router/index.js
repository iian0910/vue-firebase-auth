import {
  createRouter,
  createWebHashHistory
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
  history: createWebHashHistory(),
  routes
})

export default router