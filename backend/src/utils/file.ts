// 文件读写的相关工具函数
import fs from 'fs'
import path from 'path'
import config from '../config'
import type { File } from 'formidable'
import md5 from 'md5'
// 将临时文件移动到目标文件夹,目标文件夹是一个绝对路径

// 上传目录检查和创建
const uploadDir = () => {
  const dir = config.uploadPath!
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir)
  }
}
/**
 * 保存文件,并返回文件的相对路径
 * @param file
 * @returns
 */
export const saveFile = (file: File): string => {
  uploadDir()
  const { filepath, originalFilename } = file
  // 计算文件md5,将文件重命名为md5+后缀名保存
  const extname = path.extname(originalFilename!)
  // 读取文件内容,计算md5,并重命名文件
  const fileContent = fs.readFileSync(filepath)
  const md5Name = md5(fileContent) + extname
  const newPath = path.join(config.uploadPath!, md5Name)
  fs.renameSync(filepath, newPath)
  return md5Name
}
