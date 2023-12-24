<script setup lang="ts">
import FormInput from './Input.vue'
import type { OptionDto } from '../../../../../../share/types/dto'

interface QuestionItemProps {
  index: number
  option: OptionDto
}
const props = withDefaults(defineProps<QuestionItemProps>(), {
  index: 0
})

// 获取当前顺序字母
const alphabeticalOrder = computed(() => {
  return String.fromCharCode(65 + props.index)
})
// 删除选项
const options = inject<OptionDto[]>('options')
const handlerDeleteOption = () => {
  // 判断是否是最后一个选项
  if (options!.length <= 2) {
    uni.showToast({
      title: '至少保留两个选项',
      icon: 'none'
    })
    return
  }
  // 删除选项
  options!.splice(props.index, 1)
}
</script>
<template>
  <view class="flex flex-col gap-4">
    <view class="flex justify-between items-center">
      <text class="text-gray-500 dark:text-gray-200">选项 {{ alphabeticalOrder }}</text>
      <text
        class="text-gray-500 i-ph-trash-duotone text-2xl"
        @click="handlerDeleteOption" />
    </view>
    <FormInput
      placeholder="请输入选项,小于 100 字"
      maxlength="100"
      v-model="props.option.title" />
  </view>
</template>
