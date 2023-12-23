<template>
  <view
    class="w-screen bg-white dark:bg-slate-800 dark:border-slate-700 border-t border-gray-200 fixed bottom-0 left-0 flex justify-around pt-2 z-50"
    :style="bottomPaddingStyle()">
    <NavigationItem
      :icon="item.icon"
      :text="item.text"
      :to="item.to"
      v-for="item in tabbarList"
      :index="item.index"
      :current-index="props.currentIndex"
      :select-icon="item.selectIcon"
      :key="item.to" />
  </view>
</template>
<script setup lang="ts">
import useSafeAreaInsets from '@/composables/useSafeAreaInsets'
import NavigationItem from './Item.vue'
import useTabbarConfig from '@/composables/config/useTabbarConfig'
// 获取安全区域
const { bottomPaddingStyle } = useSafeAreaInsets()

const props = withDefaults(defineProps<{ currentIndex: number }>(), {
  currentIndex: 0
})

const { tabbarList } = useTabbarConfig()
</script>
