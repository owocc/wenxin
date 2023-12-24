import useFetch from './useFetch'
import useUpload from './useUpload'
import { useUserStore } from '../stores/user'
import { User } from '../../../share/prisma/client'
export default () => {
  const userStore = useUserStore()
  /**
   * 更新用户头像
   * @param result
   */
  const updateAvatar = async (result: any) => {
    const { upload } = useUpload()
    const filename = await upload(result.detail.avatarUrl as string)
    //请求更新用户头像
    await updateUserInfo({
      avatar: filename
    })
    //更新用户信息
    await getUserInfo()
  }

  /**
   * 获取用户信息,并更新 stroe 的 user 信息
   */
  const getUserInfo = async () => {
    const { data } = await useFetch<User>('/user', {
      method: 'GET'
    })
    userStore.setUser(data!)
  }

  /**
   * 更新用户信息,可以部分更新,比如只更新昵称
   * @param newUserData
   */
  const updateUserInfo = async (newUserData: Partial<User>) => {
    await useFetch('/user', {
      method: 'PUT',
      body: newUserData
    })
    await getUserInfo()
  }

  return {
    updateAvatar,
    getUserInfo,
    updateUserInfo
  }
}
