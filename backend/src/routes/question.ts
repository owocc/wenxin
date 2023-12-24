import express from 'express'
import { readToken } from '../utils/jwt'
import {
  createQuestionnaire,
  findQuestionnaireById,
} from '../services/question'
import { Result } from '../pojo/Result'
const question = express.Router()

question.post('/', async (req, res) => {
  const { payload } = readToken(req)
  try {
    const result = await createQuestionnaire(payload!, req.body.questionnaire)
    res.json(Result.success(result.id, '创建成功'))
  } catch (e) {
    res.json(Result.fail(500, '创建失败'))
  }
})

question.get('/:id', async (req, res) => {
  try {
    const result = await findQuestionnaireById(req.params.id)
    if (result === null) {
      res.json(Result.fail(404, '问卷不存在'))
      return
    }
    res.json(Result.success(result, '获取成功'))
  } catch (e) {
    res.json(Result.fail(500, '获取失败'))
  }
})

export default question
