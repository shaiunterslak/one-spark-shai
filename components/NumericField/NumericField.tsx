import { Field } from 'formik';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from './NumericField.module.css';
import questionStyles from '../Question/Question.module.css';

export default function NumericField({ question }) {
  return (
    <div className={questionStyles.questionWrapper}>
      <label htmlFor={question.label}>{question.label}</label>
      <Field
        id={question.name}
        name={question.name}
        type='number'
        className={styles.numberField}
      />
    </div>
  );
}
