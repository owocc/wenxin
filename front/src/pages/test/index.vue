<template>
  <Container>
    <PageNavBar desc="系统功能测试" title="功能测试" />
    <view class="px-2 flex flex-col gap-4">
      <Avatar />
      <button @click="goto">登录</button>
    </view>
    <PageTabbar :currentIndex="3" />
  </Container>
</template>


<script setup lang="ts">
import Container from '@/components/Layout/Container.vue'
import PageNavBar from '@/components/Layout/PageNavBar.vue'
import Avatar from '@/components/UI/Avatar.vue'
import PageTabbar from '@/components/Layout/PageTabbar/index.vue'

const goto = () => {
  uni.navigateTo({
    url: '/pages/account/login'
  })
}
</script>
