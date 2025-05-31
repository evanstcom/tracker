<template>
  <ContextMenuRoot>
    <ContextMenuTrigger
        as-child
    >
      <div class="p-3">
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
      </div>
    </ContextMenuTrigger>
    <ContextMenuPortal>
      <ContextMenuContent
          class="min-w-[220px] z-30 bg-gray-900 outline-none rounded-md p-[5px] shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] will-change-[opacity,transform] data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade"
          :side-offset="5"
      >
        <ContextMenuItem
            value="New Tab"
            class="group cursor-pointer text-xs leading-none rounded-[3px] flex items-center h-[25px] px-[5px] relative pl-[25px] select-none outline-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-gray-800  transition"
            @click="handleClick"
        >
         Редактировать
        </ContextMenuItem>
        <ContextMenuSeparator class="h-[1px] bg-gray-600 m-[5px]" />
        <ContextMenuItem
            value="New Window"
            @click="tasksStore.removeTask(index, status)"
            class="group text-xs leading-none text-grass11 rounded-[3px] flex items-center h-[25px] px-[5px] relative pl-[25px] select-none outline-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-red-800 cursor-pointer transition data-[highlighted]:text-white"
        >
          Удалить
        </ContextMenuItem>
        <ContextMenuSeparator class="h-[1px] bg-gray-600 m-[5px]" />
        <ContextMenuLabel class="pl-[25px] text-xs leading-6 text-gray-400">
          Приоритет
        </ContextMenuLabel>
        <ContextMenuRadioGroup v-model="element.priority">
          <ContextMenuRadioItem
              class="text-xs cursor-pointer leading-none text-grass11 rounded-[3px] flex items-center h-[25px] px-[5px] relative pl-[25px] select-none outline-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-gray-800 data-[highlighted]:text-green1"
              value="Низкий"
              @click="tasksStore.setTasks(tasksStore.tasks)"
          >
            <ContextMenuItemIndicator class="absolute left-0 w-[25px] inline-flex items-center justify-center">
              <Icon icon="radix-icons:dot-filled" />
            </ContextMenuItemIndicator> Низкий
          </ContextMenuRadioItem>
          <ContextMenuRadioItem
              class="text-xs cursor-pointer leading-none text-grass11 rounded-[3px] flex items-center h-[25px] px-[5px] relative pl-[25px] select-none outline-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-gray-800 data-[highlighted]:text-green1"
              value="Средний"
              @click="tasksStore.setTasks(tasksStore.tasks)"
          >
            <ContextMenuItemIndicator class="absolute left-0 w-[25px] inline-flex items-center justify-center">
              <Icon icon="radix-icons:dot-filled" />
            </ContextMenuItemIndicator> Средний
          </ContextMenuRadioItem>
          <ContextMenuRadioItem
              class="text-xs cursor-pointer leading-none text-grass11 rounded-[3px] flex items-center h-[25px] px-[5px] relative pl-[25px] select-none outline-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-gray-800 data-[highlighted]:text-green1"
              value="Высокий"
              @click="tasksStore.setTasks(tasksStore.tasks)"
          >
            <ContextMenuItemIndicator class="absolute left-0 w-[25px] inline-flex items-center justify-center">
              <Icon icon="radix-icons:dot-filled" />
            </ContextMenuItemIndicator> Высокий
          </ContextMenuRadioItem>
        </ContextMenuRadioGroup>
      </ContextMenuContent>
    </ContextMenuPortal>
  </ContextMenuRoot>
</template>
<script setup lang="ts">
import {Icon} from "@iconify/vue";
import {
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuItemIndicator,
  ContextMenuLabel,
  ContextMenuPortal,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuRoot,
  ContextMenuSeparator,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger
} from "reka-ui";
import {XMarkIcon} from "@heroicons/vue/24/outline";
import {ref, watch} from "vue";
import {useTasksStore} from "@/stores/tasks.js";

const tasksStore = useTasksStore()

const {element, index, status} = defineProps({
  element: Object,
  index: Number,
  status: String
})

const checkboxOne = ref(false)
const checkboxTwo = ref(false)
const person = ref('pedro')

function handleClick() {
  // eslint-disable-next-line no-alert
  alert('hello!')
}

</script>