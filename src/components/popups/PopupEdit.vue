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

      <div class="fixed inset-0 z-10 w-screen overflow-y-auto md:w-1/2 md:mx-auto">
        <div class="flex min-h-full justify-center items-center p-4 text-center sm:items-center backdrop-blur-sm">
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
                class="relative transform overflow-hidden rounded-lg text-left shadow-xl transition-all flex flex-col w-full sm:my-8 bg-gray-900 ">
              <div class="px-4 pb-4 pt-4 ">
                <div class="items-center justify-center relative">
                  <div class="mt-3">
                    <DialogTitle as="h3" class="text-base font-semibold text-center">Изменить имя
                    </DialogTitle>
                  </div>
                  <div v-if="error"
                       class="absolute left-1/2 -translate-x-1/2 w-full -bottom-6 flex items-center justify-center gap-2">
                    <ExclamationTriangleIcon class="size-4 text-red-500" aria-hidden="true"/>
                    <div class="text-center text-xs text-red-500">
                      {{ error }}
                    </div>
                  </div>
                </div>
              </div>
              <form class="space-y-1" action="#" method="POST">
                <div class="bg-gray-900 px-4 pb-4 pt-2">
                  <label for="name" class=" text-sm/6 font-medium">Новое имя</label>
                  <div class="mt-2">
                    <input v-model="name" type="text" name="name" id="name" autocomplete="name" required
                           class="block w-full rounded-md bg-gray-800 px-3 py-1.5 text-base outline-none -outline-offset-1 placeholder:text-gray-400 sm:text-sm/6"/>
                  </div>
                </div>
                <div class="px-4 pb-4 pt-2 flex flex-col">
                  <button
                      v-if="!authStore.loader"
                      type="button"
                      class="inline-flex w-full justify-center rounded-md bg-orange-600 outline-none py-2 text-sm font-semibold text-white shadow-sm hover:bg-orange-500 sm:w-auto"
                      @click="async() =>{
                    await updateUser()
                    if (!error) handleClick()}">
                    Сохранить
                  </button>
                  <Loading v-else :full-screen="false"/>
                  <button type="submit"
                          class="mt-3 inline-flex text-center justify-center rounded-md w-full py-2 text-sm font-semibold ring-inset sm:w-auto"
                          @click.prevent="handleClick" ref="cancelButtonRef">Закрыть
                  </button>
                </div>
              </form>
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
import {ref} from "vue";
import Loading from "@/components/ui/Loading.vue";
import {ExclamationTriangleIcon} from "@heroicons/vue/24/outline/index.js";

const name = ref('')

const error = ref('')

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

const updateUser = async () => {
  if (!name.value) {
    return error.value = 'Имя не может быть пустым'
  } else if (name.value === authStore.userInfo.name) {
    return error.value = 'Имя не изменилось'
  } else {
    error.value = ''
    await authStore.updateUser(name.value)
    name.value = ''
  }
}

</script>




