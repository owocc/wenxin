<template>
  <view :class="menuItemClasses" @click="handlerGoToPage">
    <text
      class="text-5xl absolute right-2 bottom-2 z-40"
      :class="props.icon"></text>
    <text class="text-2xl text-white font-bold">{{ props.title }}</text>
    <text class="text text-gray-100">{{ props.desc }}</text>
  </view>
</template>

<script setup lang="ts">
import useRouter from '@/composables/useRouter'
import clsx from 'clsx'
interface MenuItemProps {
  boxClass: string
  icon?: string
  title: string
  desc: string
  to: string
}
const props = defineProps<MenuItemProps>()
const menuItemClasses = computed(() =>
  clsx(
    'w-full h-full rounded-2xl flex flex-col p-4  relative  text-white  active:scale-95 transition-all',
    props.boxClass
  )
)
const handlerGoToPage = () => {
  const { useNavigateTo } = useRouter()
  useNavigateTo(props.to)
}
</script>
