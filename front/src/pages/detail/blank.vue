<script setup lang="ts">
import Container from '@/components/Layout/Container.vue'
import NavBar from '@/components/Layout/NavBar.vue'
import useQuestion from '@/composables/useQuestion'
import type { BlankDetail } from '../../../../share/types/result'
import useRouter from '@/composables/useRouter'
import { baseurl } from '@/config'
const { fetchQuestionnaireBlankDetail } = useQuestion()

const data = ref<Partial<BlankDetail> | undefined>({
  answer: []
})
onLoad(async (option: any) => {
  try {
    const result = await fetchQuestionnaireBlankDetail(option.id)
    data.value = result.data
  } catch (e) {
    uni.showToast({
      title: '获取数据失败',
      icon: 'none'
    })
    const { useBackToHome } = useRouter()
    useBackToHome()
  }
})
</script>
<template>
  <Container pt>
    <NavBar title="填空详情" back home />
    <view class="pb-40 flex flex-col gap-4">
      <view class="w-full bg-white p-4 rounded-lg dark:bg-gray-800">
        <text class="text-lg font-bold text-gray-800 dark:text-gray-200">
          {{ data?.title }}
        </text>
      </view>
      <view
        class="w-full p-4 bg-white rounded-lg flex gap-4 dark:bg-gray-800 dark:text-gray-200 active:scale-95 dark:active:bg-gray-700 transition-all"
        v-for="blank in data?.answer"
        :key="blank.id">
        <view class="w-14 h-14 overflow-hidden rounded-md">
          <image
            :src="`${baseurl}/media/${blank.user.avatar}`"
            mode="scaleToFill"
            class="h-full w-full" />
        </view>
        <view class="flex flex-col flex-1 w-full">
          <text class="text-gray-500 font-medium dark:text-gray-400">
            {{ blank.user.name }}
          </text>
          <text class="text-lg break-all text-gray-800 dark:text-gray-200">
            {{ blank.answer }}
          </text>
        </view>
      </view>
    </view>
  </Container>
</template>
