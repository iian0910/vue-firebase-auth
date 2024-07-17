<template>
  <div class="card user_info">
    <CurrentStatus
      @sendStatus="setStatus"
    />
    <div class="card-body px-0 py-0">
      <form>
        <div class="mb-3">
          <label for="email" class="form-label">電子信箱</label>
          <input v-model="userEmail" type="email" class="form-control" id="email">
        </div>
        <div class="mb-2">
          <label for="password" class="form-label">密碼</label>
          <input v-model="userPassword" type="password" class="form-control" id="password">
        </div>
        <div class="text-end mb-5" @click="updatePW">忘記密碼</div>
        <button
          v-if="currentStatus === 'login'"
          type="button"
          class="btn btn-primary"
          @click="login"
        >
          登入
        </button>
        <button
          v-else
          type="button"
          class="btn btn-primary"
          @click="createAccount"
        >
          註冊
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
import { ref } from 'vue'
import { auth } from '@/firebase'
import {
  createUserWithEmailAndPassword, // 用email創立新帳號
  signInWithEmailAndPassword,     // 用email帳號登入
  sendEmailVerification,          // 註冊會員後，發送驗證信，點開連結才能開通
} from 'firebase/auth'
import { Toast } from 'bootstrap/dist/js/bootstrap'
import CurrentStatus from '../components/CurrentStatus.vue'
import MsgToast from '../components/MsgToast.vue'
import { useRouter } from 'vue-router'

const userEmail = ref('')
const userPassword = ref('')
const isError = ref(false)
const repMsg = ref('')
const currentStatus = ref('login')

const router = useRouter()

const createAccount = async () => {
  // 建立帳號
  await createUserWithEmailAndPassword(auth, userEmail.value, userPassword.value)
    .then(() => {
      auth.languageCode = 'zh-TW',
      auth.ActionCodeSettings = {
        url: `http://localhost:8080/?email=${auth.currentUser.email}`
      }
      // 發送驗證信到指定信箱
      sendEmailVerification(auth.currentUser, auth.ActionCodeSettings).then(() => {
        userEmail.value = ''
        userPassword.value = ''
      })
      isError.value = false
      repMsg.value = '註冊成功，請到指定信箱點擊驗證連結'
    })
    .catch(error => {
      isError.value = true
      switch (error.message) {
        case 'Firebase: Error (auth/email-already-in-use).':
          repMsg.value = '帳號已註冊'
          break;
        default:
          repMsg.value = '註冊失敗'
          break;
      }
    })
  
  openToast()
}

const login = async () => {
  await signInWithEmailAndPassword(auth, userEmail.value, userPassword.value)
    .then(() => {
      userEmail.value = ''
      userPassword.value = ''
      isError.value = false
      repMsg.value = '登入成功'
    })
    .catch(error => {
      isError.value = true
      switch (error.message) {
        case 'Firebase: Error (auth/invalid-email).':
          repMsg.value = '帳號有誤';
          break;
        case 'Firebase: Error (auth/missing-password).':
          repMsg.value = '密碼有誤';
          break;
        default:
          repMsg.value = '帳號或密碼不存在';
          break;
      }
    })
  
  openToast()
}

const updatePW = () => {
  router.push({
    name: 'resetPassword',
  })
}

const openToast = () => {
  const toastLive = document.getElementById('liveToast')
  const toast = new Toast(toastLive)
  toast.show()
}

const setStatus = (status) => {
  userEmail.value = ''
  userPassword.value = ''
  currentStatus.value = status
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