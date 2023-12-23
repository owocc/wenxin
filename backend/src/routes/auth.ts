import express from 'express'
import { Code2SessionResult, UserLoginDto } from '../../../share/types/dto'
import config from '../config'
import { findUserByOpenId, createUserByOpenId } from '../services/user'
import { isNull } from 'lodash'
import { generateToken } from '../utils/jwt'
import { Result } from '../pojo/Result'

const auth = express.Router()
/**
 *  用户登录逻辑,微信小程序
 */
auth.post('/login', async (req, res) => {
  // 读取用户传递过来的微信小程序 code
  const body = req.body as UserLoginDto
  console.log(body.code)
  const query = new URLSearchParams()
  query.append('appid', config.appId!)
  query.append('secret', config.appSecret!)
  query.append('grant_type', 'authorization_code')
  query.append('js_code', body.code)

  // 向微信服务器发送请求，获取 openid 和 session_key
  const wxRes: Code2SessionResult = await fetch(
    `https://api.weixin.qq.com/sns/jscode2session?${query.toString()}`,
    {
      method: 'GET',
    }
  ).then((res) => res.json())

  // 判断是否请求成功
  if (wxRes.errcode) {
    res.send(Result.fail(400, '登录失败')).json()
    return
  }

  // 根据 openid 查找用户是否存在
  let user = await findUserByOpenId(wxRes.openid!)

  // 如果用户不存在，则创建用户
  if (isNull(user)) {
    user = await createUserByOpenId(wxRes.openid!)
  }

  // 生成 token
  const token = generateToken(user)

  // 返回用户信息和 token
  res
    .send(
      Result.success(
        {
          token,
          user,
        },
        '登录成功'
      )
    )
    .json()
})

//oO22U5JURKQUaZRHYhVEqGMd0A0U
//oO22U5JURKQUaZRHYhVEqGMd0A0U

// 用户2 openid
// oO22U5GykUTC_VxC9NV_e4i8phPM

export default auth
