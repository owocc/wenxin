<script lang="ts" setup>
import useStyle from '@/composables/useStyle'
import clsx from 'clsx'
import useFetch from '@/composables/useFetch'
import useAuth from '@/composables/useAuth'

const { pageBackGround } = useStyle()

const pageClasses = clsx(
  'w-screen h-screen flex items-center flex-col px-8',
  pageBackGround
)
const buttonClasses = clsx(
  ' text-sm  py-3 items-center flex justify-center gap-2 text-white  w-full',
  'rounded-full',
  ' dark:bg-orange-600 bg-orange-500 after:border-none'
)
// 获取安全区域
const { safeAreaInsets } = uni.getSystemInfoSync()
const safeAreaStyle = {
  paddingTop: `${safeAreaInsets!.top + 120}px`
}

const { authLogin } = useAuth()
</script>
<template>
  <view :class="pageClasses" :style="safeAreaStyle">
    <view class="mb-12 flex justify-center items-center flex-col gap-4">
      <view
        class="h-24 w-24 dark:bg-red-300 rounded-full group active:scale-95 transition-all bg-gradient-to-tr from-orange-300 to-orange-500 flex items-center justify-center">
        <text class="i-ph-heartbeat text-6xl text-white" />
      </view>
      <text class="text-2xl text-gray-700 font-medium dark:text-white">
        问心调查
      </text>
    </view>

    <button :class="buttonClasses" @click="authLogin">
      <text class="i-ph-wechat-logo text-lg" />
      <text>微信一键登录</text>
    </button>

    <navigator open-type="navigateBack" class="text-sm mt-3 text-gray-500">
      但是我拒绝
    </navigator>
  </view>
</template>
