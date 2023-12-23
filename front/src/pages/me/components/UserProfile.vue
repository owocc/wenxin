<script setup lang="ts">
import Avatar from '@/components/UI/Avatar.vue'
import useRouter from '@/composables/useRouter'
import { useUserStore } from '@/stores/user'
const userStore = useUserStore()
const { useNavigateTo } = useRouter()
// 判断用户是否已登录,如果用户未登录跳转到登录页面,如果已经登录则进入编辑页面
const handlerGotoEditProfile = () => {
  if (!userStore.isLogin) {
    useNavigateTo('/pages/account/login')
    return
  }
  useNavigateTo('/pages/account/profile')
}
</script>
<template>
  <view
    class="w-full py-4 px-4 bg-gray-50 border border-gray-800 dark:bg-gray-700 dark:border-gray-500 rounded-lg"
    @click="handlerGotoEditProfile">
    <view class="flex items-center justify-between">
      <view class="flex gap-4 items-center">
        <view class="h-12 w-12">
          <Avatar />
        </view>
        <text class="text-lg text-gray-700 font-bold dark:text-white">
          {{ userStore.user.name }}
        </text>
      </view>
      <view class="flex items-center">
        <text class="i-ph-note-pencil-duotone text-xl"></text>
      </view>
    </view>
  </view>
</template>
