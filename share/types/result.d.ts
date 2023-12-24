import type { Result } from './global'
import type { User } from '../prisma/client'
import {
  findQuestionnaireById,
  getBlankList,
} from '../../backend/src/services/question'
import { getStatisticById } from '../../backend/src/services/statistic'
export type authResult = {
  user: User
  token: string
}

type UnpackedPromise<T> = T extends Promise<infer U> ? U : T
export type QuestionDetail = UnpackedPromise<
  ReturnType<typeof findQuestionnaireById>
>
// findQuestionnaireById 方法返回的是promise，所以需要ReturnType<typeof findQuestionnaireById>来获取返回值的类型,要得到返回值的类型，而不是promise的类型

export type StaticDetail = UnpackedPromise<ReturnType<typeof getStatisticById>>
export type BlankDetail = UnpackedPromise<ReturnType<typeof getBlankList>>
