<template>
  <view :class="tabPaneClasses">问卷列表</view>
</template>

<script lang="ts" setup>
import clsx from 'clsx'
interface TabPaneProps {
  active?: boolean
}
const props = defineProps<TabPaneProps>()
const tabPaneClasses = computed(() =>
  clsx(
    'text-center w-full rounded-full py-2 px-4  font-bold  text-orange-900 dark:text-gray-100',
    props.active &&
      'border bg-orange-100 dark:bg-gray-700  border-gray-900   dark:border-gray-500'
  )
)
</script>
