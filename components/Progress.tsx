import styles from '../styles/Progress.module.css';
export default function Progress({ formSections }) {
  return (
    <div className={styles.progressWrapper}>
      <div className={styles.step}>
        <div className={styles.stepPoint}>
          <span className={styles.stepNumber}>0</span>
        </div>
      </div>
      {formSections.map((section) => {
        return (
          Number(section.sectionNumber) > 0 && (
            <div className={styles.step}>
              <div className={styles.stepLine}></div>
              <div className={styles.stepPoint}>
                <span className={styles.stepNumber}>
                  {section.sectionNumber}
                </span>
              </div>
            </div>
          )
        );
      })}
    </div>
  );
}
