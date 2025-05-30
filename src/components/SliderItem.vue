<template>
  <div class="relative">
    <RouterLink :to="{ name: 'item', params: {id: film.kinopoiskId ? film.kinopoiskId : film.filmId}}"
                class="flex flex-col">
      <div class="mb-1 image bg-contain"
           :class="size">

        <img class="mb-1 h-full w-full" :src="film.posterUrlPreview ? film.posterUrlPreview : film.posterUrl"
             :alt="film.nameRu ? film.nameRu : film.nameEn">
      </div>
      <h3 class="text-xs mb-1">{{ film.nameRu ? film.nameRu : film.nameEn }}</h3>
    </RouterLink>
  </div>
</template>
<script setup>
import {RouterLink} from "vue-router";

const {film, size} = defineProps({
      film: Object,
      size: {
        type: String,
        default: 'w-40 h-60',
        required: false
      }
    }
)
</script>