<script setup>
import Header from "@/components/layouts/Header.vue"
import Footer from "@/components/layouts/Footer.vue"
import {useAuthStore} from "@/stores/auth.js";
import {computed, onMounted, ref} from "vue";
import {getAuth, onAuthStateChanged} from "firebase/auth";
import {useRouter} from "vue-router";

const authStore = useAuthStore()

const router = useRouter()
const token = computed(() => authStore.accessToken)
const notificationToken = ref(localStorage.getItem('notificationToken') ? localStorage.getItem('notificationToken') : '');

const auth = getAuth()

const loading = ref(true)

const checkUser = () => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      /*console.log("User logged in")*/
    } else {
      /*console.log("User logged out")*/
      authStore.auth('logout')
    }
  })
  authStore.accessToken = localStorage.getItem('accessToken')
  authStore.notificationToken = localStorage.getItem('notificationToken')
  authStore.refreshToken = localStorage.getItem('refreshToken')
  authStore.userInfo = JSON.parse(localStorage.getItem('user'))
}

onMounted(() => {
  checkUser()
  loading.value = false
})
</script>


<template>
  <Header v-show="token"/>
  <main>
    <RouterView/>
  </main>
<!--  <Footer v-show="token"/>-->
</template>
