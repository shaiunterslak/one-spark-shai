import { Field } from 'formik';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from './RadioGroup.module.css';
import questionStyles from '../Question/Question.module.css';

export default function RadioField({ question }) {
  return (
    <div
      role='group'
      aria-labelledby='my-radio-group'
      className={questionStyles.questionWrapper}
    >
      <label>{question.label}</label>

      {question.options?.map((option) => {
        return (
          <label key={option.value}>
            <Field type='radio' name={question.name} value={option.value} />
            {option.label || option.text}
          </label>
        );
      })}
    </div>
  );
}
