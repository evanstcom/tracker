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
                v-if="!done"
                class="relative transform overflow-hidden rounded-lg text-left shadow-xl transition-all flex flex-col w-full sm:my-8 ">
              <div class="bg-white px-4 pb-4 pt-4 ">
                <div class="items-center justify-center relative">
                  <div class="mt-3">
                    <DialogTitle as="h3" class="text-base font-semibold text-center">Забыли пароль?
                    </DialogTitle>
                  </div>
                  <!--                  <div v-if="error"
                                         class="absolute left-1/2 -translate-x-1/2 w-full -bottom-6 flex items-center justify-center gap-2">
                                      <ExclamationTriangleIcon class="size-4 text-red-500" aria-hidden="true"/>
                                      <div class="text-center text-xs text-red-500">
                                        {{ error }}
                                      </div>
                                    </div>-->
                </div>
              </div>
              <form class="space-y-1 bg-white" action="#" method="POST">
                <div class="bg-white px-4 pb-4 pt-2">
                  <label for="name" class=" text-sm/6 font-medium">Введите свою почту</label>
                  <div class="mt-2">
                    <input v-model="email" type="email" name="email" id="forgot" required
                           class="block w-full rounded-md bg-gray-100 px-3 py-1.5 text-base outline-none -outline-offset-1 placeholder:text-gray-400 sm:text-sm/6"/>
                  </div>
                </div>
                <div class="bg-white px-4 pb-4 pt-2">
                  <button
                      type="button"
                      class="inline-flex w-full justify-center rounded-md bg-orange-600 outline-none py-2 text-sm font-semibold text-white shadow-sm hover:bg-orange-500 sm:w-auto"
                      @click="resetPassword">
                    Сбросить пароль
                  </button>
                  <button type="submit"
                          class="mt-3 inline-flex text-center justify-center rounded-md w-full py-2 text-sm font-semibold ring-inset sm:w-auto"
                          @click.prevent="handleClick" ref="cancelButtonRef">Закрыть
                  </button>
                </div>
              </form>
            </DialogPanel>
            <DialogPanel
                v-else
                class="relative transform overflow-hidden rounded-lg text-left shadow-xl transition-all flex flex-col w-full sm:my-8 ">
              <div class="bg-white px-4 pb-4 pt-4 ">
                <div class="items-center justify-center relative">
                  <DialogTitle as="h3" class="text-sm text-center">На указанный email отправлено письмо
                    со ссылкой для сброса пароля
                  </DialogTitle>
                </div>
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
import {ref} from "vue";
import {getAuth, sendPasswordResetEmail} from "firebase/auth";

const email = ref('')

const done = ref(false)

const resetPassword = () => {
  const auth = getAuth();
  done.value = true
  sendPasswordResetEmail(auth, email.value)
      .then(() => {
        // Password reset email sent!
        // ..
        console.log('password reset')
        setTimeout(() => {
          handleClick()
          done.value = false
        }, 3000)
      })
      .catch((error) => {
        console.log(error)
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
}

const {openPopup, handleClick} = defineProps({
  openPopup: {
    type: Boolean,
    required: true
  },
  handleClick: {
    type: Function,
    required: true
  }
})

</script>




