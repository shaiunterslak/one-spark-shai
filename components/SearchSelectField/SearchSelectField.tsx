import { Field } from 'formik';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from './SearchSelectField.module.css';
import questionStyles from '../Question/Question.module.css';

export default function SearchSelectField({ question }) {
  return (
    <div className={questionStyles.questionWrapper}>
      <label htmlFor={question.label}>{question.label}</label>
      <Field id={question.name} name={question.name} as='select'>
        {question.options?.map((option) => {
          return (
            <option key={option.value} value={option.value}>
              {option.text || option.label}
            </option>
          );
        })}
      </Field>
    </div>
  );
}
