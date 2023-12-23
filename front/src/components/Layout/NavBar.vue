<template>
  <view
    :style="topPaddingStyle()"
    class="items-center fixed top-0 bg-white left-0 w-full z-50 flex justify-between px-4 border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
    <view class="flex items-center py-4">
      <button
        @click="useNavigateBack()"
        :class="buttonBaseClasses"
        v-if="props.back">
        <text class="i-ph-caret-left text-2xl" />
      </button>
      <button
        @click="useBackToHome()"
        :class="buttonBaseClasses"
        v-if="props.home">
        <text class="i-ph-house text-2xl" />
      </button>
    </view>

    <view
      class="text-lg absolute left-0 text-center w-full -z-10 font-medium text-gray-700 dark:text-gray-100">
      {{ title }}
    </view>
  </view>
</template>
<script setup lang="ts">
import useRouter from '@/composables/useRouter'
import useSafeAreaInsets from '@/composables/useSafeAreaInsets'
const { topPaddingStyle } = useSafeAreaInsets()
const { useNavigateBack, useBackToHome } = useRouter()
const buttonBaseClasses =
  'pl-0 rounded-full after:border-none bg-transparent flex items-center justify-center'

interface NavBarProps {
  home?: boolean
  back?: boolean
  title?: string
}
const props = defineProps<NavBarProps>()
</script>
