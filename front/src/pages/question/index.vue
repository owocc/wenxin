<script setup lang="ts">
import Container from '@/components/Layout/Container.vue'
import NavBar from '@/components/Layout/NavBar.vue'
import useQuestion from '@/composables/useQuestion'
import Tabbar from '@/components/Layout/Tabbar.vue'
import type { QuestionDetail } from '../../../../share/types/result'
import useRouter from '@/composables/useRouter'

// 扩展QuestionDetail类型的 questions 字段
type QuestionExtend = {
  questions: {
    optionIds?: string[]
    answer?: string
  }[]
}

type QuestionDetailWithQuestions = QuestionExtend & QuestionDetail

const { fetchQuestionnaireDetail, fetchAnswerQuestionnaire } = useQuestion()

const data = ref<QuestionDetailWithQuestions | null>(null)

onLoad(async (option: any) => {
  const result = await fetchQuestionnaireDetail(option.id)
  // 为结果断言扩展后的类型
  data.value = result.data as QuestionDetailWithQuestions

  // 检查 data.value 是否不为空
  if (data.value) {
    for (let i = 0; i < data.value.questions.length; i++) {
      const question = data.value.questions[i]
      if (question.type === 1 || question.type === 2) {
        question.optionIds = []
      } else {
        question.answer = ''
      }
    }
  }
})

// 数据提交
const handlerSubmit = () => {
  if (!data.value) return

  //判断是否有空的题目,遍历
  for (let i = 0; i < data.value.questions.length; i++) {
    const question = data.value.questions[i]
    if (question.type === 1 || question.type === 2) {
      if (question.optionIds?.length === 0) {
        return uni.showToast({
          title: '请完成所有题目',
          icon: 'none'
        })
      }
    } else {
      if (!question.answer) {
        return uni.showToast({
          title: '请完成所有题目',
          icon: 'none'
        })
      }
    }
  }

  const answers = data.value.questions.map((item) => {
    if (item.type === 1 || item.type === 2) {
      return {
        questionId: item.id,
        optionIds: item.optionIds,
        type: item.type
      }
    } else {
      return {
        questionId: item.id,
        answer: item.answer,
        type: item.type
      }
    }
  })

  const { useBackToHome } = useRouter()
  // 提示用户是否提交
  uni.showModal({
    title: '提示',
    content: '是否提交问卷',
    success: (res) => {
      if (res.confirm) {
        fetchAnswerQuestionnaire(answers)
        useBackToHome()
        uni.showToast({
          title: '提交成功',
          icon: 'success'
        })
      }
    }
  })
}

const handlerShare = () => {
  uni.showShareMenu({
    withShareTicket: true,
    menus: ['shareAppMessage', 'shareTimeline']
  })
}
</script>
<template>
  <Container pt>
    <NavBar title="问卷详情" back home />
    <view class="pb-24">
      <!-- 分享操作,生成小程序码 + 当前页面 -->

      <view>
        <!-- 问卷标题和描述卡片 -->
        <view class="bg-white rounded-lg p-4 mb-4">
          <view class="flex justify-between w-full">
            <text class="text-lg font-bold mb-2 flex-1">{{ data?.title }}</text>
            <text class="i-ph-share-duotone text-2xl" @click="handlerShare" />
          </view>
          <view class="text-sm text-gray-500 cursor-pointer">
            {{ data?.desc }}
          </view>
        </view>
      </view>

      <!-- 遍历题目,让用户选择,根据不同题型不同样式,1,2是单选和多选,3是填空 -->
      <view>
        <view v-for="(item, index) in data?.questions" :key="index">
          <view class="bg-white rounded-lg p-4 mb-4">
            <view class="text-lg font-bold mb-2">{{ item.title }}</view>
            <view class="text-sm text-gray-500">
              <!-- 遍历options,让他有单选和多选不同状态 -->
              <template v-if="item.type === 1">
                <radio-group
                  class="flex flex-col gap-3"
                  @change="(e: any) => (item.optionIds = [e.detail.value])">
                  <label v-for="sing in item.options" :key="sing.id">
                    <radio :value="sing.id" />
                    {{ sing.title }}
                  </label>
                </radio-group>
              </template>

              <!-- 多选 -->
              <template v-if="item.type === 2">
                <checkbox-group
                  class="flex flex-col gap-3"
                  @change="(e: any) => (item.optionIds = e.detail.value)">
                  <label v-for="mut in item.options" :key="mut.id">
                    <checkbox :value="mut.id" />
                    {{ mut.title }}
                  </label>
                </checkbox-group>
              </template>

              <template v-if="item.type === 3">
                <view
                  class="border rounded-md border-gray-200 focus-within:border-orange-500 transition-all">
                  <input
                    v-model="item.answer"
                    placeholder="请输入你的回答"
                    class="px-2 py-3 w-full h-full" />
                </view>
              </template>
            </view>
          </view>
        </view>
      </view>
    </view>

    <!-- 提交按钮 -->
    <Tabbar>
      <button
        @click="handlerSubmit"
        class="w-full rounded-full after:border-none bg-orange-500 text-white active:bg-orange-600 transition-all">
        提交
      </button>
    </Tabbar>
  </Container>
</template>
