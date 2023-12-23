import { defineStore } from 'pinia'
import type { Result } from '../../../share/types/global'
import { User } from '../../../share/prisma/client'
// 用户数据

export const useUserStore = defineStore(
  'user',
  () => {
    const user = ref<User | Partial<User>>({
      name: '未登录'
    })

    const token = ref<string | null>(null)
    /**
     * 设置用户信息
     * @param newUser
     */
    const setUser = (newUser: User) => {
      user.value = newUser
    }

    /**
     * 设置token数据
     * @param newToken
     */
    const setToken = (newToken: string) => {
      token.value = newToken
    }

    /**
     * 清除用户数据和token
     */
    const clearData = () => {
      token.value = null
      user.value = {
        name: '未登录'
      }
    }

    /**
     * 判断用户是否已经登录
     */
    const isLogin = computed(() => {
      return !!token.value
    })

    return {
      user,
      token,
      setUser,
      setToken,
      clearData,
      isLogin
    }
  },
  {
    unistorage: true
  }
)
