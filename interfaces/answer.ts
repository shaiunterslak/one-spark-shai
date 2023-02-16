import OptionType from "./option"

type AnswerType = {
    questionId: string,
    selectedOption?: OptionType
    checkedOptions?: OptionType[]
    freeFormTextAnswer?:string
    freeFormNumericAnswer?:number
  }
  
  export default AnswerType
  