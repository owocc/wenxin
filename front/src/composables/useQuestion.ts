import { QuestionnaireCreateDto } from '../../../share/types/dto'
import useFetch from './useFetch'
import type {
  QuestionDetail,
  StaticDetail,
  BlankDetail
} from '../../../share/types/result'
import type { Questionnaire } from '../../../share/prisma/client'
export default () => {
  // 创建问卷
  const fetchCreateQuestionnaire = (data: QuestionnaireCreateDto) => {
    return useFetch<string>('/question', {
      method: 'POST',
      body: {
        questionnaire: data
      }
    })
  }

  // 请求问卷详情
  const fetchQuestionnaireDetail = (id: string) => {
    return useFetch<QuestionDetail>(`/question/${id}`, {
      method: 'GET'
    })
  }

  // 回答问卷
  const fetchAnswerQuestionnaire = (answers: any) => {
    return useFetch<string>('/answer', {
      method: 'POST',
      body: {
        answers
      }
    })
  }

  //获取问卷列表
  const fetchQuestionnaireList = () => {
    return useFetch<Questionnaire[]>('/question/list', {
      method: 'GET'
    })
  }

  // 删除问卷
  const fetchDeleteQuestionnaire = (id: string) => {
    return useFetch<string>(`/question/${id}`, {
      method: 'DELETE'
    })
  }

  // 获取统计信息
  const fetchStatisticDetail = (id: string) => {
    return useFetch<StaticDetail>(`/statistic/${id}`, {
      method: 'GET'
    })
  }

  // 获取填空问题详情列表
  const fetchQuestionnaireBlankDetail = (id: string) => {
    return useFetch<BlankDetail>(`/question/blank/${id}`, {
      method: 'GET'
    })
  }
  return {
    fetchCreateQuestionnaire,
    fetchQuestionnaireDetail,
    fetchAnswerQuestionnaire,
    fetchQuestionnaireList,
    fetchDeleteQuestionnaire,
    fetchStatisticDetail,
    fetchQuestionnaireBlankDetail
  }
}
