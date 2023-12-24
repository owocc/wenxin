<script setup lang="ts">
import Container from '@/components/Layout/Container.vue'
import Navbar from '@/components/Layout/NavBar.vue'
import useQuestion from '@/composables/useQuestion'
import type { Questionnaire } from '../../../../share/prisma/client'
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

// 查看问卷详情
const viewQuestionnaire = (id: string) => {
  uni.navigateTo({
    url: `/pages/question/index?id=${id}`
  })
}
// 删除问卷
const deleteQuestionnaire = (id: string) => {
  uni.showModal({
    title: '提示',
    content: '确定删除该问卷吗?',
    success: async (res) => {
      if (res.confirm) {
        await fetchDeleteQuestionnaire(id)
        uni.showToast({
          title: '删除成功',
          icon: 'success'
        })
        // 重新获取列表
        const result = await fetchQuestionnaireList()
        data.value = result.data || []
      }
    }
  })
}
</script>
<template>
  <Container pt>
    <Navbar title="问卷管理" back />
    <!-- 渲染列表,点击可以查看详情,右滑可以删除 -->
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
              class="rounded-full bg-gray-100 flex items-center justify-center p-2 active:scale-95 transition-all border border-gray-950 text-gray-950 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-400">
              <text class="i-ph-eye-duotone text-xl" />
            </view>
            <view
              @click="deleteQuestionnaire(item.id)"
              class="rounded-full active:scale-95 transition-all bg-gray-100 flex items-center justify-center p-2 border border-gray-950 text-gray-950 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-400">
              <text class="i-ph-trash-simple-duotone text-xl" />
            </view>
          </view>
        </view>
      </view>
    </scroll-view>
  </Container>
</template>
