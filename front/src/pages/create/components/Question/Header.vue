<script setup lang="ts">
import {
  QuestionsDto,
  QuestionnaireCreateDto
} from '../../../../../../share/types/dto'
import FormInput from '../Form/Input.vue'
interface QuestionHeaderProps {
  index: number
  question: QuestionsDto
}
const props = withDefaults(defineProps<QuestionHeaderProps>(), {
  index: 0
})

const typeMap = ['单选', '多选', '填空']
const questions = inject<QuestionsDto[]>('questions')
const handlerDeleteQuestion = () => {
  uni.showModal({
    title: '提示',
    content: '确定要删除当前问题吗？',
    success: function (res) {
      if (res.confirm) {
        questions!.splice(props.index, 1)
      }
    }
  })
}
</script>
<template>
  <view class="flex flex-col gap-6 border-gray-300">
    <view class="flex justify-between w-full relative">
      <!-- 左侧显示 -->
      <view class="flex items-center gap-2">
        <view
          class="py-1 px-3 text-sm border rounded-full bg-orange-100 border-orange-500 text-orange-500 dark:bg-orange-500/20 dark:border-orange-800">
          <text class="">{{ typeMap[question.type! - 1] }}</text>
        </view>
        <text class="font-bold text-lg">问题 {{ props.index + 1 }}</text>
      </view>

      <!-- 右侧操作 -->
      <view class="flex items-center">
        <!-- 删除问题 -->
        <text
          class="i-ph-trash-duotone text-2xl text-gray-500"
          @click="handlerDeleteQuestion" />
      </view>
    </view>

    <FormInput
      placeholder="请输入问题,小于100字"
      v-model="props.question.title" />
  </view>
</template>
