<script lang="ts" setup>
import { ref } from 'vue'
import Container from '@/components/Layout/Container.vue'
import NavBar from '@/components/Layout/NavBar.vue'
import { useUserStore } from '@/stores/user'
import Avatar from '@/components/UI/Avatar.vue'
import { baseurl } from '../../config/index'
const userStore = useUserStore()

//用户头像
const nickname = ref('')
const handlerAvatarSelect = (result: any) => {
  // userStore.user.avatar = result.detail.avatarUrl
  console.log(result)
  uni.uploadFile({
    url: `${baseurl}/upload`,
    filePath: result.detail.avatarUrl,
    name: 'file'
  })
}

const handlerSave = () => {}
</script>

<template>
  <Container pt>
    <NavBar back title="个人信息编辑" />

    <view class="w-full flex items-center justify-center pt-12 flex-col gap-4">
      <image
        src="https://image-mocha.vercel.app/kbn.png"
        alt="" />
      <view class="w-24 h-24 relative">
        <Avatar />
        <button
          @chooseavatar="handlerAvatarSelect"
          open-type="chooseAvatar"
          class="dark:bg-gray-700 p-0 bg-gray-200 w-8 h-8 right-0 bottom-0 after:border-gray-800 after:border-2 after:rounded-full after:dark:border-gray-600 rounded-full flex items-center justify-center absolute">
          <text
            class="i-ph-camera-duotone text-lg dark:text-gray-200 text-gray-800" />
        </button>
      </view>

      <view class="w-3/4 flex flex-col gap-4 items-center justify-center">
        <view
          class="border w-full p-2 rounded-lg dark:bg-gray-800 border-gray-800 flex gap-1 dark:border-gray-600 items-center">
          <text class="i-ph-cursor-text-fill text-xl" />
          <text>昵称:</text>
          <input
            class="flex-1"
            type="nickname"
            placeholder="请输入昵称"
            v-model="nickname" />
        </view>

        <button
          @click="handlerSave"
          class="after:border-none rounded-full bg-orange-400 text-white dark:bg-orange-500 w-full active:scale-95 transition-all">
          保存
        </button>
      </view>
    </view>
  </Container>
</template>
