import express from 'express'
import formidable, { type Fields, type Files } from 'formidable'
import { Result } from '../pojo/Result'
import { isEmpty } from 'lodash'
import { saveFile } from '../utils/file'
import config from '../config'
import mime from 'mime-types'
import cors from 'cors'

const media = express.Router()

/**
 * 上传文件
 */
media.post('/upload', async (req, res) => {
  const form = formidable({})

  const response = (await new Promise((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) {
        reject(err)
      }
      resolve({
        fields,
        files,
      })
    })
  })) as { fields: Fields<string>; files: Files }

  try {
    const { files } = response
    //判断是否有上传文件
    if (isEmpty(files)) {
      throw new Error()
    }
    // 读取文件
    const file = files['file']![0]
    // 将文件存储起来,并返回文件的相对路径
    const filename = saveFile(file)
    res.send(
      Result.success(
        {
          filename,
        },
        '上传成功'
      )
    )
  } catch (e) {
    res.send(Result.fail(400, '请上传文件'))
  }
})

// 根据文件的相对路径,返回文件的绝对路径

media.get('/media/:filename', cors(), (req, res) => {
  const { filename } = req.params as { filename: string }
  // 拼接文件的绝对路径
  const filepath = `${config.uploadPath}/${filename}`
  // 读取文件媒体类型,设置响应头

  res.sendFile(filepath, {
    headers: {
      'Content-Type': mime.contentType(filename),
    },
  })
})

export default media
