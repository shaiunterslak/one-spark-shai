import QuestionType from '@/interfaces/question';
import { Field } from 'formik';
import styles from '../styles/Question.module.css';

export default function Question(question) {
  let questionData: QuestionType = question.question;
  console.log(questionData.type);
  {
    if (questionData.type === 'text') {
      return (
        <div className={styles.questionWrapper}>
          <label htmlFor={questionData.label}>{questionData.label}</label>
          <Field
            id={questionData.name}
            name={questionData.name}
            className={styles.textField}
          />
        </div>
      );
    } else if (questionData.type === 'inline_numeric') {
      return (
        <div className={styles.questionWrapper}>
          <label htmlFor={questionData.label}>{questionData.label}</label>
          <Field
            id={questionData.name}
            name={questionData.name}
            type='number'
            className={styles.numberField}
          />
        </div>
      );
    } else if (questionData.type === 'numeric') {
      return (
        <div className={styles.questionWrapper}>
          <label htmlFor={questionData.label}>{questionData.label}</label>
          <Field
            id={questionData.name}
            name={questionData.name}
            type='number'
            className={styles.numberField}
          />
        </div>
      );
    } else if (questionData.type === 'select') {
      return (
        <div className={styles.questionWrapper}>
          <label htmlFor={questionData.label}>{questionData.label}</label>
          <Field
            id={questionData.name}
            name={questionData.name}
            as='select'
            className={styles.numberField}
          >
            {questionData.options?.map((option) => {
              return (
                <option key={option.value} value={option.value}>
                  {option.text}
                </option>
              );
            })}
          </Field>
        </div>
      );
    } else if (questionData.type === 'radio') {
      return (
        <div className={styles.questionWrapper}>
          <div
            role='group'
            aria-labelledby='my-radio-group'
            className={styles.radioGroup}
          >
            <label>{questionData.label}</label>

            {questionData.options?.map((option) => {
              return (
                <label key={option.value}>
                  <Field type='radio' name='picked' value={option.value} />
                  {option.text}
                </label>
              );
            })}
          </div>
        </div>
      );
    } else if (questionData.type === 'checkbox') {
      return (
        <div className={styles.questionWrapper}>
          <label>{questionData.label}</label>
          <div
            role='group'
            aria-labelledby='my-checkbox-group'
            className={styles.checkboxGroup}
          >
            {questionData.options?.map((option) => {
              return (
                <label>
                  <Field type='checkbox' name='picked' value={option.value} />
                  {option.text}
                </label>
              );
            })}
          </div>
        </div>
      );
    } else {
      return (
        <div className={styles.questionWrapper}>
          <label htmlFor={questionData.label}>{questionData.label}</label>
          <Field
            id={questionData.name}
            name={questionData.name}
            type={questionData.type}
          />
        </div>
      );
    }
  }
}
