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

      <div class="fixed inset-0 z-10 w-screen overflow-y-auto  md:mx-auto">
        <div class="flex min-h-full min-w-full justify-center items-center p-4 text-center sm:items-center backdrop-blur-sm">
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
                class="relative transform overflow-hidden rounded-lg text-left shadow-xl transition-all flex flex-col w-full md:w-3/4 lg:w-1/2 sm:my-8 bg-gray-900 ">
              <div class="px-4 pb-4 pt-4 ">
                <div class="items-center justify-center relative">
                  <div class="mt-3">
                    <DialogTitle as="h3" class="text-base font-semibold text-center">Новая задача
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
                <div class="bg-gray-900 px-4 pb-2 pt-2">
                  <label for="name" class=" text-sm/6 font-medium">Название</label>
                  <div class="mt-2">
                    <input v-model.trim="task.name" type="text" id="taskName" :autocomplete=false required
                           class="block w-full rounded-md bg-gray-800 px-3 py-1.5 text-base outline-none -outline-offset-1 placeholder:text-gray-400 sm:text-sm/6"/>
                  </div>
                </div>
                <div class="bg-gray-900 px-4 pb-4">
                  <label for="name" class=" text-sm/6 font-medium">Описание задачи</label>
                  <div class="mt-2">
                    <textarea v-model.trim="task.description" type="text" id="taskName" :autocomplete=false required
                           class="block p-1 text-xs w-full rounded-md bg-gray-800 px-3 py-1.5 outline-none -outline-offset-1 placeholder:text-gray-400 sm:text-sm/6 resize-none max-h-96 overflow-hidden overflow-y-scroll"/>
                  </div>
                </div>
                <div class="flex gap-4 px-4">
                  <div class="flex flex-col">
                    <Label
                        class="text-xs text-gray-400 mb-1"
                        for="startDate"
                    >
                      Дедлайн
                    </Label>
                    <DatePickerRoot
                        id="startDate"
                        locale="ru"
                        v-model="task.deadline"
                    >
                      <DatePickerField
                          v-slot="{ segments }"
                          class="w-36 h-9 flex select-none bg-gray-800 items-center rounded-lg shadow-sm text-center justify-between text-white p-1 data-[invalid]:border-red-500"
                      >
                        <div class="flex items-center">
                          <template
                              v-for="item in segments"
                              :key="item.part"
                          >
                            <DatePickerInput
                                v-if="item.part === 'literal'"
                                :part="item.part"
                            >
                              {{ item.value }}
                            </DatePickerInput>
                            <DatePickerInput
                                v-else
                                :part="item.part"
                                class="rounded py-1 px-1 focus:outline-none focus:shadow-[0_0_0_2px] focus:shadow-gray-500 data-[placeholder]:text-gray-500 text-sm"
                            >
                              {{ item.value }}
                            </DatePickerInput>
                          </template>
                        </div>
                        <DatePickerTrigger class="focus:shadow-[0_0_0_2px] rounded p-1 focus:shadow-green-600">
                          <Icon
                              icon="radix-icons:calendar"
                              class="text-base"
                          />
                        </DatePickerTrigger>
                      </DatePickerField>

                      <DatePickerContent
                          :side-offset="4"
                          class="rounded-xl z-20 bg-gray-800 shadow-sm will-change-[transform,opacity] data-[state=open]:data-[side=top]:animate-slideDownAndFade data-[state=open]:data-[side=right]:animate-slideLeftAndFade data-[state=open]:data-[side=bottom]:animate-slideUpAndFade data-[state=open]:data-[side=left]:animate-slideRightAndFade"
                      >
                        <DatePickerArrow class="fill-gray-800 stroke-gray-800" />
                        <DatePickerCalendar
                            v-slot="{ weekDays, grid }"
                            class="p-4"
                        >
                          <DatePickerHeader class="flex items-center justify-between">
                            <DatePickerPrev
                                class="inline-flex items-center cursor-pointer text-white justify-center rounded-md bg-transparent w-7 h-7 transition hover:bg-black active:scale-98 active:transition-all focus:shadow-[0_0_0_2px] focus:shadow-black"
                            >
                              <Icon
                                  icon="radix-icons:chevron-left"
                                  class="w-4 h-4"
                              />
                            </DatePickerPrev>

                            <DatePickerHeading class="text-white font-medium" />
                            <DatePickerNext
                                class="inline-flex items-center cursor-pointer text-white justify-center rounded-md bg-transparent w-7 h-7 transition hover:bg-black active:scale-98 active:transition-all focus:shadow-[0_0_0_2px] focus:shadow-black"
                            >
                              <Icon
                                  icon="radix-icons:chevron-right"
                                  class="w-4 h-4"
                              />
                            </DatePickerNext>
                          </DatePickerHeader>
                          <div
                              class="flex flex-col space-y-4 pt-4 sm:flex-row sm:space-x-4 sm:space-y-0"
                          >
                            <DatePickerGrid
                                v-for="month in grid"
                                :key="month.value.toString()"
                                class="w-full border-collapse select-none space-y-1"
                            >
                              <DatePickerGridHead>
                                <DatePickerGridRow class="mb-1 flex w-full justify-between">
                                  <DatePickerHeadCell
                                      v-for="day in weekDays"
                                      :key="day"
                                      class="w-8 rounded-md text-xs text-green-600"
                                  >
                                    {{ day }}
                                  </DatePickerHeadCell>
                                </DatePickerGridRow>
                              </DatePickerGridHead>
                              <DatePickerGridBody>
                                <DatePickerGridRow
                                    v-for="(weekDates, index) in month.rows"
                                    :key="`weekDate-${index}`"
                                    class="flex w-full"
                                >
                                  <DatePickerCell
                                      v-for="weekDate in weekDates"
                                      :key="weekDate.toString()"
                                      :date="weekDate"
                                  >
                                    <DatePickerCellTrigger
                                        :day="weekDate"
                                        :month="month.value"
                                        class="relative flex items-center justify-center whitespace-nowrap rounded-[9px] border border-transparent bg-transparent text-sm font-normal text-white w-8 h-8 outline-none focus:shadow-[0_0_0_2px] focus:shadow-black hover:border-green-600 transition data-[selected]:bg-green-600 data-[selected]:font-medium data-[outside-view]:text-gray-500 data-[selected]:text-white data-[unavailable]:pointer-events-none data-[unavailable]:text-white data-[unavailable]:line-through before:absolute before:top-[5px] before:hidden before:rounded-full before:w-1 before:h-1 before:bg-white data-[today]:before:block data-[today]:before:bg-green9 data-[selected]:before:bg-white"
                                    />
                                  </DatePickerCell>
                                </DatePickerGridRow>
                              </DatePickerGridBody>
                            </DatePickerGrid>
                          </div>
                        </DatePickerCalendar>
                      </DatePickerContent>
                    </DatePickerRoot>
                  </div>
                  <div class="flex flex-col">
                    <Label
                        class="text-xs text-gray-400 mb-1"
                        for="priority"
                    >
                      Приоритет
                    </Label>
                    <ComboboxRoot
                        id="priority"
                        class="relative"
                        v-model="task.priority"
                    >
                      <ComboboxAnchor class="w-full h-9 inline-flex items-center justify-between rounded-lg px-[15px] text-xs leading-none  gap-[5px] bg-gray-800 text-grass11 shadow-sm focus:shadow-[0_0_0_2px] focus:shadow-black data-[placeholder]:text-grass9 outline-none">
                        <ComboboxInput
                            class="!bg-transparent outline-none selection:bg-grass5 placeholder-stone-400 w-full"
                            placeholder="Выберите приоритет"
                        />
                        <ComboboxTrigger>
                          <Icon
                              icon="radix-icons:chevron-down"
                              class="h-4 w-4 text-grass11"
                          />
                        </ComboboxTrigger>
                      </ComboboxAnchor>

                      <ComboboxContent class="absolute z-20 min-w-20 mt-1 bg-gray-800 rounded-lg shadow-sm will-change-[opacity,transform] data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade">
                        <ComboboxViewport class="p-2">
                          <ComboboxEmpty class="text-xs font-medium text-center py-2" />

                          <template
                              v-for="(group, index) in options"
                              :key="group.name"
                          >
                            <ComboboxGroup>
                              <ComboboxSeparator
                                  v-if="index !== 0"
                                  class="h-[1px] bg-grass6 m-[5px]"
                              />

                              <ComboboxLabel class="px-[25px] text-xs leading-[25px] text-gray-500">
                                {{ group.name }}
                              </ComboboxLabel>

                              <ComboboxItem
                                  v-for="option in group.children"
                                  :key="option.name"
                                  :value="option.name"
                                  class="text-xs leading-none cursor-pointer rounded-[3px] flex items-center h-[25px] pr-[35px] pl-[25px] relative select-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:outline-none data-[highlighted]:bg-grass9 data-[highlighted]:text-grass1"
                              >
                                <ComboboxItemIndicator
                                    class="absolute text-green-600 left-0 w-[25px] inline-flex items-center justify-center"
                                >
                                  <Icon icon="radix-icons:check" />
                                </ComboboxItemIndicator>
                                <span>
                {{ option.name }}
              </span>
                              </ComboboxItem>
                            </ComboboxGroup>
                          </template>
                        </ComboboxViewport>
                      </ComboboxContent>
                    </ComboboxRoot>
                  </div>
                </div>
                <div class="px-4 pb-4 pt-8 flex flex-col">
                  <button
                      v-if="!loader"
                      type="submit"
                      class="inline-flex w-full justify-center rounded-md bg-orange-600 outline-none py-2 text-sm font-semibold text-white shadow-sm hover:bg-orange-500 sm:w-auto"
                      @click.prevent="createTask">
                    Создать задачу
                  </button>
                  <Loading v-else :full-screen="false"/>
                  <button type="button"
                          class="mt-3 inline-flex text-center justify-center rounded-md w-full py-2 text-sm font-semibold ring-inset sm:w-auto"
                          @click="handleClick" ref="cancelButtonRef">Закрыть
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
import { Icon } from '@iconify/vue'
import {
  DatePickerArrow,
  DatePickerCalendar,
  DatePickerCell,
  DatePickerCellTrigger,
  DatePickerContent,
  DatePickerField,
  DatePickerGrid,
  DatePickerGridBody,
  DatePickerGridHead,
  DatePickerGridRow,
  DatePickerHeadCell,
  DatePickerHeader,
  DatePickerHeading,
  DatePickerInput,
  DatePickerNext,
  DatePickerPrev,
  DatePickerRoot,
  DatePickerTrigger,
  Label,
} from 'reka-ui'
import { ComboboxAnchor, ComboboxContent, ComboboxEmpty, ComboboxGroup, ComboboxInput, ComboboxItem, ComboboxItemIndicator, ComboboxLabel, ComboboxRoot, ComboboxSeparator, ComboboxTrigger, ComboboxViewport } from 'reka-ui'
import {useTasksStore} from "@/stores/tasks.js";

const {addTask, loader} = useTasksStore()


const options = [
  { name: 'Приоитет', children: [
      { name: 'Низкий' },
      { name: 'Средний' },
      { name: 'Высокий' }
    ] }
]

const task = ref({
  name: '',
  description: '',
  deadline: '',
  priority: 'Средний',
  list: 'todo'
})


const error = ref('')

const authStore = useAuthStore()

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

const createTask = () => {
  if (!task.value.name || !task.value.description || !task.value.deadline) {
    return error.value = 'Заполните все поля'
  } else {
    error.value = ''
    console.log(task.value)
    addTask(task.value)
    handleClick()
  }
  task.value = {
    name: '',
    description: '',
    priority: 'Средний',
  }
}

</script>




