import { useRouter } from 'next/router';
import Question from '@/components/Question/Question';
import QuestionType from '@/interfaces/question';
import { Form, Formik } from 'formik';
import { useForm } from '../../context/form-context';
import styles from './Form.module.css';
import { Inter } from '@next/font/google';
import Progress from '@/components/Progress/Progress';
const inter = Inter({ subsets: ['latin'] });

export default function Section({
  section,
  totalNumberOfSections,
}: {
  section: QuestionType[];
  totalNumberOfSections: number;
}) {
  const router = useRouter();
  const { form, addSectionToForm } = useForm();
  const { sectionNumber } = router.query;

  const handleSubmit = (values, actions) => {
    addSectionToForm({ sectionNumber: sectionNumber, answers: values });
    onLastFormSection()
      ? alert(
          `Form completed, here is all your data: ${JSON.stringify(
            form.sections
          )}`
        )
      : router.replace(`/form/${Number(sectionNumber) + 1}`);
  };

  const onLastFormSection = () => {
    return Number(sectionNumber) + 1 === totalNumberOfSections;
  };
  let formSectionValues = form.sections[sectionNumber]
    ? form.sections[sectionNumber].answers
    : {};

  console.log(formSectionValues);
  return (
    <div className={inter.className}>
      <Progress totalNumberOfSections={totalNumberOfSections} />
      <Formik initialValues={formSectionValues} onSubmit={handleSubmit}>
        <Form className={styles.formWrapper}>
          {section.map((question: QuestionType) => {
            return <Question question={question} key={question.name} />;
          })}

          {onLastFormSection() ? (
            <button type='submit' className={styles.button}>
              Complete form
            </button>
          ) : (
            <button type='submit' className={styles.button}>
              Next
            </button>
          )}
        </Form>
      </Formik>
    </div>
  );
}

export async function getStaticPaths() {
  let res = await fetch(process.env.questionsUrl, { method: 'GET' });
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
  let res = await fetch(process.env.questionsUrl, { method: 'GET' });
  let data = await res.json();
  let transformedSectionData = data.sections[params.sectionNumber].questions;
  return {
    props: {
      section: transformedSectionData,
      totalNumberOfSections: data.sections.length,
    },
  };
}
