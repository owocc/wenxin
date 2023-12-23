// 用户登录所需参数
export type UserLoginDto = {
  code: string
}

// 微信请求登录返回数据
export interface Code2SessionResult {
  openid?: string
  session_key: string
  errcode?: number
  errmsg: string
}

// jwt payload 类型
export interface JwtPayload {
  userId: string
  openId: string
  iat: number
}

// jwt 验证结果类型
export interface JwtVerifyResult {
  ok: boolean
  payload?: JwtPayload 
}

