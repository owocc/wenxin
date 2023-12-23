import useFetch from './useFetch'
import type { UserLoginDto } from '../../../share/types/dto'
import type { authResult } from '../../../share/types/result'
import { useUserStore } from '../stores/user'
import useRouter from './useRouter'
/**
 * 用户认证相关API
 */

export default () => {
  // 用户信息
  const userStore = useUserStore()

  /**
   * 和服务器换取 token 和 user 信息
   * @param loginParams
   */
  const fetchAuthLogin = (loginParams: UserLoginDto) => {
    return useFetch<authResult>('/login', {
      method: 'POST',
      body: {
        code: loginParams.code
      }
    })
  }

  /**
   *  微信登录
   */
  const authLogin = () => {
    uni.login({
      provider: 'weixin',
      success: async (e) => {
        const { data, msg } = await fetchAuthLogin(e)
        userStore.setUser(data?.user!)
        userStore.setToken(data?.token!)
        // 进入用户资料编辑页面,让用户可以修改昵称,头像
        const { useRedirectTo } = useRouter()
        useRedirectTo('/pages/account/profile')
        uni.showToast({
          title: msg
        })
      }
    })
  }

  return {
    authLogin
  }
}
