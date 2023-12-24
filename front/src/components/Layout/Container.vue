<template>
  <view :class="pageClasses" :style="props.pt ? topPaddingStyle() : {}">
    <view :class="props.pt ? 'pt-20' : ''">
      <slot />
    </view>
  </view>
</template>

<script lang="ts" setup>
import useSafeAreaInsets from '@/composables/useSafeAreaInsets'
import useStyle from '@/composables/useStyle'
import clsx from 'clsx'

interface ContainerProps {
  pt?: boolean
}
const props = defineProps<ContainerProps>()
const { pageBackGround, pageBaseClasses } = useStyle()
const { topPaddingStyle } = useSafeAreaInsets()
const pageClasses = computed(() =>
  clsx(pageBackGround, pageBaseClasses, 'px-4 relative')
)
</script>
