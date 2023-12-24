<!-- 维护选项的添加和删除 -->
<script setup lang="ts">
import QuestionItme from './QuestionItem.vue'
import type { OptionDto, QuestionsDto } from '../../../../../../share/types/dto'
const props = defineProps<{ options: OptionDto[] }>()
provide('options', props.options)
</script>
<template>
  <view class="flex flex-col gap-4 mt-6">
    <QuestionItme
      :option="option"
      :index="index"
      :key="index"
      v-for="(option, index) in props.options" />
  </view>
</template>
