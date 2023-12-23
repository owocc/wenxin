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
        title="单选投票"
        to="/pages/create/qna"
        desc="创建一个单选投票" />
    </view>
    <!-- <view class="col-span-4 h-40">
      <MenuItem
        box-class="from-orange-500 to-orange-300 bg-gradient-to-tr"
        icon="i-ph-file-image"
        title="图文单选投票"
        desc="创建带图文的单选投票" />
    </view> -->
    <view class="col-span-4 h-40">
      <MenuItem
        box-class="from-rose-500 to-rose-300 bg-gradient-to-tr"
        icon="i-ph-list-checks"
        title="多选投票"
        to="/pages/create/qna"
        desc="创建多选投票" />
    </view>
    <!-- <view class="col-span-4 h-40">
      <MenuItem
        box-class="from-teal-500 to-teal-400 bg-gradient-to-tr"
        icon="i-ph-images"
        title="图文多选投票"
        desc="创建带图文的多选投票" />
    </view> -->
  </view>
</template>
<script setup lang="ts">
import MenuItem from './MenuItem.vue'
</script>
