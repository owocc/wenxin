<script setup lang="ts">
import Container from '@/components/Layout/Container.vue'
import Navbar from '@/components/Layout/NavBar.vue'
import useQuestion from '@/composables/useQuestion'
import type { Questionnaire } from '../../../../share/prisma/client'
import useRouter from '@/composables/useRouter'
const { fetchQuestionnaireList, fetchDeleteQuestionnaire } = useQuestion()

const data = ref<Questionnaire[]>([])
onShow(async () => {
  const result = await fetchQuestionnaireList()
  data.value = result.data || []
})
// 限制最大标题长度
const MAX_TITLE_LENGTH = 15
const sliceTitle = (title: string) => {
  if (title.length > MAX_TITLE_LENGTH) {
    return title.slice(0, MAX_TITLE_LENGTH) + '...'
  }
  return title
}
const { useNavigateTo } = useRouter()
// 查看问卷详情
const viewQuestionnaire = (id: string) => {
  useNavigateTo(`/pages/detail/statistic?id=${id}`)
}
</script>
<template>
  <Container pt>
    <Navbar title="数据统计" back />
    <!-- 属性有 title 和 id,遍历data -->
    <scroll-view scroll-y style="height: 100%" class="pb-24">
      <view class="grid grid-cols-1 gap-2">
        <view
          class="p-4 bg-white border border-gray-950 rounded-md flex justify-between items-center dark:bg-gray-800 dark:border-gray-600"
          v-for="item in data"
          :key="item.id">
          <!-- 自己封装 -->
          <text>
            {{ sliceTitle(item.title) }}
          </text>
          <view class="flex items-center gap-4">
            <view
              @click="viewQuestionnaire(item.id)"
              class="rounded-full bg-gray-100 flex items-center justify-center p-2 border border-gray-950 text-gray-950 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 active:scale-95 transition-all">
              <text class="i-ph-presentation-chart-duotone text-xl" />
            </view>
          </view>
        </view>
      </view>
    </scroll-view>
  </Container>
</template>
