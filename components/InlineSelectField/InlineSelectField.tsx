import { Field } from 'formik';
import questionStyles from '../Question/Question.module.css';
import styles from './InlineSelectField.module.css';
import splitInlineLabel from '@/shared/utils';

export default function InlineSelectField({ question }) {
  let splitLabel = splitInlineLabel(question.label);

  return (
    <div className={questionStyles.questionWrapper}>
      <label htmlFor={question.label}>
        <span>{splitLabel.firstPartOfLabel}</span>
        <Field
          id={question.name}
          name={question.name}
          as='select'
          className={styles.inlineSelectField}
        >
          {question.options?.map((option) => {
            return (
              <option key={option.value} value={option.value}>
                {option.text || option.label}
              </option>
            );
          })}
        </Field>
        <span>{splitLabel.secondPartOfLabel}</span>
      </label>
      <p>({question.description})</p>
    </div>
  );
}
