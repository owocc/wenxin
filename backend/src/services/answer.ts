import prisma from '../lib/db'
import type { JwtPayload, AnswerDto } from '../../../share/types/dto'
// 创建问卷回答

export const createAnswer = async (user: JwtPayload, answers: AnswerDto[]) => {
  const answerPromises = []

  for (let i = 0; i < answers.length; i++) {
    if (answers[i].type === 3) {
      // 是填空题
      const promise = prisma.answer.create({
        data: {
          userId: user.userId!,
          questionId: answers[i].questionId!,
          answer: answers[i].answer!,
        },
      })
      answerPromises.push(promise)
    } else {
      // 不是填空题，是单选题或多选题
      if (answers[i].optionIds === undefined) {
        continue
      }
      for (let j = 0; j < answers[i].optionIds.length; j++) {
        const promise = prisma.answer.create({
          data: {
            userId: user.userId!,
            questionId: answers[i].questionId!,
            optionId: answers[i].optionIds[j],
          },
        })
        answerPromises.push(promise)
      }
    }
  }

  // 等待所有的回答都创建完成
  await Promise.all(answerPromises)
}
