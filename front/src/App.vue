<script setup lang="ts">
onLaunch(() => {
  console.log('App Launch')
  uni.hideTabBar()
})
onShow(() => {
  console.log('App Show')
  uni.hideTabBar()
})
onHide(() => {
  console.log('App Hide')
})
</script>
<style lang="scss">
@import 'tailwindcss/base';
@import 'tailwindcss/components';
@import 'tailwindcss/utilities';
@import 'nutui-uniapp/styles/index';
</style>
