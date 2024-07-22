<template>
  <LoadingPlugins :is-loading="isLoading"/>
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
        <a
          href="#"
          class="d-block text-decoration-none text-end"
          @click.prevent="updatePW"
          v-if="currentStatus === 'login'"
        >
          忘記密碼?
        </a>
        <div class="text-center my-3 otherLoginMethod d-flex align-items-center justify-content-center">OR</div>
        <div class="text-center mb-4">
          <i class="bi bi-google me-3" @click="googleLogin"></i>
          <i class="bi bi-github" @click="githubLogin"></i>
        </div>
        <div class="d-grid gap-2">
          <button
            v-if="currentStatus === 'login'"
            type="button"
            class="btn btn-primary d-block"
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
        </div>
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
  GoogleAuthProvider,
  signInWithPopup,
  GithubAuthProvider
} from 'firebase/auth'
import { Toast } from 'bootstrap/dist/js/bootstrap'
import CurrentStatus from '../components/CurrentStatus.vue'
import LoadingPlugins from '../components/LoadingPlugins.vue'
import MsgToast from '../components/MsgToast.vue'
import { useRouter } from 'vue-router'

const userEmail = ref('')
const userPassword = ref('')
const isError = ref(false)
const repMsg = ref('')
const currentStatus = ref('login')

const router = useRouter()

const isLoading = ref(false)

const createAccount = async () => {
  isLoading.value = true
  // 建立帳號
  // 在 auth.ActionCodeSettings.url 加上 ?email=${auth.currentUser.email} 導頁後會將使用者信箱帶上
  await createUserWithEmailAndPassword(auth, userEmail.value, userPassword.value)
    .then(() => {
      auth.languageCode = 'zh-TW',
      auth.ActionCodeSettings = {
        url: `${process.env.NODE_ENV === 'production' ? 'https://iian0910.github.io/vue-firebase-auth/' : 'http://localhost:8080/'}`
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
  
  isLoading.value = false
  openToast()
}

const login = async () => {
  isLoading.value = true
  await signInWithEmailAndPassword(auth, userEmail.value, userPassword.value)
    .then(() => {
      userEmail.value = ''
      userPassword.value = ''
      isError.value = false
      repMsg.value = '登入成功'
      router.push({
        path: '/admin/productsList',
      })

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
    
  isLoading.value = false
}

const googleLogin = async () => {
  const providerGoogle = new GoogleAuthProvider()
  await signInWithPopup(auth, providerGoogle)
    .then((result) => {
      isError.value = false
      repMsg.value = '登入成功'
      const credential = GoogleAuthProvider.credentialFromResult(result)
      console.log(credential)
    })
    .catch(error => {
      isError.value = true
      repMsg.value = '登入失敗'
      console.log(error)
    })

  openToast()
}

const githubLogin = async () => {
  const providerGoogle = new GithubAuthProvider()
  await signInWithPopup(auth, providerGoogle)
    .then((result) => {
      isError.value = false
      repMsg.value = '登入成功'
      const credential = GithubAuthProvider.credentialFromResult(result)
      console.log(credential)
    })
    .catch(error => {
      isError.value = true
      repMsg.value = '登入失敗'
      console.log(error)
    })

  openToast()
}

const updatePW = () => {
  router.push({
    path: '/resetPassword',
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
.bi{
  cursor: pointer;
  &::before {
    font-size: 25px;
    color: rgb(38, 90, 150);
    &:hover {
      color: rgb(66, 123, 187);
    }
  }
  &:hover{
    &::before {
      color: rgb(66, 123, 187);
    }
  }
}
.otherLoginMethod{
  color: rgb(38, 90, 150);
  font-weight: bold;
  &::before,
  &::after {
    content: '';
    width: 100%;
    height: 1px;
    display: block;
    background: rgb(38, 90, 150);
  }
  &::before {
    margin-right: 10px;
  }
  &::after {
    margin-left: 10px;
  }
}
</style>