<template>
  <metainfo>
    <template v-slot:title></template>
  </metainfo>
  <Loading v-if="tasksStore.loader" :full-screen="true"/>
  <section v-else class="container mx-auto px-1">
    <div class="grid grid-cols-3 gap-4">
      <div class="col-3">
        <div class="flex justify-center items-center gap-4 h-10">
          <h3 class="text-gray-300 text-center">TO DO</h3>
          <button @click="handlePopup" class="flex items-center justify-center"><PlusIcon class="w-5 p-1 text-white bg-gray-600 transition rounded-full hover:bg-orange-600"/></button>
          <PopupAddTask :handleClick="handlePopup" :openPopup="openPopup" />
        </div>
        <draggable
            class="list-group gap-2 flex flex-col"
            group="people"
            @change="log"
            itemKey="name"
            :list="tasksStore.tasks.todo"
        >
          <template #item=" {element} ">
            <div class="list-group-item bg-gray-800 p-2 rounded-md cursor-all-scroll">{{ element.name }}</div>
          </template>
        </draggable>
      </div>

      <div class="col-3">
        <h3 class="text-yellow-600 text-center h-10 flex items-center justify-center">IN PROGRESS</h3>
        <draggable
            class="list-group gap-2 flex flex-col"
            :list="tasksStore.tasks.inProgress"
            group="people"
            @change="log"
            itemKey="name"
        >
          <template #item="{ element, index }">
            <div class="list-group-item bg-gray-800 p-2 rounded-md cursor-all-scroll">{{ element.name }}</div>
          </template>
        </draggable>
      </div>
      <div class="col-3">
        <h3 class="text-green-600 text-center h-10 flex items-center justify-center">DONE</h3>
        <draggable
            class="list-group gap-2 flex flex-col"
            :list="tasksStore.tasks.done"
            group="people"
            @change="log"
            itemKey="name"
        >
          <template #item="{ element, index }">
            <div class="list-group-item bg-gray-800 p-2 rounded-md cursor-all-scroll">
              <div class="mb-4">
              {{ element.name }}

              </div>
            <div class="cursor-pointer text-red-600 hover:text-red-400 transition" @click="tasksStore.removeTask(index)">Удалить задачу</div>
            </div>
          </template>
        </draggable>
      </div>
    </div>
  </section>
</template>

<script setup >
import {onMounted, ref} from "vue";
import {useAuthStore} from "@/stores/auth.js";
import {useMeta} from "vue-meta";
import Loading from "@/components/ui/Loading.vue";
import {PlusIcon} from '@heroicons/vue/24/outline'
import PopupAddTask from "@/components/popups/PopupAddTask.vue";
import draggable from "vuedraggable";
import {useTasksStore} from "@/stores/tasks.js";

const tasksStore = useTasksStore()

const authStore = useAuthStore()

const openPopup = ref(false)
const handlePopup = () => {
  openPopup.value = !openPopup.value
}

const log = (evt) => {
  window.console.log(evt);
  tasksStore.setTasks(tasksStore.tasks)
}

/*const add = () => {
  this.list.push({ name: "Juan" });
}

const replace = () =>{
  this.list = [{ name: "Edgard" }];
}
const clone = (el) =>{
  return {
    name: el.name + " cloned"
  };
}*/

const notificationPermission = () => {
  Notification.requestPermission().then((permission) => {
    if (permission === 'granted') {
      console.log('Разрешение на уведомления получено!');
    } else {
      console.log('Разрешение на уведомления отклонено.');
      localStorage.removeItem('notificationToken')
      useAuthStore().notificationToken = ''
    }
  });
}

onMounted( () => {
  tasksStore.getTasks()
  authStore.getTokenNotification()
  notificationPermission()
})

useMeta({
  title: 'Главная - Tracker by EVANS',
  meta: [
    {
      hid: 'description',
      name: 'description',
      content: 'Твой личный трекер задач'
    }
  ]
})
</script>

