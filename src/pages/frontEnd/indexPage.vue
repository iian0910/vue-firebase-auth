<template>
  FrontEnd Index
  <button
    type="button"
    class="btn btn-primary d-block"
    @click="goToLoginPage"
  >
    Login
  </button>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const goToLoginPage = () => {
  router.push({
    path: '/login'
  })
}
</script>