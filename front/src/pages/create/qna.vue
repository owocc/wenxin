<!-- 创建问卷调查页面 -->
<!-- Questionnaire -->
<script setup lang="ts">
import NavBar from '@/components/Layout/NavBar.vue'
import Container from '@/components/Layout/Container.vue'
import Question from './components/Question/index.vue'
import FromButton from './components/Form/Button.vue'
import QuestionTitle from './components/Question/Title.vue'
import Tabbar from '@/components/Layout/Tabbar.vue'

interface QuestionItem {
  title: string
  items: any[]
}

interface Question {
  key: any
  questions: QuestionItem[]
}

const questions = ref<Question[]>([])

const handlerAddQuestion = () => {
  questions.value.push({
    key: Math.random(),
    questions: []
  })
}
</script>
<template>
  <Container pt>
    <NavBar back title="创建问卷" />
    <view class="flex flex-col gap-y-4 pb-32">
      <QuestionTitle />
      <view
        v-if="questions.length <= 0"
        class="flex  bg-white/80 p-4 rounded-lg flex-col items-center justify-center gap-4 text-gray-500">
        <view
          class="p-8  rounded-md border-gray-500 border border-dashed flex flex-col items-center justify-center">
          <span class="i-ph-plus-square-duotone text-2xl"></span>
        </view>
        还没有问题呢,点击下方的按钮添加吧
      </view>
      <template v-else>
        <Question
          v-for="(item, index) in questions"
          :index="index"
          :key="item.key"
          :questions="item" />
      </template>
      <view>
        <FromButton @click="handlerAddQuestion" label="添加问题" />
      </view>
    </view>
    <Tabbar>
      <FromButton label="确定" />
    </Tabbar>
  </Container>
</template>
