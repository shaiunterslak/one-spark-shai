import QuestionType from '@/interfaces/question';
import { Field } from 'formik';
import CheckboxGroup from '../CheckboxGroup/CheckboxGroup';
import CurrencyField from '../CurrencyField/CurrencyField';
import InlineNumericField from '../InlineNumericField/InlineNumericField';
import InlineSelectField from '../InlineSelectField/InlineSelectField';
import NumericField from '../NumericField/NumericField';
import RadioGroup from '../RadioGroup/RadioGroup';
import SearchSelectField from '../SearchSelectField/SearchSelectField';
import SelectField from '../SelectField/SelectField';
import TelephoneField from '../TelephoneField/TelephoneField';
import TextField from '../TextField/TextField';
import styles from './Question.module.css';

export default function Question(question) {
  let questionData: QuestionType = question.question;
  {
    if (questionData.type === 'text' || questionData.type === 'email') {
      return <TextField question={questionData} />;
    } else if (questionData.type === 'inline_numeric') {
      return <InlineNumericField question={questionData} />;
    } else if (questionData.type === 'tel') {
      return <TelephoneField question={questionData} />;
    } else if (questionData.type === 'currency') {
      return <CurrencyField question={questionData} />;
    } else if (questionData.type === 'numeric') {
      return <NumericField question={questionData} />;
    } else if (questionData.type === 'select') {
      return <SelectField question={questionData} />;
    } else if (questionData.type === 'inline_select') {
      return <InlineSelectField question={questionData} />;
    } else if (questionData.type === 'search_select') {
      return <SearchSelectField question={questionData} />;
    } else if (questionData.type === 'radio') {
      return <RadioGroup question={questionData} />;
    } else if (questionData.type === 'checkbox') {
      return <CheckboxGroup question={questionData} />;
    }
  }
}
