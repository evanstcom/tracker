<template>
  <div class="flex min-h-screen flex-1 flex-col justify-center px-6 py-12 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-sm relative">
      <img class="mx-auto h-16 w-auto rounded-full border border-orange-600" src="/img/icons/192x192.png"
           alt="Your Company"/>
      <h2 class="mt-4 text-center text-2xl/9 font-bold tracking-tight">Регистрация</h2>
      <div v-if="authStore.error"
           class="absolute left-1/2 -translate-x-1/2 w-full -bottom-6 flex items-center justify-center gap-2">
        <ExclamationTriangleIcon class="size-4 text-red-500" aria-hidden="true"/>
        <div class="text-center text-xs text-red-500">
          {{ authStore.error }}
        </div>
      </div>
    </div>

    <div class="mt-4 sm:mx-auto sm:w-full sm:max-w-sm">
      <form class="space-y-6" action="#" method="POST">
        <div>
          <label for="name" class="block text-sm/6 font-medium">Ваше имя</label>
          <div class="mt-2">
            <input v-model="name" type="text" name="name" id="name" autocomplete="name" required
                   class="block w-full rounded-md bg-gray-900 px-3 py-1.5 text-base outline-none  -outline-offset-1 placeholder:text-gray-400  sm:text-sm/6"/>
          </div>
        </div>
        <div>
          <label for="email" class="block text-sm/6 font-medium">Email</label>
          <div class="mt-2">
            <input v-model="email" type="email" name="email" id="email" autocomplete="email" required
                   class="block w-full rounded-md bg-gray-900 px-3 py-1.5 text-base outline-none  -outline-offset-1 placeholder:text-gray-400  sm:text-sm/6"/>
          </div>
        </div>

        <div>
          <div class="flex items-center justify-between">
            <label for="password" class="block text-sm/6 font-medium">Пароль</label>
          </div>
          <div class="mt-2">
            <input v-model="password" type="password" name="password" id="password" autocomplete="current-password"
                   required=""
                   class="block w-full rounded-md bg-gray-900 px-3 py-1.5 text-base outline-none  -outline-offset-1 placeholder:text-gray-400  sm:text-sm/6"/>
          </div>
        </div>

        <div>
          <button v-if="!authStore.loader" type="submit"
                  @click.prevent="registration"
                  class="flex w-full justify-center rounded-md  bg-gradient-to-r from-orange-600 via-orange-500 to-yellow-400 px-3 py-1.5 text-sm/6 text-white shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
            Зарегистрироваться
          </button>
          <Loading v-else :full-screen="false"/>
        </div>
      </form>
      <p class="mt-10 text-center text-sm text-gray-400">
        Есть аккаунт?
        {{ ' ' }}
        <RouterLink to="/signin" class="text-orange-600 hover:text-orange-500">Войти</RouterLink>
      </p>
    </div>
  </div>
</template>
<script setup lang="ts">
import {useAuthStore} from "@/stores/auth";
import {onMounted, ref} from "vue";
import {ExclamationTriangleIcon} from "@heroicons/vue/24/outline";
import Loading from "@/components/ui/Loading.vue";

import {useRouter} from "vue-router";

const authStore = useAuthStore()

const name = ref('')
const email = ref('')
const password = ref('')

const router = useRouter()

const registration = async () => {
  authStore.error = ''
  if (email.value && password.value && name.value) {
    await authStore.auth('registration', {email: email.value, password: password.value, displayName: name.value})
    await router.push('/')
  } else {
    authStore.error = 'Заполните все поля'
  }
}

onMounted(() => {
  authStore.error = ''
  email.value = ''
  password.value = ''
  name.value = ''
})
</script>