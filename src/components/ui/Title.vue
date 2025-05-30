<template>
  <div class="flex justify-between">
    <h2 class="text-lg font-semibold">{{ title }}</h2>
    <RouterLink v-if="showAll" :to="{name:link}" class="text-orange-600 font-semibold flex gap-1.5 pt-1">
      <span class="text-sm leading-none pb-0.5">все</span>
    </RouterLink>
  </div>
</template>

<script setup>
import {RouterLink} from "vue-router";

defineProps({
  title: {
    type: String,
    default: '',
    required: true
  },
  showAll: {
    type: Boolean,
    default: false,
  },
  link: {
    type: String,
    default: ''
  }
})
</script>

<style scoped>

</style>