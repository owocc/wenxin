<template>
  <Container pt>
    <NavBar title="数据统计" back />
    <Tabs>
      <TabPane />
      <TabPane active />
    </Tabs>
    <view class="flex flex-1 flex-col relative pb-12">
      <view class="mt-4 rounded-lg bg-orange-50 flex-1 dark:bg-gray-800 p-4">
        <scroll-view scroll-y class="h-[500rpx]">
          <view class="h-12 w-full bg-red-800"></view>
          <view class="h-12 w-full bg-red-800"></view>
          <view class="h-12 w-full bg-red-800"></view>
          <view class="h-12 w-full bg-red-800"></view>
          <view class="h-12 w-full bg-red-800"></view>
          <view class="h-12 w-full bg-red-800"></view>
          <view class="h-12 w-full bg-red-800"></view>
          <view class="h-12 w-full bg-red-800"></view>
          <view class="h-12 w-full bg-red-800"></view>
          <view class="h-12 w-full bg-blue-800"></view>
          <view class="h-12 w-full bg-red-800"></view>
          <view class="h-12 w-full bg-red-800"></view>
          <view class="h-12 w-full bg-blue-800"></view>
          <view class="h-12 w-full bg-red-800"></view>
          <view class="h-12 w-full bg-blue-800"></view>
          <view class="h-12 w-full bg-red-800"></view>
          <view class="h-12 w-full bg-blue-800"></view>
          <view class="h-12 w-full bg-blue-800"></view>
          <view class="h-12 w-full bg-blue-800"></view>
          <view class="h-12 w-full bg-blue-800"></view>
        </scroll-view>
      </view>
    </view>
  </Container>
</template>

<script setup lang="ts">
import Container from '@/components/Layout/Container.vue'
import Tabs from './components/tabs/index.vue'
import TabPane from './components/tabs/TabPane.vue'
import NavBar from '@/components/Layout/NavBar.vue'

const state = reactive({
  tab11value: '0'
})
</script>
