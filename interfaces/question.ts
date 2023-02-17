import OptionType from "./option"

type QuestionType = {
    id: string
    label: string
    name: string
    required: boolean
    options?: OptionType[]
    type: 'inline_numeric'|'inline_select'|'radio'|'select'|'checkbox'|'search_select'|'text'|'numeric';
  }
  
  export default QuestionType
  
