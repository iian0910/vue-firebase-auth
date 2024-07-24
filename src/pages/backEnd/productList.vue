<template>
  <NavbarComp
    @logout="logout"
  />
  
</template>

<script setup>
import { auth } from '@/firebase'
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import NavbarComp from '../../components/backEnd/NavbarComp.vue'

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