<script setup lang="ts">
import Header from './Header.vue'
import QuestionItemList from '../Form/QuestionItemList.vue'
import { QuestionsDto } from '../../../../../../share/types/dto'

interface QuestionsProps {
  index: number
  question: QuestionsDto
}

const props = withDefaults(defineProps<QuestionsProps>(), {
  index: 0
})

const handlerAddQuestionItem = () => {
  // 判断问题类型
  if (props.question.type === 3) return
  props.question.options.push({
    title: '',
    image: ''
  })
}
</script>
<template>
  <view class="bg-white/80 p-4 rounded-lg dark:bg-gray-800">
    <!-- 问题顶部栏 -->
    <Header :index="props.index" :question="props.question" />
    <!-- 空状态 -->
    <view></view>
    <QuestionItemList :options="props.question.options" />

    <template v-if="props.question.type != 3">
      <view class="flex w-full items-center justify-center mt-4">
        <button
          @click="handlerAddQuestionItem"
          class="flex items-center justify-center py-2 px-4 gap-1 m-0 rounded-full after:rounded-full text-gray-600 active:text-orange-600 active:after:border-orange-600 active:bg-orange-50 transition-all after:transition-all active:scale-95 text-base dark:bg-orange-400 dark:text-gray-100 dark:active:bg-orange-500 dark:active:text-gray-100 dark:active:after:border-orange-500 dark:active:scale-95"
          hover-class="none">
          <text class="i-ph-plus-circle-duotone"></text>
          <text>添加选项</text>
        </button>
      </view>
    </template>
  </view>
</template>
