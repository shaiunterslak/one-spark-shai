import { Field } from 'formik';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from './CheckboxGroup.module.css';
import questionStyles from '../Question/Question.module.css';
import { useEffect, useState } from 'react';

export default function CheckboxGroup({ question }) {
  const [checkedOptions, setCheckedOptions] = useState([]);
  const isChecked = (optionValue) => {
    return checkedOptions.includes(optionValue);
  };

  const updateCheckedValues = (optionValue) => {
    if (isChecked(optionValue)) {
      let positionOfItem = checkedOptions.indexOf(optionValue);

      let newCheckedOptions = checkedOptions;
      newCheckedOptions.splice(positionOfItem, 1);
      // delete newCheckedOptions[positionOfItem];
      setCheckedOptions(newCheckedOptions);
    } else {
      setCheckedOptions([...checkedOptions, optionValue]);
    }
  };

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
            <label
              key={option.name}
              className={`${styles.checkboxInput} ${
                isChecked(option.value) ? styles.checked : ''
              }`}
            >
              <Field
                type='checkbox'
                name={question.name}
                value={option.value}
                onClick={() => {
                  updateCheckedValues(option.value);
                }}
              />
              {option.label}
            </label>
          );
        })}
      </div>
    </div>
  );
}
