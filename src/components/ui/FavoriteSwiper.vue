<script lang="ts" setup>
import {ref} from 'vue'
import {SwipeModal} from "@takuma-ru/vue-swipe-modal"
import {EllipsisHorizontalIcon, BookmarkIcon, EyeIcon} from "@heroicons/vue/24/outline";
import {getDatabase, ref as dbRef, update} from "firebase/database";
import {getAuth} from "firebase/auth";
import {useFavoritesStore} from "@/stores/favorites";

const favoritesStore = useFavoritesStore()

const auth = getAuth();
const db = getDatabase();
const isOpen = ref(false)
const {film} = defineProps({
  film: Object
})
const setWatchedFilm = (param) => {
  film.isWatched = !param
  update(dbRef(db, 'users/' + auth.currentUser.uid + '/favorites/' + film.id), {
    isWatched: !param
  })
}
</script>

<template>
  <div>
    <EllipsisHorizontalIcon @click="isOpen = true"
                            class="w-5 text-gray-500"
                            alt="favorites"
    />

  </div>
  <SwipeModal
      v-model="isOpen"
      snapPoint="auto"
      :is-scroll-lock="true"
      :is-full-screen="false"
      class="bg-gray-600 bg-opacity-50 backdrop-blur-sm"
  >
    <div class="flex items-center  gap-8 mb-8 relative "
    >
      <div class="flex items-start justify-around gap-4 w-full ">
        <div
            class="p-2 flex flex-col items-center justify-center gap-1"
            @click="setWatchedFilm(film.isWatched)"
        >
          <EyeIcon class="w-6" alt="home"
                   :class="film.isWatched ? 'text-orange-600' : 'text-white'"/>
          <span class="text-xs text-white text-center">Просмотрено</span>
        </div>
        <div
            class="p-2 flex flex-col items-center justify-center gap-1"
            @click="favoritesStore.removeFromFavorites(null, film.id); isOpen = false"
        >
          <BookmarkIcon class="w-6" alt="home"
                        :class="film.isFavorite ? 'text-orange-600 fill-orange-600' : ''"
          />
          <span class="text-xs text-center text-white">Удалить из<br>избранного</span>
        </div>
      </div>
    </div>
  </SwipeModal>
</template>

<style lang="scss" scoped>
:deep(.modal-style) {
  box-sizing: border-box;
  width: 100%;
  color: white;
  border-radius: 1rem 1rem 0 0;
}

:deep(.swipe-modal-drag-handle) {
  background-color: #ea580c !important;
  width: 48px !important;
}

:deep(.swipe-modal-content) {
  background-color: rgba(157, 157, 157, 0.96) !important;
}
</style>