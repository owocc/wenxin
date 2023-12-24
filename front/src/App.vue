<script setup lang="ts">
onLaunch(() => {
  uni.hideTabBar()
})
onShow(() => {
  uni.hideTabBar()
})
onHide(() => {})
</script>
<style lang="scss">
@import 'tailwindcss/base';
@import 'tailwindcss/components';
@import 'tailwindcss/utilities';
@import 'nutui-uniapp/styles/index';
</style>
