import { Field } from 'formik';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from './CheckboxGroup.module.css';
import questionStyles from '../Question/Question.module.css';

export default function CheckboxGroup({ question }) {
  return (
    <div className={questionStyles.questionWrapper}>
      <label>{question.label}</label>
      <div
        role='group'
        aria-labelledby='my-checkbox-group'
        className={styles.checkboxGroup}
      >
        {question.options?.map((option) => {
          return (
            <label>
              <Field
                type='checkbox'
                name={question.name}
                value={option.value}
              />
              {option.label}
            </label>
          );
        })}
      </div>
    </div>
  );
}
