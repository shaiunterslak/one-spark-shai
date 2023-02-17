import { Field } from 'formik';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from './InlineNumericField.module.css';
import questionStyles from '../Question/Question.module.css';
import splitInlineLabel from '@/shared/utils';

export default function InlineNumericField({ question }) {
  let splitLabel = splitInlineLabel(question.label);

  return (
    <div className={styles.questionWrapper}>
      <label htmlFor={question.label}>
        {splitLabel.firstPartOfLabel}
        <Field
          id={question.name}
          name={question.name}
          type='number'
          className={styles.numberField}
          isRequired={true}
        />
        {splitLabel.secondPartOfLabel}
      </label>
    </div>
  );
}
