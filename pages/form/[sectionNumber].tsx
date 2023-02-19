import { useRouter } from 'next/router';
import Question from '@/components/Question/Question';
import QuestionType from '@/interfaces/question';
import { Form, Formik } from 'formik';
import { useForm } from '../../context/form-context';
import styles from './Form.module.css';
import Progress from '@/components/Progress/Progress';
import Modal from 'react-modal';
import { Inter } from '@next/font/google';
import { useState } from 'react';
const inter = Inter({ subsets: ['latin'] });

const customModalStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};
export default function Section({
  section,
  totalNumberOfSections,
}: {
  section: QuestionType[];
  totalNumberOfSections: number;
}) {
  const router = useRouter();
  const { form, addSectionToForm, clearForm } = useForm();
  const { sectionNumber } = router.query;
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = (values, actions) => {
    actions.setSubmitting(false);
    addSectionToForm({ sectionNumber: sectionNumber, answers: values });
    onLastFormSection()
      ? setIsOpen(true)
      : router.replace(`/form/${Number(sectionNumber) + 1}`);
  };

  const restartForm = () => {
    clearForm();
    setIsOpen(false);
    router.replace('/form/0');
  };

  const onLastFormSection = () => {
    return Number(sectionNumber) + 1 === totalNumberOfSections;
  };
  let formSectionValues = form.sections[sectionNumber]
    ? form.sections[sectionNumber].answers
    : {};

  return (
    <div className={`${styles.container} ${inter.className}`}>
      <Progress totalNumberOfSections={totalNumberOfSections} />
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

      <Modal
        isOpen={isOpen}
        onRequestClose={() => setIsOpen(false)}
        style={customModalStyles}
      >
        <div className={`${inter.className} ${styles.modalWrapper}`}>
          <img src='/tick.svg' className={styles.successImage} />
          <h1>Thanks for signing up to OneSpark</h1>
          <p>Here is your data:</p>

          {form.sections.map((section) => {
            return (
              <div key={section.sectionNumber}>
                <h3>Section number: {Number(section.sectionNumber) + 1}</h3>
                <div className={styles.data}>
                  {JSON.stringify(section.answers)}
                </div>
              </div>
            );
          })}
          <button className={styles.button} onClick={restartForm}>
            <span>Back to start</span> <img src='/right-arrow.svg'></img>
          </button>
        </div>
      </Modal>
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
