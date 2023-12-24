<script setup lang="ts">
import type { InputHTMLAttributes } from '@vue/runtime-dom/dist/runtime-dom'

interface FormInputProps extends InputHTMLAttributes {
  modelValue?: string
}
const props = defineProps<FormInputProps>()

const emit = defineEmits(['update:modelValue'])

// 处理v-model改变
const handlerInput = (event: Event) => {
  const element = event.target as HTMLInputElement
  emit('update:modelValue', element.value)
}
// const attrs = useAttrs()
</script>
<template>
  <view
    class="border focus-within:border-orange-600 transition-all border-gray-300 overflow-hidden rounded-md flex items-center justify-between dark:border-gray-600">
    <input
      class="p-4 w-full flex-1"
      :type="props.type"
      :placeholder="props.placeholder"
      :value="props.modelValue"
      :maxlength="props.maxlength || 100"
      @input="handlerInput" />

    <!-- <view class="pr-4 flex items-center justify-center">
      <button
        class="m-0 p-0 after:border-none bg-transparent flex items-center">
        <text class="i-ph-camera-duotone text-xl"></text>
      </button>
    </view> -->
  </view>
</template>
