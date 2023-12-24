<script lang="ts" setup>
import { ref } from 'vue'
import Container from '@/components/Layout/Container.vue'
import NavBar from '@/components/Layout/NavBar.vue'
import { useUserStore } from '@/stores/user'
import Avatar from '@/components/UI/Avatar.vue'
import useUser from '@/composables/useUser'
import useRouter from '@/composables/useRouter'

const userStore = useUserStore()
const { updateAvatar, updateUserInfo } = useUser()

// 取出用户名称,防止直接修改 store 中的数据
const name = ref(userStore.user.name)

const handlerSave = async () => {
  await updateUserInfo({
    name: name.value
  })
  const { useNavigateBack } = useRouter()
  useNavigateBack()

  uni.showToast({
    title: '修改成功',
    icon: 'success'
  })
}
</script>

<template>
  <Container pt>
    <NavBar back title="个人信息编辑" />

    <view class="w-full flex items-center justify-center pt-12 flex-col gap-4">
      <view class="w-24 h-24 relative">
        <Avatar />
        <button
          @chooseavatar="updateAvatar"
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
            @blur="
              (e) => {
                // @ts-ignore
                name = e.target.value
              }
            "
            placeholder="请输入昵称"
            v-model="name" />
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
