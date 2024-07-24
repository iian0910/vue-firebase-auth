import {
  createRouter,
  createWebHashHistory
} from 'vue-router'

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('../pages/loginPage.vue')
  },
  {
    path: '/resetPassword',
    name: 'resetPassword',
    component: () => import('../pages/resetPassword.vue')
  },
  {
    path: '/admin',
    name: 'Dashboard',
    component: () => import('../pages/backEnd/backEnd.vue'),
    children: [
      {
        path: 'productsList',
        name: 'ProductsList',
        component: () => import('../pages/backEnd/productList.vue')
      }
    ]
  },
  {
    path: '/',
    name: 'frontEnd',
    component: () => import('../pages/frontEnd/frontEnd.vue'),
    children: [
      {
        path: '',
        name: 'Index',
        component: () => import('../pages/frontEnd/indexPage.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router