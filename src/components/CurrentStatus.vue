<template>
  <div
    class="btn-group mb-3"
    role="group"
    @change="currentActive"
    >
    <input
      type="radio"
      class="btn-check"
      name="btnradio"
      id="login"
      checked
      value="login"
    >
    <label
      class="btn btn-outline-primary"
      for="login"
    >
      登入
    </label>

    <input
      type="radio"
      class="btn-check"
      name="btnradio"
      id="signin"
      value="signin"
    >
    <label
      class="btn btn-outline-primary"
      for="signin"
    >
      註冊
    </label>
  </div>
</template>

<script setup>
import { defineEmits } from 'vue'

const emits = defineEmits(['sendStatus'])

const currentActive = (event) => {
  emits('sendStatus', event.target.value)
}
</script>