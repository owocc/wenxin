import { baseurl } from '../config'

export default () => {
  const upload = (filePath: string): Promise<string> => {
    //上传文件到服务器
    return new Promise((resolve, reject) => {
      uni.uploadFile({
        url: `${baseurl}/upload`,
        filePath: filePath,
        name: 'file',
        success(e) {
          resolve(e.data)
        },
        fail(e) {
          reject(e)
        }
      })
    })
  }

  return {
    upload
  }
}
