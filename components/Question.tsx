import QuestionType from '@/interfaces/question';
import { Field } from 'formik';

// Represents a section, takes in
export default function Question(question) {
  let questionData: QuestionType = question.question;
  console.log(questionData.type);
  {
    if (questionData.type === 'text') {
      return (
        <div>
          <label htmlFor={questionData.label}>{questionData.label}</label>
          <Field id={questionData.name} name={questionData.name} />
        </div>
      );
    } else if (questionData.type === 'inline_numeric') {
      return (
        <div>
          <label htmlFor={questionData.label}>{questionData.label}</label>
          <Field
            id={questionData.name}
            name={questionData.name}
            type='number'
          />
        </div>
      );
    } else if (questionData.type === 'radio') {
      return (
        <div>
          <label>{questionData.label}</label>
          <div role='group' aria-labelledby='my-radio-group'>
            {questionData.options?.map((option) => {
              return (
                <label>
                  <Field type='radio' name='picked' value={option.value} />
                  {option.label}
                </label>
              );
            })}
          </div>
        </div>
      );
    } else if (questionData.type === 'checkbox') {
      return (
        <div>
          <label>{questionData.label}</label>
          <div role='group' aria-labelledby='my-checkbox-group'>
            {questionData.options?.map((option) => {
              return (
                <label>
                  <Field type='checkbox' name='picked' value={option.value} />
                  {option.label}
                </label>
              );
            })}
          </div>
        </div>
      );
    } else {
      return (
        <div>
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
