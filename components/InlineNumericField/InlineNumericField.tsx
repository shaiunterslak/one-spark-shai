import { Field } from 'formik';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from './InlineNumericField.module.css';
import questionStyles from '../Question/Question.module.css';

export default function InlineNumericField({ question }) {
  return (
    <div className={styles.questionWrapper}>
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
