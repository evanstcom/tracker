<template>
  <metainfo>
    <template v-slot:title></template>
  </metainfo>
  <section class="container mx-auto px-1 ">
    <div class="flex items-center justify-between">
      <Title title="Профиль"/>
      <button @click="handlePopupLogout"
              class="text-xs text-orange-600 ">
        Выйти
      </button>
      <PopUpLogout :handle-click="handlePopupLogout" :open-popup="openPopupLogout"/>
    </div>
    <div class="mt-2">
      <dl>
        <div class=" py-3 sm:grid sm:grid-cols-6 sm:gap-4 sm:px-0 relative">
          <dt class="text-sm/6 font-medium">Имя</dt>
          <dd class="mt-1 text-sm/6 text-gray-400 sm:col-span-2 sm:mt-0 relative">{{ authStore.userInfo.name }}

          </dd>
          <dd>
          <div>
            <PencilSquareIcon class="size-6 text-blue-500 hover:cursor-pointer" aria-hidden="true" @click="handlePopupEdit"/>
            <PopupEdit :handleClick="handlePopupEdit" :openPopup="openPopupEdit"/>
          </div>

          </dd>
        </div>
        <div class=" py-3 sm:grid sm:grid-cols-6 sm:gap-4 sm:px-0 relative">
          <dt class="text-sm/6 font-medium">Уведомления</dt>
          <dd v-if="authStore.notificationToken"
              class="mt-1 text-sm/6 text-gray-400 sm:col-span-2 sm:mt-0">Уведомления разрешены
          </dd>
          <dd v-else class="mt-1 text-sm/6 text-gray-400 sm:col-span-2 sm:mt-0">Уведомления не разрешены</dd>
          <dd>
          <div
              class=""
              @click="handleOpenPopupNotification">
            <BellIcon v-if="authStore.notificationToken" class="size-6 text-green-500" aria-hidden="true"/>
            <BellSlashIcon v-else class="size-6 text-red-500" aria-hidden="true"/>
            <PopupNotification :handleClick="handleOpenPopupNotification" :openPopup="openPopupNotification"/>
          </div>
          </dd>
        </div>
        <div class=" py-3 sm:grid sm:grid-cols-6 sm:gap-4 sm:px-0">
          <dt class="text-sm/6 font-medium">Email address</dt>
          <dd class="mt-1 text-sm/6 text-gray-400 sm:col-span-2 sm:mt-0">{{ authStore.userInfo.email }}</dd>
        </div>
      </dl>
    </div>

  </section>
</template>

<script setup>
import {onMounted, ref} from 'vue'
import Title from "@/components/ui/Title.vue";
import PopUpLogout from "@/components/popups/PopupLogout.vue";
import PopupNotification from "@/components/popups/PopupNotification.vue";
import PopupEdit from "@/components/popups/PopupEdit.vue";
import {BellSlashIcon, BellIcon, PencilSquareIcon} from "@heroicons/vue/24/outline/index.js";
import {useAuthStore} from "@/stores/auth.js";
import {useMeta} from "vue-meta";

const authStore = useAuthStore()

const openPopupNotification = ref(false)
const openPopupLogout = ref(false)
const openPopupEdit = ref(false)

const handleOpenPopupNotification = () => {
  openPopupNotification.value = !openPopupNotification.value
}
const handlePopupLogout = () => {
  openPopupLogout.value = !openPopupLogout.value
}
const handlePopupEdit = () => {
  openPopupEdit.value = !openPopupEdit.value
}

onMounted(() => {
  authStore.getTokenNotification()
})
useMeta({
  title: 'Профиль',
  meta: [
    {
      hid: 'description',
      name: 'description',
      content: 'Твой личный трекер задач'
    }
  ]
})
</script>