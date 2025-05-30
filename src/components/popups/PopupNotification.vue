<template>
  <TransitionRoot as="template" :show="openPopup">
    <Dialog class="relative z-10" @close="handleClick">
      <TransitionChild as="template"
                       enter="duration-300 ease-out"
                       enter-from="opacity-0"
                       enter-to="opacity-100"
                       leave="duration-200 ease-in"
                       leave-from="opacity-100"
                       leave-to="opacity-0">
        <div class="fixed inset-0 bg-gray-900/45 r-0 transition-opacity"/>
      </TransitionChild>

      <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div class="flex min-h-full justify-center items-center p-4 text-center sm:items-center">
          <TransitionChild
              as="template"
              enter="duration-300 ease-out"
              enter-from="opacity-0 scale-95"
              enter-to="opacity-100 scale-100"
              leave="duration-200 ease-in"
              leave-from="opacity-100 scale-100"
              leave-to="opacity-0 scale-95"
          >
            <DialogPanel
                class="relative transform overflow-hidden rounded-lg text-left shadow-xl transition-all flex flex-col w-full sm:my-8 bg-gray-900  mx-auto md:w-2/3">
              <div class="px-4 pb-4 pt-4">
                <div class="items-center justify-center">
                  <div v-if="!authStore.notificationToken"
                       class="mx-auto flex size-12 shrink-0 items-center justify-center rounded-full bg-gray-200 sm:size-10">
                    <BellSlashIcon class="size-6 text-red-600" aria-hidden="true"/>
                  </div>
                  <div v-else
                       class="mx-auto flex size-12 shrink-0 items-center justify-center rounded-full bg-gray-200 sm:size-10">
                    <BellIcon class="size-6 text-green-600" aria-hidden="true"/>
                  </div>
                  <div class="mt-3">
                    <DialogTitle v-if="!authStore.notificationToken" as="h3"
                                 class="text-base font-semibold text-center">
                      Уведомления не разрешены. Включите их в настройках.
                    </DialogTitle>
                    <DialogTitle v-else as="h3" class="text-base text-center">Уведомления разрешены
                    </DialogTitle>
                    <div v-if="authStore.notificationToken" class="mt-2">
                      <div class="text-sm text-gray-500 break-words text-center">{{
                          authStore.notificationToken
                        }}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="px-4 py-4 items-center flex flex-col ">
                <button v-if="authStore.notificationToken && !copyLoader && !copyDone"
                        type="button"
                        class="inline-flex w-full justify-center rounded-md  bg-gradient-to-r from-orange-600 via-orange-500 to-yellow-400 outline-none px-3 py-2 text-sm text-white shadow-sm hover:bg-orange-500 sm:w-auto"
                        @click="copyText">Скопировать токен
                </button>
                <Loading v-if="copyLoader" :full-screen="false"/>
                <CheckIcon v-if="copyDone" class="size-9 text-green-600" aria-hidden="true"/>
                <button type="button"
                        class="mt-3 inline-flex text-center justify-center border-none px-3 py-2 text-sm"
                        @click="handleClick" ref="cancelButtonRef">Закрыть
                </button>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup>
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
  DialogTitle,
} from '@headlessui/vue'
import {BellIcon, BellSlashIcon, CheckIcon} from '@heroicons/vue/24/outline'
import {useAuthStore} from "@/stores/auth.js";
import {ref} from "vue";
import Loading from "@/components/ui/Loading.vue";

defineProps({
  openPopup: {
    type: Boolean,
    required: true
  },
  handleClick: {
    type: Function,
    required: true
  }
})


const authStore = useAuthStore();

const copyLoader = ref(false)
const copyDone = ref(false)

const copyText = () => {
  copyLoader.value = true
  navigator.clipboard.writeText(authStore.notificationToken).then(() => {
    console.log('Текст скопирован в буфер обмена');
  })
  setTimeout(() => {
    copyLoader.value = false
    copyDone.value = true
    setTimeout(() => {
      copyDone.value = false
    }, 500)
  }, 250)
}
</script>




