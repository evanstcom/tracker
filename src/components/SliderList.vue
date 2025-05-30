<template>
  <swiper
      :slidesPerView="'auto'"
      :free-mode="true"
      class="mySwiper"
      :freeMode="true"
      :modules="modules"
      :space-between="8"
  >
    <swiper-slide v-for="film in films" :key="film.kinopoiskId ? film.kinopoiskId : film.filmId"
                  class="flex-1">
      <SliderItem :film="film.item ? film.item : film"/>
    </swiper-slide>
  </swiper>
</template>
<script setup>
import 'swiper/css';
import 'swiper/css/free-mode';
import {FreeMode} from 'swiper/modules';
import {Swiper, SwiperSlide} from "swiper/vue";
import SliderItem from "@/components/SliderItem.vue";

const modules = [FreeMode]

defineProps({
  films: Array,
  search: {
    type: Boolean,
    default: false,
    required: false
  }
})
</script>
