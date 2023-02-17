import { useRouter } from 'next/router';
import { GetStaticPaths, GetStaticProps } from 'next';
import { VIEW_ALL_QUESTIONS_ENDPOINT } from '../constants';
import Question from '@/components/Question';
import QuestionType from '@/interfaces/question';
import { Form, Formik } from 'formik';
import { useForm } from '../../context/form-context';
import styles from '../../styles/Form.module.css';
import { Inter } from '@next/font/google';
import Progress from '@/components/Progress';
const inter = Inter({ subsets: ['latin'] });

export default function Section({ section }: { section: QuestionType[] }) {
  const router = useRouter();
  const { form, addSectionToForm } = useForm();
  const handleSubmit = (values, actions) => {
    const { sectionNumber } = router.query;
    addSectionToForm({ sectionNumber: sectionNumber, answers: values });
    router.replace(`/form/${Number(sectionNumber) + 1}`);
  };
  return (
    <div className={inter.className}>
      <Progress formSections={form.sections} />
      <Formik initialValues={{}} onSubmit={handleSubmit}>
        <Form className={styles.formWrapper}>
          {section.map((question: QuestionType) => {
            return <Question question={question} key={question.name} />;
          })}
          <button type='submit' className={styles.button}>
            Next
          </button>
        </Form>
      </Formik>
    </div>
  );
}

export async function getStaticPaths() {
  let res = await fetch(VIEW_ALL_QUESTIONS_ENDPOINT, { method: 'GET' });
  let data = await res.json();
  let transformedSectionData = data.sections.map((section, index) => {
    return { params: { sectionNumber: index.toString() } };
  });
  return {
    paths: transformedSectionData,
    fallback: false,
  };
}
export async function getStaticProps({ params }) {
  let res = await fetch(VIEW_ALL_QUESTIONS_ENDPOINT, { method: 'GET' });
  let data = await res.json();
  let transformedSectionData = data.sections[params.sectionNumber].questions;
  return {
    props: { section: transformedSectionData },
  };
}
