<template>
  <view :class="itemClasses" @click="handlerGoto">
    <view class="flex items-center gap-2">
      <text class="text-xl" :class="props.icon" />
      <text>{{ props.text }}</text>
    </view>
    <text />
  </view>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import clsx from 'clsx'
import useRouter from '@/composables/useRouter'

// 样式
const itemClasses = computed(() =>
  clsx(
    'w-full p-3 rounded-md flex justify-between border ',
    'bg-gray-50 border-gray-800',
    'dark:bg-gray-700 dark:border-gray-500',
    'active:scale-95 transition-transform ease-out active:bg-orange-50 dark:active:bg-gray-600'
  )
)
interface OptionMenuProps {
  text: string
  icon: string
  to?: string
}
const props = defineProps<OptionMenuProps>()
const emit = defineEmits(['click'])
const { useNavigateTo } = useRouter()
const handlerGoto = () => {
  if (props.to) {
    useNavigateTo(props.to)
    return
  }
  emit('click')
}
</script>
