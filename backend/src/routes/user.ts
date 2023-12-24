import express from 'express'
import { readToken } from '../utils/jwt'
import { Result } from '../pojo/Result'
import { User } from '../../../share/prisma/client'
import { findUserById, updateUserById } from '../services/user'
const user = express.Router()

/**
 * 更新用户信息
 */
user.put('/', async (req, res) => {
  const { payload } = readToken(req)
  const data: Partial<User> = req.body as Partial<User>
  await updateUserById(payload!, data)
  res.json(Result.success(null, '更新成功'))
})

/**
 * 获取用户信息
 */
user.get('/', async (req, res) => {
  // 这里不需要处理 token 无效的情况，因为在 auth 的中间件中已经处理过了
  const { payload } = readToken(req)
  const user = await findUserById(payload!)
  res.json(Result.success(user, '获取成功'))
})

export default user
