<template>
  <div
    class="lottie_mask"
    v-if="props.isLoading"
  >
    <Vue3lottie
      class="lottie"
      :animationData="AstronautJSON"
      :height="200"
      :width="200"
    />
  </div>
</template>

<script setup>
import { defineProps } from 'vue'
import AstronautJSON from '../assets/lottie/astronaut.json'

const props = defineProps({
  isLoading: {
    type: Boolean,
    default: false
  }
})

</script>

<style lang="scss" scoped>
.lottie_mask {
  position: relative;
  width: 100%;
  height: calc(var(--vh, 1vh) * 100);
  background-color: rgba(255, 255, 255, 0.541);
  z-index: 5;
}
.lottie {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>