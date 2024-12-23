import React from 'react';
import styles from './pills.module.scss';

interface PillsProps {
  students: { id: number; name: string }[];
  onRemove: (id: number) => void;
}

const Pills: React.FC<PillsProps> = ({ students, onRemove }) => {
  return (
    <div className={styles.pillsContainer}>
      {students.map((student) => (
        <div key={student.id} className={styles.pill}>
          {student.name}
          <button onClick={() => onRemove(student.id)} className={styles.removeButton}>x</button>
        </div>
      ))}
    </div>
  );
};

export default Pills;
