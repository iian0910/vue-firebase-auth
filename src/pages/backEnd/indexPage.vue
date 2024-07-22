<template>
  BackEnd Index
  <button
    type="button"
    class="btn btn-primary d-block"
    @click="logout"
  >
    登出
  </button>
</template>

<script setup>
import { auth } from '@/firebase'
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

onMounted(() => {
  init()
})

const init = () => {
  auth.onAuthStateChanged(user => {
    if (user) {
      console.log('已登入!!!!', user)
    } else {
      console.log('沒登入!!!!')
      router.push({
        path: '/login',
      })
    }
  })
}

const logout = () => {
  auth.signOut()
    .then(() => {
      router.push({
        path: '/login',
      })
    })
}
</script>