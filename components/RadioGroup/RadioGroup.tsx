import { Field } from 'formik';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from './RadioGroup.module.css';
import questionStyles from '../Question/Question.module.css';
import { useState } from 'react';

export default function RadioGroup({ question }) {
  const [checked, setChecked] = useState('h');
  return (
    <div
      role='group'
      aria-labelledby='my-radio-group'
      className={`${questionStyles.questionWrapper} ${styles.radioGroup}`}
    >
      {question.options?.map((option) => {
        return (
          <label
            key={option.value}
            className={`${styles.radioInput} ${
              checked === option.value ? styles.checked : ''
            }`}
          >
            <Field
              type='radio'
              name={question.name}
              value={option.value}
              onClick={() => {
                setChecked(option.value);
              }}
            />
            {option.label || option.text}
          </label>
        );
      })}
    </div>
  );
}
