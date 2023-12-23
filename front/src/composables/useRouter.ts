// 重新封装 小程序的 router,将其封装为组合项
import { useUserStore } from '../stores/user'

export default function useRouter() {
  // 获取用户信息仓库,利用用户信息仓库来判断用户是否登录,并对路由进行拦截
  const userStore = useUserStore()
  const whiteList = ['/pages/account/login']
  /**
   *
   * @param url 路由链接
   * @param params 参数
   */
  const useNavigateTo = (url: string, params?: UniApp.NavigateToOptions) => {
    //判断路径是否不再百名单中,并且用户未登录,如果是,则跳转到登录页面
    if (!whiteList.includes(url) && !userStore.isLogin) {
      uni.showToast({
        title: '请登录使用',
        icon: 'error',
        duration: 500
      })
      setTimeout(() => {
        uni.navigateTo({
          url: '/pages/account/login'
        })
      }, 500)

      return
    }

    uni.navigateTo({
      ...params,
      url
    })
  }

  /**
   * 重定向路由
   * @param url 
   * @param params 
   */
  const useRedirectTo = (url: string, params?: UniApp.RedirectToOptions) => {
    uni.redirectTo({
      ...params,
      url
    })
  }
  const useSwitchTab = (url: string, params?: UniApp.SwitchTabOptions) => {
    uni.switchTab({
      ...params,
      url
    })
  }

  const useNavigateBack = (
    delta?: number,
    params?: UniApp.NavigateBackOptions
  ) => {
    uni.navigateBack({
      ...params,
      delta
    })
  }

  const useBackToHome = () => {
    useSwitchTab('/pages/index/index')
  }
  return {
    useNavigateTo,
    useRedirectTo,
    useSwitchTab,
    useNavigateBack,
    useBackToHome
  }
}
