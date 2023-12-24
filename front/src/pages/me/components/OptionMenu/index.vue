<template>
  <view class="flex flex-col gap-2">
    <OptionMenuItem text="问卷管理" icon="i-ph-cards-duotone" />
    <OptionMenuItem
      text="数据统计"
      icon="i-ph-chart-bar-duotone"
      to="/pages/statistic/index" />
  </view>
</template>

<script setup lang="ts">
import OptionMenuItem from './item.vue'
</script>
