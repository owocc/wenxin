import express from 'express'
import auth from './auth'
import upload from './media'
import user from './user'
import question from './question'
import answer from './answer'
const root = express.Router()

root.get('/', (_req, res) => {
  res.send('欢迎访问 「问心调查」 API接口~')
})

root.use(auth)
root.use(upload)
root.use('/user', user)
root.use('/question', question)
root.use('/answer', answer)

export default root
