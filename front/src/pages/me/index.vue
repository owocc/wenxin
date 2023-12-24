<script setup lang="ts">
import PageNavBar from '@/components/Layout/PageNavBar.vue'
import UserProfile from './components/UserProfile.vue'
import OptionMenuList from './components/OptionMenu/index.vue'
import Container from '@/components/Layout/Container.vue'
import PageTabBar from '@/components/Layout/PageTabbar/index.vue'
import useUser from '@/composables/useUser'
import { useUserStore } from '@/stores/user'
onLaunch(() => {
  uni.hideTabBar()
})
onShow(() => {
  uni.hideTabBar()
})
// 获取用户信息
onShow(async () => {
  const userStore = useUserStore()
  if (userStore.isLogin) {
    const { getUserInfo } = useUser()
    await getUserInfo()
  }
})
</script>
<template>
  <Container>
    <PageNavBar desc="我的信息" title="我的" />
    <view class="flex flex-col gap-3">
      <UserProfile />
      <OptionMenuList />
    </view>
    <PageTabBar :currentIndex="2" />
  </Container>
</template>
