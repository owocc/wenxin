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