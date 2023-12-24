import express from 'express'
import { getStatisticById } from '../services/statistic'
import { Result } from '../pojo/Result'

const statistic = express.Router()

statistic.get('/:id', async (req, res) => {
  try {
    const result = await getStatisticById(req.params.id)
    res.json(Result.success(result, '获取成功'))
  } catch (e) {
    res.json(Result.fail(500, '获取失败'))
  }
})

export default statistic
