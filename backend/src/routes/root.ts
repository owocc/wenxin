import express from 'express'
import auth from './auth'
import upload from './media'
const root = express.Router()

root.get('/', (_req, res) => {
  res.send('欢迎访问 「问心调查」 API接口~')
})

root.use(auth)
root.use(upload)
export default root
