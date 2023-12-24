<script setup lang="ts">
interface FormButtonProps {
  label?: string
}
const props = defineProps<FormButtonProps>()
const emit = defineEmits(['click'])
</script>
<template>
  <view>
    <button
      @click="emit('click')"
      class="after:border-none transition-all text-orange-600 bg-white/80 active:bg-white active:scale-95 dark:bg-gray-800 active:shadow-lg active:shadow-gray-100 rounded-lg dark:active:bg-gray-700 dark:active:shadow-none">
      <slot>
        {{ props.label }}
      </slot>
    </button>
  </view>
</template>
