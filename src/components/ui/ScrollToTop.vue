<template>
  <div
      class="fixed bottom-20 right-7 inline-block p-2 rounded-md z-50 mb-1 cursor-pointer bg-gray-600 bg-opacity-50 backdrop-blur-sm"
      @click="goToTop"
  >
    <img src="/arrow.svg" alt="back" class="-rotate-90 w-4">
  </div>
</template>

<script setup>

const goToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}
</script>