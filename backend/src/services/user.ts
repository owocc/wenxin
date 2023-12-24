import prisma from '../lib/db'
import { User } from '../../../share/prisma/client'
import { JwtPayload } from '../../../share/types/dto'
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
      avatar: 'default.jpg',
    },
  })
}
/**
 * 根据用户id更新用户信息
 * @param user
 * @param data
 */
export const updateUserById = (user: JwtPayload, data: Partial<User>) => {
  return prisma.user.update({
    where: {
      id: user.userId,
    },
    data: {
      ...data,
      id: user.userId, // 防止恶意修改
      openId: user.openId,
    },
  })
}

/**
 * 根据用户id查找用户
 * @param user
 * @returns
 */
export const findUserById = (user: JwtPayload) => {
  return prisma.user.findUnique({
    where: {
      id: user.userId,
    },
  })
}
