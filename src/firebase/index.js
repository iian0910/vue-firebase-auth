// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyD8Y2Yg1mtUrnFayeygTZzTFUWFeyu6sgY',
  authDomain: 'vue-firebase-auth-d84dc.firebaseapp.com',
  projectId: 'vue-firebase-auth-d84dc',
  storageBucket: 'vue-firebase-auth-d84dc.appspot.com',
  messagingSenderId: '650535054719',
  appId: '1:650535054719:web:17c59f7be04dd5dc0cfe4a'
}

// Initialize Firebase
const firebase = initializeApp(firebaseConfig)
const auth = getAuth(firebase)

export {
  firebase,
  auth
}



