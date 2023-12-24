import prisma from '../lib/db'

// 对于问卷的统计, 我们需要统计的是每个问题的每个选项的选择人数

export const getStatisticById = async (id: string) => {
  // 通过问卷id找到所有的问题
  const questions = await prisma.question.findMany({
    where: {
      questionnaireId: id,
    },
    include: {
      options: true,
    },
  })

  // 先准备一个空的统计结果,预留一些字段
  const countQuestion = questions.map((question) => {
    const options = question.options.map((option) => ({
      ...option,
      count: 0, // 当前选项的选择人数
      percent: 0, // 当前选项的选择人数占总人数的百分比
    }))
    return { ...question, options, count: 0 }
  })

  // 问卷中所有问题的总回答数
  for (let i = 0; i < countQuestion.length; i++) {
    const question = countQuestion[i]
    question.count = await prisma.answer.count({
      where: {
        questionId: countQuestion[i].id,
      },
    })

    for (let j = 0; j < questions[i].options.length; j++) {
      const option = question.options[j]
      option.count = await prisma.answer.count({
        where: {
          optionId: questions[i].options[j].id,
        },
      })
      // 计算百分比,保留小数点后两位
      option.percent = Math.round((option.count / question.count) * 100)
    }
  }

  //查询问卷
  const questionnaire = await prisma.questionnaire.findUnique({
    where: {
      id,
    },
  })

  const result = {
    ...questionnaire,
    questions: countQuestion,
    coutn: countQuestion[0].count,
  }
  return result
}
