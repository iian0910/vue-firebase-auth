<template>
  <router-view/>
</template>

<script>

export default {
  name: 'App'
}

// 讓行動螢幕採用全高「100vh」，在 iOS Safari 和 Google Chrome 上，視窗不會根據 URL 的顯示或隱藏而調整大小
// Calculate the window's innerHeight, and use that as a CSS variable instead of vh
let vh = window.innerHeight * 0.01
document.documentElement.style.setProperty('--vh', `${vh}px`)
</script>

<style>
*{
  user-select: none;
}
</style>
