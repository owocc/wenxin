<template>
  <view
    class="w-screen bg-white dark:bg-slate-800 dark:border-slate-700 border-t border-gray-200 fixed bottom-0 left-0 flex justify-around pt-4 z-50 px-4 gap-4"
    :style="bottomPaddingStyle()">
    <slot />
  </view>
</template>
<script setup lang="ts">
import useSafeAreaInsets from '@/composables/useSafeAreaInsets'

// 获取安全区域
const { bottomPaddingStyle } = useSafeAreaInsets()

const props = withDefaults(defineProps<{ currentIndex: number }>(), {
  currentIndex: 0
})
</script>
