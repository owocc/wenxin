import type { Questionnaire, Question, Option, Answer } from '../prisma/client'
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

export type OptionDto = Partial<Option>

export interface QuestionsDto extends Partial<Question> {
  options: Partial<Option>[]
}

// 问卷创建Dto
export interface QuestionnaireCreateDto extends Partial<Questionnaire> {
  questions?: Partial<QuestionsDto>[]
}

export interface AnswerDto {
  questionId: string
  optionIds: string[]
  answer: string | null
  type: number
}
