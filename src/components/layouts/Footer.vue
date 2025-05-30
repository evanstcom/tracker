<template>
  <header id="menu"
          class=" mx-auto w-full h-16 flex items center border-t border-orange-600 border-opacity-20 mt-4">
    <div class="flex items-center justify-between container mx-auto">
      <span class="text-gray-600 text-sm">Tracker by EVANS</span>

    </div>
  </header>
</template>

<script setup>
import {HomeIcon, UserIcon, MagnifyingGlassIcon, BookmarkIcon} from "@heroicons/vue/24/outline";
import {useAuthStore} from "@/stores/auth.js";
import {useRouter} from "vue-router";
import {computed} from "vue";

const router = useRouter()
const authStore = useAuthStore()

const currentRoute = computed(() => router.currentRoute.value.path)

console.log(router.currentRoute.value.path)
</script>
