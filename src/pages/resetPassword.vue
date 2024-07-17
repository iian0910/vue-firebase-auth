<template>
  <div class="card user_info">
    <div class="card-body px-0 py-0">
      <form>
        <div class="mb-5">
          <label for="email" class="form-label">電子信箱</label>
          <input v-model="userEmail" type="email" class="form-control" id="email">
        </div>
        <button
          type="button"
          class="btn btn-primary"
          @click="resetPSW"
        >
          重新設定
        </button>
      </form>
    </div>
  </div>
  <!-- Toast -->
  <MsgToast
    :isError="isError"
    :repMsg="repMsg"
  />
</template>

<script setup>
import { ref } from "vue"
import { Toast } from 'bootstrap/dist/js/bootstrap'
import { auth } from '@/firebase'
import {
  sendPasswordResetEmail          // 修改密碼，並寄信通知
} from 'firebase/auth'
import { useRouter } from 'vue-router'
import MsgToast from '../components/MsgToast.vue'

const userEmail = ref('')
const isError = ref(false)
const repMsg = ref('')

const router = useRouter()

const resetPSW = async () => {
  await sendPasswordResetEmail(auth, userEmail.value)
    .then(() => {
      userEmail.value = ''
      isError.value = false
      repMsg.value = '請至您的信箱，請點選信中驗連結定新密碼'
    })
    .catch(() => {
      isError.value = true
      repMsg.value = '發生錯誤，請重新整理頁面'
    })
    
    openToast()
}

const openToast = async () => {
  const toastLive = document.getElementById('liveToast')
  const toast = new Toast(toastLive)
  await toast.show()

  setTimeout(() => {
    router.push({
      name: 'Index',
    })
  }, 2000);
}
</script>

<style lang="scss" scoped>
.user_info {
  width: 300px;
  padding: 20px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>

