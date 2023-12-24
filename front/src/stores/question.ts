// 问题存储,用于做持久化存储
import { defineStore } from 'pinia'
import { QuestionnaireCreateDto } from '../../../share/types/dto'
export const useQuestionStore = defineStore(
  'question',
  () => {
    // 问卷数据
    const questionnaire = ref<QuestionnaireCreateDto>({
      title: '',
      desc: '',
      questions: []
    })

    return {
      questionnaire
    }
  },
  {
    unistorage: true
  }
)
