import { QuestionnaireCreateDto } from '../../../share/types/dto'
import useFetch from './useFetch'
import type { QuestionDetail } from '../../../share/types/result'
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

  return {
    fetchCreateQuestionnaire,
    fetchQuestionnaireDetail,
    fetchAnswerQuestionnaire
  }
}
