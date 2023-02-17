import { Field } from 'formik';
import questionStyles from '../Question/Question.module.css';

export default function NumericField({ question }) {
  return (
    <div className={questionStyles.questionWrapper}>
      <label htmlFor={question.label}>{question.label}</label>
      <Field
        id={question.name}
        name={question.name}
        type='number'
        className={questionStyles.numberField}
      />
    </div>
  );
}
