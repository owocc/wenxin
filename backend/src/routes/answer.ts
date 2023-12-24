import express from 'express'
import { createAnswer } from '../services/answer'
import { AnswerDto } from '../../../share/types/dto'
import { readToken } from '../utils/jwt'
import { Result } from '../pojo/Result'
const answer = express.Router()

answer.post('/', async (req, res) => {
  try {
    const { payload } = readToken(req)
    const result = await createAnswer(payload!, req.body.answers as AnswerDto[])
    res.json(Result.success(result, '提交成功'))
  } catch (e) {
    res.json(Result.fail(500, '提交失败'))
  }
})

export default answer
