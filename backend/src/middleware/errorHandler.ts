import { ErrorRequestHandler } from 'express'
import config from '../config'

/**
 * 500 response & log when errors are raised.
 */
const errorHandler: ErrorRequestHandler = (err, _req, res) => {
    console.error(err);
    return res.status(500).json({
        message: config.nodeEnv === 'production' ?
            '未知错误' :
            `${err}`
    })
}

export default errorHandler
