<script lang="ts" setup>
import {ref} from 'vue'
import {SwipeModal} from "@takuma-ru/vue-swipe-modal"

const isOpen = ref(false)

defineProps({
  openText: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: false
  },
  openTextStyle: {
    type: String,
    required: false,
    default: 'text-sm'
  }
})

</script>

<template>
  <p class="text-orange-600 text-end" :class="openTextStyle" @click="isOpen = true">{{ openText }}</p>
  <SwipeModal
      v-model="isOpen"
      snapPoint="auto"
      :is-scroll-lock="true"
      :is-full-screen="false"
  >
    <div class="px-2 pb-8 text-sm text-white">
      {{
        description
      }}
    </div>
  </SwipeModal>
</template>

<style lang="scss" scoped>
:deep(.modal-style) {
  box-sizing: border-box;
  width: 100%;
  color: white;
  border: 1px solid #111827;
  border-radius: 1rem 1rem 0 0;

  /*  @media (prefers-color-scheme: light) {
      color: black;
      background-color: #f7f2fa;
      box-shadow: 0 1px 4px 0 rgb(0 0 0 / 37%);
    }*/
}

:deep(.swipe-modal-drag-handle) {
  background-color: #ea580c !important;
  width: 48px !important;
}

:deep(.swipe-modal-content) {
  background-color: #111827 !important;
}
</style>