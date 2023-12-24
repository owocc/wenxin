<!-- 创建问卷调查页面 -->
<!-- Questionnaire -->
<script setup lang="ts">
import NavBar from '@/components/Layout/NavBar.vue'
import Container from '@/components/Layout/Container.vue'
import Question from './components/Question/index.vue'
import FromButton from './components/Form/Button.vue'
import Tabbar from '@/components/Layout/Tabbar.vue'
import { useQuestionStore } from '@/stores/question'
import FormHeader from './components/Form/Header.vue'
import FormEmpty from './components/Form/Empty.vue'
import { QuestionsDto } from '../../../../share/types/dto'
import useQuestion from '@/composables/useQuestion'
import useRouter from '@/composables/useRouter'

// 问卷调查数据
const questionStore = useQuestionStore()

const questionType = ['单选', '多选', '填空']
// 将问题数据提供给子组件
provide('questions', questionStore.questionnaire.questions)
// 添加问题
const handlerAddQuestion = (e: any) => {
  const type = parseInt(e.detail.value) + 1

  const options =
    type === 3
      ? []
      : [
          {
            title: '',
            image: ''
          },
          {
            title: '',
            image: ''
          }
        ]
  questionStore.questionnaire.questions!.push({
    title: '',
    type,
    options
  })
}

// 清空问卷
const handlerClear = () => {
  uni.showModal({
    title: '提示',
    content: '确定要清空当前输入的内容吗？',
    success: function (res) {
      if (res.confirm) {
        questionStore.questionnaire = {
          title: '',
          desc: '',
          questions: []
        }
      }
    }
  })
}

const { fetchCreateQuestionnaire } = useQuestion()
// 提交问卷
const handlerSubmit = async () => {
  //判断标题是否为空,为空则不提交
  if (questionStore.questionnaire.title === '') {
    uni.showToast({
      title: '标题不能为空',
      icon: 'none'
    })
    return
  }

  //判断问卷是否为空,为空则不提交
  if (questionStore.questionnaire.questions!.length <= 0) {
    uni.showToast({
      title: '问卷不能为空',
      icon: 'none'
    })
    return
  }

  //遍历问卷,判断标题是否为空,还有选项是否至少有两个标题不为空的选项
  for (let i = 0; i < questionStore.questionnaire.questions!.length; i++) {
    if (questionStore.questionnaire.questions![i].title === '') {
      uni.showToast({
        title: '问题标题不能为空',
        icon: 'none'
      })
      return
    }
    if (
      questionStore.questionnaire.questions![i].options!.length < 2 &&
      questionStore.questionnaire.questions![i].type !== 3
    ) {
      uni.showToast({
        title: '问题选项不能少于两个',
        icon: 'none'
      })
      return
    }

    //遍历选项,判断选项标题是否为空
    for (
      let j = 0;
      j < questionStore.questionnaire.questions![i].options!.length;
      j++
    ) {
      if (
        questionStore.questionnaire.questions![i].options![j].title === '' &&
        questionStore.questionnaire.questions![i].type !== 3
      ) {
        uni.showToast({
          title: '选项标题不能为空',
          icon: 'none'
        })
        return
      }
    }
  }

  uni.showModal({
    title: '提示',
    content: '确定要提交吗？',
    success: async (res) => {
      if (res.confirm) {
        const result = await fetchCreateQuestionnaire(
          toRaw(questionStore.questionnaire)
        )

        // 提交成功后清空问卷
        questionStore.questionnaire = {
          title: '',
          desc: '',
          questions: []
        }

        //跳转到问卷详情页面
        const { useRedirectTo } = useRouter()

        useRedirectTo(`/pages/question/index?id=${result.data}`)

        // 提示提交成功
        uni.showToast({
          title: '提交成功',
          icon: 'success'
        })
      }
    }
  })
}
</script>
<template>
  <Container pt>
    <NavBar back title="创建问卷" />

    <view class="flex flex-col gap-y-4 pb-32">
      <!-- 问卷标题和描述编辑 -->
      <FormHeader :questionnaire="questionStore.questionnaire" />
      <template v-if="questionStore.questionnaire.questions!.length <= 0">
        <FormEmpty />
      </template>

      <template v-else>
        <Question
          :question="item as QuestionsDto"
          :key="Math.random()"
          v-for="(item, index) in questionStore.questionnaire.questions"
          :index="index" />
      </template>

      <!-- 添加问题选择器 -->
      <view class="flex flex-col gap-4">
        <picker
          mode="selector"
          @change="handlerAddQuestion"
          :range="questionType">
          <FromButton label="添加问题" />
        </picker>
      </view>
    </view>
    <Tabbar>
      <button
        @click="handlerClear"
        class="w-full rounded-full after:border-gray-200 after:rounded-full bg-gray-50 active:bg-gray-100 text-gray-500 transition-all">
        清空
      </button>

      <button
        @click="handlerSubmit"
        class="w-full rounded-full after:border-none bg-orange-500 text-white active:bg-orange-600 transition-all">
        确定
      </button>
    </Tabbar>
  </Container>
</template>
