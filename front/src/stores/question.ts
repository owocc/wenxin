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

    // 单选投票数据
    const singleQuestionnaire = ref<QuestionnaireCreateDto>({
      title: '',
      desc: '',
      questions: [
        {
          title: '',
          type: 1,
          options: [
            {
              title: '',
              image: ''
            },
            {
              title: '',
              image: ''
            }
          ]
        }
      ]
    })

    // 多选投票数据

    return {
      questionnaire,
      singleQuestionnaire
    }
  },
  {
    unistorage: true
  }
)
