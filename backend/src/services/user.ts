import prisma from '../lib/db'

/**
 * 用户相关 services
 */

// 根据微信openId 查找用户
export const findUserByOpenId = (openId: string) => {
  return prisma.user.findUnique({
    where: {
      openId,
    },
  })
}

/**
 * 根据 openId 创建用户
 * @param openId 微信开放ID
 * @returns 新用户
 */
export const createUserByOpenId = (openId: string) => {
  return prisma.user.create({
    data: {
      openId,
      name: '微信用户',
      avatar:
        'https://thirdwx.qlogo.cn/mmopen/vi_32/POgEwh4mIHO4nibH0KlMECNjjGxQUq24ZEaGT4poC6icRiccVGKSyXwibcPq4BWmiaIGuG1icwxaQX6grC9VemZoJ8rg/132',
    },
  })
}
