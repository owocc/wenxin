<script setup lang="ts">
import useSafeAreaInsets from '@/composables/useSafeAreaInsets'

interface NavBarProps {
  title: string
  desc: string
}
const props = defineProps<NavBarProps>()
const { topPaddingStyle } = useSafeAreaInsets()
</script>

<template>
  <view
    class="w-full bg-transparent flex flex-col pb-4 sticky top-0 z-50"
    :style="topPaddingStyle()">
    <view class="flex items-center gap-2">
      <text
        class="i-ph-chart-line-duotone text-xl text-red-700 dark:text-red-300" />
      <text class="text-xl font-bold text-gray-700 dark:text-white">
        {{ props.title }}
      </text>
    </view>
    <text class="text-sm text-gray-400">{{ props.desc }}</text>
  </view>
</template>
