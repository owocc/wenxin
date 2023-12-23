<template>
  <view :class="boxClasses" @click="handlerNavigation">
    <text :class="iconClasses"></text>
    <text class="text-sm">{{ props.text }}</text>
  </view>
</template>

<script setup lang="ts">
import useRouter from '@/composables/useRouter'
import clsx from 'clsx'
interface NavigateProps {
  icon: string
  selectIcon: string
  text: string
  to: string
  index: number
  currentIndex: number
}
const props = defineProps<NavigateProps>()
const handlerNavigation = () => {
  const { useSwitchTab } = useRouter()
  useSwitchTab(props.to)
}

const boxClasses = computed(() =>
  clsx(
    'flex flex-col items-center justify-center dark:text-white px-10 py-1 rounded-full border',
    props.index === props.currentIndex
      ? ' bg-orange-50 border-gray-800 dark:bg-gray-900 dark:border-gray-600'
      : ' border-transparent'
  )
)
//       `bg-orange-500  bg-gradient-to-tr from-orange-400 to-orange-300 shadow-md
// text-white dark:bg-orange-600 dark:from-orange-700 dark:to-orange-500`
const iconClasses = computed(() =>
  clsx(
    'text-xl ',
    props.index === props.currentIndex ? props.selectIcon : props.icon,
    props.currentIndex === props.index ? '' : 'text-black dark:text-white'
  )
)
</script>
