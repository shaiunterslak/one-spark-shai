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
    actions.setSubmitting(false);
    addSectionToForm({ sectionNumber: sectionNumber, answers: values });
    onLastFormSection()
      ? router.replace('/success')
      : router.replace(`/form/${Number(sectionNumber) + 1}`);
  };

  const onLastFormSection = () => {
    return Number(sectionNumber) + 1 === totalNumberOfSections;
  };
  let formSectionValues = form.sections[sectionNumber]
    ? form.sections[sectionNumber].answers
    : {};

  return (
    <div className={`${inter.className} ${styles.container}`}>
      <Progress totalNumberOfSections={totalNumberOfSections} />
      <div className={styles.background}></div>
      {Number(sectionNumber) == 0 && (
        <div className={styles.firstSectionHero}>
          <h1>Let’s calculate your monthly premium</h1>
          <p>
            This takes less than 2 minutes, and you’ll walk away with an upfront
            estimate.
          </p>
        </div>
      )}
      <Formik
        enableReinitialize
        initialValues={formSectionValues}
        onSubmit={(values, actions) => {
          handleSubmit(values, actions);
        }}
      >
        <Form className={styles.formWrapper}>
          {section.map((question: QuestionType) => {
            return <Question question={question} key={question.name} />;
          })}

          {onLastFormSection() ? (
            <button type='submit' className={styles.button}>
              <span>Complete form</span> <img src='/right-arrow.svg'></img>
            </button>
          ) : (
            <button type='submit' className={styles.button}>
              <span>Next</span> <img src='/right-arrow.svg'></img>
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
