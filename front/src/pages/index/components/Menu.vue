<template>
  <view class="grid grid-cols-8 w-full gap-2">
    <view class="col-span-8 h-24">
      <MenuItem
        box-class="from-green-500 to-green-300 bg-gradient-to-tr"
        icon="i-ph-file-plus"
        title="创建问卷"
        desc="创建一份问卷调查"
        to="/pages/create/qna" />
    </view>
    <view class="col-span-4 h-40">
      <MenuItem
        box-class="from-blue-700 to-blue-400 bg-gradient-to-tr"
        icon="i-ph-radio-button"
        title="数据统计"
        to="/pages/statistic/index"
        desc="查看问卷数据统计" />
    </view>

    <view class="col-span-4 h-40">
      <MenuItem
        box-class="from-rose-500 to-rose-300 bg-gradient-to-tr"
        icon="i-ph-database-duotone"
        title="问卷管理"
        to="/pages/manage/index"
        desc="快捷管理问卷" />
    </view>

    <!-- <view class="col-span-4 h-40">
      <MenuItem
        box-class="from-orange-500 to-orange-300 bg-gradient-to-tr"
        icon="i-ph-file-image"
        title="查看其他人发布的问卷"
        desc="其他人的问卷" />
    </view> -->
  </view>
</template>
<script setup lang="ts">
import MenuItem from './MenuItem.vue'
</script>
