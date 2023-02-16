import { useRouter } from 'next/router';
import { GetStaticPaths, GetStaticProps } from 'next';
import { VIEW_ALL_QUESTIONS_ENDPOINT } from '../constants';
import Question from '@/components/Question';
import QuestionType from '@/interfaces/question';
import { Form, Formik } from 'formik';

export default function Section({ section }: { section: QuestionType[] }) {
  return (
    <Formik
      initialValues={{
        firstName: '',
        lastName: '',
        email: '',
      }}
      onSubmit={(values) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
        }, 500);
      }}
    >
      <Form>
        {section.map((question: QuestionType) => {
          return <Question question={question} key={question.name} />;
        })}
        <button type='submit'>Next</button>
      </Form>
    </Formik>
  );
}

export async function getStaticPaths() {
  let res = await fetch(VIEW_ALL_QUESTIONS_ENDPOINT, { method: 'GET' });
  let data = await res.json();
  let transformedSectionData = data.sections.map((section, index) => {
    return { params: { stepNumber: index.toString() } };
  });
  return {
    paths: transformedSectionData,
    fallback: false,
  };
}
export async function getStaticProps({ params }) {
  let res = await fetch(VIEW_ALL_QUESTIONS_ENDPOINT, { method: 'GET' });
  let data = await res.json();
  let transformedSectionData = data.sections[params.stepNumber].questions;
  return {
    props: { section: transformedSectionData },
  };
}
