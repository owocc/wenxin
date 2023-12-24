<script setup lang="ts">
import Container from '@/components/Layout/Container.vue'
import Navbar from '@/components/Layout/NavBar.vue'
import useQuestion from '@/composables/useQuestion'
import type { StaticDetail } from '../../../../share/types/result'
import useRouter from '@/composables/useRouter'
const questionType = ['单选', '多选', '填空']
const { fetchStatisticDetail } = useQuestion()
const data = ref<Partial<StaticDetail> | undefined>({
  questions: []
})

const { useBackToHome, useNavigateTo } = useRouter()
onLoad(async (option: any) => {
  try {
    const res = await fetchStatisticDetail(option.id)
    data.value = res.data
  } catch (e) {
    uni.showToast({
      title: '获取数据失败',
      icon: 'none'
    })

    useBackToHome()
  }
})
// 查看填空题统计
const handlerBlankDetail = (id: string) => {
  useNavigateTo(`/pages/detail/blank?id=${id}`)
}
</script>
<template>
  <Container pt>
    <Navbar title="数据统计" back home />

    <view class="flex flex-col gap-4 pb-40">
      <view class="bg-white rounded-lg p-4 flex flex-col dark:bg-gray-800">
        <view class="flex justify-between w-full">
          <text class="text-lg font-bold mb-2 flex-1">{{ data?.title }}</text>
          <button
            open-type="share"
            class="i-ph-shooting-star-duotone text-2xl" />
        </view>
        <text class="text-sm text-gray-500 cursor-pointer">
          {{ data?.desc }}
        </text>
        <text class="text-sm text-gray-400 mt-2">
          共
          <text class="text-orange-500 font-bold">{{ data?.coutn || 0 }}</text>
          名用户回答了该问卷
        </text>
      </view>

      <view
        class="w-full bg-white flex rounded-lg flex-col p-4 dark:bg-gray-800"
        v-for="question in data?.questions"
        :key="question.id">
        <view
          class="pb-3 border-b mb-3 border-gray-300 border-dashed w-full justify-between flex items-center gap-2">
          <view class="text-left w-full flex-1">
            <text class="font-bold text-lg">
              {{ question.title }}
            </text>
          </view>

          <view class="flex gap-2">
            <view
              class="bg-orange-50 border-orange-300 text-orange-500 border rounded-full px-3 py-1 text-sm items-center flex dark:bg-orange-900">
              <text>{{ questionType[question.type - 1] }}</text>
            </view>

            <!-- 题目回答人数 -->
            <view
              class="flex items-center gap-2 rounded-full bg-orange-50 py-1 px-3 border border-orange-300 text-orange-500 text-sm dark:bg-orange-900">
              <text class="i-ph-user-duotone" />
              <text class="font-bold">{{ question.count }}</text>
            </view>
          </view>
        </view>
        <template v-if="question.type === 3">
          <button
            @click="handlerBlankDetail(question.id)"
            class="w-full bg-orange-50 after:border-orange-500 text-orange-500 rounded-full after:rounded-full active:scale-95 transition-all dark:bg-orange-900">
            点击查看填空问题统计
          </button>
        </template>
        <template v-else>
          <view class="flex flex-col gap-2">
            <view
              class="w-full"
              v-for="option in question.options"
              :key="option.id">
              <text>{{ option.title }}</text>
              <progress
                :percent="option.percent"
                show-info
                stroke-width="3"
                class="w-full" />
            </view>
          </view>
        </template>
      </view>
    </view>
  </Container>
</template>
