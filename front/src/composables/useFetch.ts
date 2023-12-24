import { baseurl } from '../config/index'
import type { Result } from '../../../share/types/global'
import { useUserStore } from '../stores/user'

interface UseFetchParams {
  method?:
    | 'OPTIONS'
    | 'GET'
    | 'HEAD'
    | 'POST'
    | 'PUT'
    | 'DELETE'
    | 'TRACE'
    | 'CONNECT'
  body?: string | AnyObject | ArrayBuffer
  query?: string | AnyObject | ArrayBuffer
  header?: any
}

interface UseFetchOption<T> {
  default?: () => T
}

// 封装数据请求,参数也将重新映射,类似Nuxt的 useFetch 的参数
export default <T>(
  url: string,
  params: UseFetchParams,
  option?: UseFetchOption<T>
): Promise<Result<T>> => {
  // 开启 Loading
  uni.showLoading({
    title: '发起冲锋中...'
  })
  const userStore = useUserStore()
  return new Promise((resolve, reject) => {
    uni.request({
      url: `${baseurl}${url}`,
      data: params.body || params.query,
      method: params?.method,
      header: {
        // 携带 token
        Authorization: userStore.token && `Bearer ${userStore.token}`,
        ...params?.header
      },
      timeout: 5000,
      // 请求成功的回调
      success: (e) => {
        const result = e.data as Result<T>
        // 处理消息提示

        // 处理错误
        if (result.code !== 200) {
          uni.showToast({
            title: result.msg,
            duration: 2000,
            icon: 'error'
          })
          reject(false)
        }

        //将数据返回
        resolve(result)
      },

      //请求失败的回调
      fail: (err) => {
        uni.showToast({
          title: '请求失败,服务异常',
          icon: 'error'
        })
        reject(err)
      },
      complete: () => {
        uni.hideLoading()
      }
    })
  })
}
