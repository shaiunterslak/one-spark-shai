import { Field } from 'formik';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from './InlineSelectField.module.css';
import questionStyles from '../Question/Question.module.css';
import splitInlineLabel from '@/shared/utils';

export default function InlineSelectField({ question }) {
  let splitLabel = splitInlineLabel(question.label);

  return (
    <div className={questionStyles.questionWrapper}>
      <label htmlFor={question.label}>
        {splitLabel.firstPartOfLabel}
        <Field id={question.name} name={question.name} as='select'>
          {question.options?.map((option) => {
            return (
              <option key={option.value} value={option.value}>
                {option.text || option.label}
              </option>
            );
          })}
        </Field>
        {splitLabel.secondPartOfLabel}
      </label>
    </div>
  );
}
