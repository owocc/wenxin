<script setup lang="ts">
import PageNavBar from '@/components/Layout/PageNavBar.vue'
import UserProfile from './components/UserProfile.vue'
import OptionMenuList from './components/OptionMenu/index.vue'
import Container from '@/components/Layout/Container.vue'
import PageTabBar from '@/components/Layout/PageTabbar/index.vue'
import { useUserStore } from '@/stores/user'
const userStore = useUserStore()
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
