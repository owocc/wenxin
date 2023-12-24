import express from 'express'
import { readToken } from '../utils/jwt'
import {
  createQuestionnaire,
  deleteQuestionnaireById,
  findQuestionnaireById,
  findQuestionnaireByUserId,
  getBlankList,
} from '../services/question'
import { Result } from '../pojo/Result'
const question = express.Router()

/**
 * 创建问卷
 */
question.post('/', async (req, res) => {
  const { payload } = readToken(req)
  try {
    const result = await createQuestionnaire(payload!, req.body.questionnaire)
    res.json(Result.success(result.id, '创建成功'))
  } catch (e) {
    res.json(Result.fail(500, '创建失败'))
  }
})

// 获取问卷列表
question.get('/list', async (req, res) => {
  const { payload } = readToken(req)
  const data = await findQuestionnaireByUserId(payload!)
  res.json(Result.success(data, '获取成功'))
})

/**
 * 获取填空题列表
 */
question.get('/blank/:id', async (req, res) => {
  try {
    const result = await getBlankList(req.params.id)
    if (result === null) {
      res.json(Result.fail(404, '问卷不存在'))
      return
    }

    res.json(Result.success(result, '获取成功'))
  } catch (e) {
    res.json(Result.fail(500, '获取失败'))
  }
})

/**
 * 获取问卷
 */
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

question.delete('/:id', async (req, res) => {
  const { payload } = readToken(req)

  try {
    const result = await findQuestionnaireById(req.params.id)
    // 判断用户是否有权限删除
    if (result?.userId !== payload?.userId) {
      res.json(Result.fail(403, '无权限'))
      return
    }
    if (result === null) {
      res.json(Result.fail(404, '问卷不存在'))
      return
    }
    await deleteQuestionnaireById(result.id)
    res.json(Result.success(result, '删除成功'))
  } catch (e) {
    console.log(e)
    res.json(Result.fail(500, '删除失败'))
  }
})

export default question
