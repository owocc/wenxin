import cookieParser from 'cookie-parser'
import cors from 'cors'
import express from 'express'
import helmet from 'helmet'
import morgan from 'morgan'
import auth from './middleware/auth'
import errorHandler from './middleware/errorHandler'
import fourOhFour from './middleware/fourOhFour'
import root from './routes/root'
import config from './config'

const app = express()

// Apply most middleware first
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
// 静态文件服务
app.use('/api/media', express.static(config.uploadPath!))
app.use(cors())

app.use(helmet())
app.use(morgan('tiny'))
app.use(auth)
// Apply routes before error handling
app.use('/api', root)

// Apply error handling last
app.use(fourOhFour)
app.use(errorHandler)

export default app
