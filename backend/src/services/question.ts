import prisma from '../lib/db'
import type {
  QuestionnaireCreateDto,
  JwtPayload,
} from '../../../share/types/dto'

/**
 * 创建问卷
 * @param user
 * @param questionnaire
 * @returns
 */
export const createQuestionnaire = (
  user: JwtPayload,
  questionnaire: QuestionnaireCreateDto
) => {
  // 创建问卷
  return prisma.questionnaire.create({
    data: {
      title: questionnaire.title!,
      desc: questionnaire.desc!,
      userId: user.userId, // 问卷创建者
      questions: {
        // 忽略ts
        create: questionnaire.questions!.map((question) => {
          return {
            title: question.title!,
            type: question.type!,
            image: question.image!,
            options: {
              create: question.options!.map((option) => {
                return {
                  title: option.title!,
                  image: option.image!,
                }
              }),
            },
          }
        }),
      },
    },
  })
}

/**
 * 获取问卷
 * @param id
 * @returns
 */
export const findQuestionnaireById = (id: string) => {
  return prisma.questionnaire.findUnique({
    where: {
      id,
    },
    include: {
      questions: {
        include: {
          options: true,
        },
      },
    },
  })
}

/**
 * 获取用户所有问卷列表
 */

export const findQuestionnaireByUserId = (user: JwtPayload) => {
  return prisma.questionnaire.findMany({
    where: {
      userId: user.userId,
    },
  })
}

/**
 * 删除问卷
 */

export const deleteQuestionnaireById = async (id: string) => {
  // 删除问卷
  // 先删除所有该问卷的回答
  await prisma.answer.deleteMany({
    where: {
      qeustion: {
        questionnaireId: id,
      },
    },
  })

  //删除问卷的所有问题的所有选项
  await prisma.option.deleteMany({
    where: {
      question: {
        questionnaireId: id,
      },
    },
  })

  // 删除问卷的所有问题
  await prisma.question.deleteMany({
    where: {
      questionnaireId: id,
    },
  })

  // 删除问卷
  return await prisma.questionnaire.delete({
    where: {
      id,
    },
  })
}

// 查询填空题列表
export const getBlankList = (id: string) => {
  return prisma.question.findUnique({
    where: {
      id,
    },
    include: {
      answer: {
        include: {
          user: true,
        },
      },
    },
  })
}
