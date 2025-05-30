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

      <div class="fixed inset-0 z-10 w-screen overflow-y-auto mx-auto md:w-1/2">
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
                class="relative transform overflow-hidden rounded-lg text-left shadow-xl transition-all flex flex-col w-full sm:my-8">
              <div class="bg-gray-900 px-4 pb-4 pt-4">
                <div class="items-center justify-center">
                  <div class="mt-3">
                    <DialogTitle as="h3" class="text-base text-center">Вы хотите выйти из профиля?
                    </DialogTitle>
                  </div>
                </div>
              </div>
              <div class="bg-gray-900 px-4 py-4 items-center flex flex-col ">
                <button type="button"
                        class="inline-flex w-full justify-center rounded-md  bg-gradient-to-r from-orange-600 via-orange-500 to-yellow-400 outline-none px-12 py-2 text-sm text-white shadow-sm hover:bg-orange-500 sm:w-auto"
                        @click="handleClick">Остаться
                </button>
                <button type="button"
                        class="mt-3 inline-flex text-center justify-center border-none px-3 py-2 text-sm"
                        @click="logout" ref="cancelButtonRef">Выйти из профиля
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
import {useAuthStore} from "@/stores/auth.js";
import {useRouter} from "vue-router";

const router = useRouter()

const authStore = useAuthStore()

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

const logout = () => {
  authStore.auth('logout')
  router.push('/login')
}

</script>




