<script setup lang="ts">
import FormInput from '../Form/Input.vue'
interface QuestionHeaderProps {
  index: number
}
const props = withDefaults(defineProps<QuestionHeaderProps>(), {
  index: 0
})
</script>
<template>
  <view
    class="flex flex-col gap-6 pb-6 border-b border-dashed border-gray-300 mb-6">
    <view class="flex justify-between w-full relative">
      <!-- 左侧显示 -->
      <view class="flex items-center gap-2">
        <view
          class="py-1 px-3 text-sm border rounded-full bg-orange-100 border-orange-500 text-orange-500">
          <text class="">多选</text>
        </view>
      </view>

      <!-- 标题显示 -->
      <view class="absolute w-full -z-0 text-center">
        <text class="font-bold text-lg">问题 {{ props.index + 1 }}</text>
      </view>

      <!-- 右侧操作 -->
      <view>
        <checkbox>必答</checkbox>
      </view>
    </view>

    <FormInput placeholder="请输入问题,小于100字" />
  </view>
</template>
