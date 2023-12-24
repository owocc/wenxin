import { RequestHandler } from 'express'
import { Result } from '../pojo/Result'
import { verifyToken } from '../utils/jwt'

// 验证用户是否已经登录,登录才能访问api,有白名单
const whiteList = ['/login', '/upload', '/media']

// 一个express中间件
const auth: RequestHandler = (req, res, next) => {
  // 获取请求路径
  const url = req.url
  // 判断是否在白名单中,去除url中的 /api

  if (whiteList.includes(url.replace('/api', '')) || url === '/api') {
    // 在白名单中,直接放行
    next()
  } else {
    // 不在白名单中,判断是否登录
    const authorization = req.headers.authorization
    if (!authorization) {
      // 未登录,返回401
      res.status(401).json(Result.fail(401, '请先登录'))
      return
    }
    //解析token
    const token = authorization.split(' ')[1]
    const verify = verifyToken(token)
    // 验证token
    if (!verify.ok) {
      res.status(401).json(Result.fail(401, 'token验证失败'))
      return
    }
    // 已经登录,放行
    next()
  }
}
export default auth
