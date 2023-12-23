import packageJson from '../package.json'

/**
 * Pattern for config is:
 * key: process.env['KEY'] ?? default
 */
const config = {
  version: packageJson.version, // 从 package.json 中读取版本号
  name: packageJson.name, // 从 package.json 中读取项目名称
  description: packageJson.description, // 从 package.json 中读取项目描述

  nodeEnv: process.env['NODE_ENV'] ?? 'development', // 从环境变量中读取 NODE_ENV,如果没有则默认为 development
  port: process.env['PORT'] ?? 3000, // 从环境变量中读取 PORT,如果没有则默认为 3000

  clientCorsOrigins: {
    test: process.env['DEV_ORIGIN'] ?? '*',
    development: process.env['DEV_ORIGIN'] ?? '*',
    production: process.env['PROD_ORIGIN'] ?? 'none',
  },

  // 读取小程序配置
  appId: process.env.APP_ID,
  appSecret: process.env.APP_SECRET,
  secretKey: process.env.SECRET_KEY,
  uploadPath: process.env.UPLOAD_PATH,
}

export default config
