<!-- 维护选项的添加和删除 -->
<script setup lang="ts">
import QuestionItme from './QuestionItem.vue'
interface QuestionItem {
  title: string
  items: any[]
}
const props = defineProps<{ questions: QuestionItem[] }>()

const handlerAddQuestionItem = () => {
  props.questions.push({
    key: Math.random(),
  })
}
</script>
<template>
  <view class="flex flex-col gap-4">
    <QuestionItme
      :index="index"
      :key="item.key"
      v-for="(item, index) in props.questions" />

    <!-- 操作选项 -->
    <view class="flex w-full items-center justify-center">
      <button
      @click="handlerAddQuestionItem"
        class="flex items-center justify-center py-2 px-4 gap-1 m-0 rounded-full after:rounded-full text-gray-600 active:text-orange-600 active:after:border-orange-600 active:bg-orange-50 transition-all after:transition-all active:scale-95 text-base"
        hover-class="none">
        <text class="i-ph-plus-circle-duotone"></text>
        <text>添加选项</text>
      </button>
    </view>
  </view>
</template>
