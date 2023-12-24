import { sign, verify } from 'jsonwebtoken'
import type { User } from '../../../share/prisma/client'
import type { JwtPayload, JwtVerifyResult } from '../../../share/types/dto'
import config from '../config'
import type { Request } from 'express'
// 生成和验证 jwt 的工具

/**
 * 为用户生成 token
 * @param user
 * @returns token 字符串
 */
export const generateToken = (user: User): string => {
  return sign(
    {
      userId: user.id,
      openId: user.openId,
    },
    config.secretKey!
  )
}

/**
 * 验证用户 token 是否有效
 * @param token
 * @returns
 */
export const verifyToken = (token: string): JwtVerifyResult => {
  try {
    const payload = verify(token, config.secretKey!)
    return {
      ok: true,
      payload: payload as JwtPayload,
    }
  } catch (e) {
    return {
      ok: false,
    }
  }
}

/**
 * 快捷的从请求头中获取 token 并验证
 * @param request
 * @returns
 */
export const readToken = (request: Request) => {
  const authorization = request.headers.authorization
  if (!authorization) {
    return {
      ok: false,
    }
  }
  //解析token
  const token = authorization.split(' ')[1]
  const verify = verifyToken(token)
  return verify
}
