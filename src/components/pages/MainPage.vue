<template>
  <metainfo>
    <template v-slot:title></template>
  </metainfo>
  <Loading v-if="tasksStore.loader" :full-screen="true"/>
  <section v-else class="container mx-auto px-1 mb-8">
    <div class="flex gap-4 overscroll-y-auto h-screen overflow-y-scroll ">
      <div class="col-1 min-w-60 flex-1">
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
            <div class="list-group-item bg-gray-800 p-3 rounded-md cursor-all-scroll">
              <div class="flex justify-between items-end mb-2">
                <div class="leading-none">
                  {{element.name}}
                </div>
                <div class="text-xs text-gray-500 leading-none">
                  {{element.createDate}}
                </div>
              </div>
              <div class="text-xs mb-2 text-gray-300">
                {{element.description}}
              </div>
              <div class="flex justify-between mb-2">
                <div v-show="element.deadline" class="text-xs leading-none">
                  <div class="text-gray-400 mb-0.5">Дедлайн:</div>
                  <div class="text-green-500 leading-none">
                    {{element.deadline.day >= 10 ? element.deadline.day : '0' + element.deadline.day}}.{{element.deadline.month >= 10 ? element.deadline.month : '0' + element.deadline.month}}.{{element.deadline.year}}
                  </div>
                </div>
                <div v-show="element.priority" class="text-xs leading-none text-end">
                  <div class="text-gray-400 mb-0.5">Приоритет:</div>
                  <div class="leading-none" :class="element.priority === 'Низкий' ? 'text-green-500' : element.priority === 'Средний' ? 'text-yellow-500' : 'text-red-500'">
                    {{element.priority}}
                  </div>
                </div>
              </div>
              <div class="cursor-pointer text-red-600 text-xs justify-self-end" @click="tasksStore.removeTask(index, 'todo')"><XMarkIcon class="w-4 h-4 text-red-600"/></div>
            </div>
          </template>
        </draggable>
      </div>
      <div class="col-1 min-w-60 flex-1">
        <h3 class="text-yellow-600 text-center h-10 flex items-center justify-center">IN PROGRESS</h3>
        <draggable
            class="list-group gap-2 flex flex-col"
            :list="tasksStore.tasks.inProgress"
            group="people"
            @change="log"
            itemKey="name"
        >
          <template #item=" {element} ">
            <div class="list-group-item bg-gray-800 p-3 rounded-md cursor-all-scroll">
              <div class="flex justify-between items-end mb-2">
                <div class="leading-none">
                  {{element.name}}
                </div>
                <div class="text-xs text-gray-500 leading-none">
                  {{element.createDate}}
                </div>
              </div>
              <div class="text-xs mb-2 text-gray-300">
                {{element.description}}
              </div>
              <div class="flex justify-between mb-2">
                <div v-show="element.deadline" class="text-xs leading-none">
                  <div class="text-gray-400 mb-0.5">Дедлайн:</div>
                  <div class="text-green-500 leading-none">
                    {{element.deadline.day >= 10 ? element.deadline.day : '0' + element.deadline.day}}.{{element.deadline.month >= 10 ? element.deadline.month : '0' + element.deadline.month}}.{{element.deadline.year}}
                  </div>
                </div>
                <div v-show="element.priority" class="text-xs leading-none text-end">
                  <div class="text-gray-400 mb-0.5">Приоритет:</div>
                  <div class="leading-none" :class="element.priority === 'Низкий' ? 'text-green-500' : element.priority === 'Средний' ? 'text-yellow-500' : 'text-red-500'">
                    {{element.priority}}
                  </div>
                </div>
              </div>
              <div class="cursor-pointer text-red-600 text-xs justify-self-end" @click="tasksStore.removeTask(index, 'inProgress')"><XMarkIcon class="w-4 h-4 text-red-600"/></div>
            </div>
          </template>
        </draggable>
      </div>
      <div class="col-3 min-w-60 flex-1">
        <h3 class="text-green-600 text-center h-10 flex items-center justify-center">DONE</h3>
        <draggable
            class="list-group gap-2 flex flex-col"
            :list="tasksStore.tasks.done"
            group="people"
            @change="log"
            itemKey="name"
        >
          <template #item=" {element} ">
            <div class="list-group-item bg-gray-800 p-3 rounded-md cursor-all-scroll">
              <div class="flex justify-between items-end mb-2">
                <div class="leading-none">
                  {{element.name}}
                </div>
                <div class="text-xs text-gray-500 leading-none">
                  {{element.createDate}}
                </div>
              </div>
              <div class="text-xs mb-2 text-gray-300">
                {{element.description}}
              </div>
              <div class="flex justify-between mb-2">
                <div v-show="element.deadline" class="text-xs leading-none">
                  <div class="text-gray-400 mb-0.5">Дедлайн:</div>
                  <div class="text-green-500 leading-none">
                    {{element.deadline.day >= 10 ? element.deadline.day : '0' + element.deadline.day}}.{{element.deadline.month >= 10 ? element.deadline.month : '0' + element.deadline.month}}.{{element.deadline.year}}
                  </div>
                </div>
                <div v-show="element.priority" class="text-xs leading-none text-end">
                  <div class="text-gray-400 mb-0.5">Приоритет:</div>
                  <div class="leading-none" :class="element.priority === 'Низкий' ? 'text-green-500' : element.priority === 'Средний' ? 'text-yellow-500' : 'text-red-500'">
                    {{element.priority}}
                  </div>
                </div>
              </div>
            <div class="cursor-pointer text-red-600 text-xs justify-self-end" @click="tasksStore.removeTask(index, 'done')"><XMarkIcon class="w-4 h-4 text-red-600"/></div>
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
import {PlusIcon, XMarkIcon} from '@heroicons/vue/24/outline'
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

