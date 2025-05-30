<template>
  <header id="menu"
          class=" mx-auto w-full h-16 flex items center border-b border-orange-600 border-opacity-20 mb-4">
    <div class="flex items-center justify-between container mx-auto px-1">
    <RouterLink to="/" class="text-orange-600 text-2xl transition hover:text-orange-600" :class="currentRoute === '/' ? 'text-orange-600' : 'text-white'">TRCR</RouterLink>
    <nav
        class="flex justify-between items-center gap-4">
<!--      <RouterLink to="/favorites" class="flex items-center gap-1">
        <BookmarkIcon class="w-6 text-gray-50" alt="favorites"/>
        <span class="text-xs text-white">Мое</span>
      </RouterLink>
      <RouterLink to="/search" class="flex items-center gap-1"
                  >
        <MagnifyingGlassIcon class="w-6 text-gray-50" alt="search"/>
        <span class="text-xs text-white">Поиск</span>
      </RouterLink>-->
      <RouterLink to="/profile" class="flex items-center gap-1 hover:text-orange-600 transition hover:border-orange-600" :class="currentRoute === '/profile' ? 'text-orange-600' : 'text-white'">
        <UserIcon class="w-6 p-0.5" alt="profile"/>
        <span class="text-xs">{{authStore.userInfo.name}}</span>
      </RouterLink>
    </nav>

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
