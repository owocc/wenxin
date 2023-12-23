<script setup lang="ts">
import Header from './Header.vue'
import QuestionItemList from '../Form/QuestionItemList.vue'

interface QuestionItem {
  title: string
  items: any[]
}

interface Question {
  key: any
  questions: QuestionItem[]
}

interface QuestionProps {
  index: number
  questions: Question
}
const props = withDefaults(defineProps<QuestionProps>(), {
  index: 0
})
</script>
<template>
  <view class="bg-white/80 p-4 rounded-lg">
    <!-- 问题顶部栏 -->
    <Header :index="props.index" />
    <!-- 空状态 -->
    <view></view>
    <QuestionItemList :questions="props.questions.questions" />
  </view>
</template>
