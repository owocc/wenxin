<script setup lang="ts">
import type { Questionnaire } from '../../../../../../share/prisma/client'
const props = defineProps<{
  questionnaire: Partial<Questionnaire>
}>()
</script>
<template>
  <view class="bg-white/80 p-4 rounded-lg dark:bg-gray-800">
    <input
      maxlength="40"
      placeholder="问卷标题 (限40字)"
      class="text-xl font-bold mb-4 h-10"
      v-model="props.questionnaire.title" />

    <textarea
      maxlength="-1"
      class="w-full"
      v-model="props.questionnaire.desc"
      placeholder="问卷描述信息"></textarea>
  </view>
</template>
