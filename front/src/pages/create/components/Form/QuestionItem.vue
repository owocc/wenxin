<script setup lang="ts">
import FormInput from './Input.vue'
interface QuestionItemProps {
  index: number
}
const props = withDefaults(defineProps<QuestionItemProps>(), {
  index: 0
})

// 获取当前顺序字母
const alphabeticalOrder = computed(() => {
  return String.fromCharCode(65 + props.index)
})
</script>
<template>
  <view class="flex flex-col gap-4">
    <text class="text-gray-500">选项 {{ alphabeticalOrder }}</text>
    <FormInput placeholder="请输入选项,小于 100 字" maxlength="100" />
  </view>
</template>
