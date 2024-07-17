<template>
  <div class="position-fixed top-0 end-0 p-3" style="z-index: 11">
    <div
      id="liveToast"
      class="toast align-items-center text-white border-0"
      :class="props.isError ? 'bg-danger' : 'bg-primary'"
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
    >
      <div class="d-flex">
        <div class="toast-body">
          {{ props.repMsg }}
        </div>
        <button
          type="button"
          class="btn-close btn-close-white me-2 m-auto"
          data-bs-dismiss="toast"
          aria-label="Close"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'

const props = defineProps({
  isError: {
    type: Boolean,
    default: false
  },
  repMsg: {
    type: String,
    default: ''
  }
})
</script>