<template>
  <view>
    <view
      class="w-full flex flex-col border text-white border-gray-600 mt-4 rounded-lg bg-gray-800 p-4">
      <text class="font-bold">测试数据</text>
      <text class="text-gray-400 break-all">{{ props.text }}</text>
    </view>
  </view>
</template>

<script setup lang="ts">
const props = defineProps<{ text?: string }>()

const emit = defineEmits(['handlerClick'])
</script>
