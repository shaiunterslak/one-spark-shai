import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from './Progress.module.css';

export default function Progress({ totalNumberOfSections }) {
  const router = useRouter();
  const { sectionNumber } = router.query;
  // create an empty array of the same length as the total number of sections
  const sections = Array.from(Array(totalNumberOfSections).keys());

  // check if the step point circle is less than the current section number based on the route
  const isCompleted = (index) => {
    return Number(index) <= Number(sectionNumber);
  };
  return (
    // First step will always be 1
    <div className={styles.progressWrapper}>
      <div className={`${styles.step} ${styles.completed}`}>
        <Link href={`/form/0`} className={`${styles.stepPoint}`}>
          <p className={styles.stepNumber}>1</p>
        </Link>
      </div>
      {sections.map((item, index) => {
        return (
          Number(index) >= 1 && (
            <div
              className={`${styles.step} ${
                isCompleted(index) ? styles.completed : ''
              }`}
            >
              <div className={styles.stepLine}></div>
              <Link href={`/form/${index}`} className={styles.stepPoint}>
                <p className={styles.stepNumber}>{index + 1}</p>
              </Link>
            </div>
          )
        );
      })}
    </div>
  );
}
