<template>
  <view class="flex flex-col gap-2">
    <OptionMenuItem
      text="问卷管理"
      icon="i-ph-cards-duotone"
      to="/pages/manage/index" />
    <OptionMenuItem
      text="数据统计"
      icon="i-ph-chart-bar-duotone"
      to="/pages/statistic/index" />

    <OptionMenuItem
      v-if="userStore.isLogin"
      text="退出登录"
      icon="i-ph-sign-out-duotone"
      @click="handlerLogout" />
  </view>
</template>

<script setup lang="ts">
import { useUserStore } from '@/stores/user'
import OptionMenuItem from './item.vue'
import { useQuestionStore } from '@/stores/question'
const userStore = useUserStore()
const questionStore = useQuestionStore()
const handlerLogout = () => {
  uni.showModal({
    title: '提示',
    content: '确定要退出登录吗？',
    success: (res) => {
      if (res.confirm) {
        userStore.user = {
          name: '未登录'
        }
        userStore.token = null
        questionStore.questionnaire = {
          title: '',
          desc: '',
          questions: []
        }
        uni.showToast({
          title: '退出登录成功',
          icon: 'success'
        })
      }
    }
  })
}
</script>
