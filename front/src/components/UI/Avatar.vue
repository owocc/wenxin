<!-- 封装用户头像,使其有默认头像 -->
<template>
  <view
    class="w-full h-full rounded-full overflow-hidden border border-gray-800 dark:border-gray-100 flex items-center justify-center">
    <template v-if="!userStore.user.avatar">
      <text
        class="i-ph-user-duotone text-2xl text-gray-800 dark:text-gray-100" />
    </template>
    <template v-else>
      <img
        :src="userStore.user.avatar"
        class="h-full w-full"
        mode="scaleToFill" />
    </template>
  </view>
</template>
<script setup lang="ts">
import { useUserStore } from '@/stores/user'
const userStore = useUserStore()
</script>
