import { useRouter } from 'next/router';
import { GetStaticPaths, GetStaticProps } from 'next';
import { VIEW_ALL_QUESTIONS_ENDPOINT } from '../constants';

// Represents a section, takes in
export default function Section({ section }) {
  return (
    <div>
      {section.map((question) => {
        return <h2>{question.label}</h2>;
      })}
    </div>
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
  let transformedSectionData = data.sections[params.stepNumber];
  return {
    props: { section: transformedSectionData.questions },
  };
}
