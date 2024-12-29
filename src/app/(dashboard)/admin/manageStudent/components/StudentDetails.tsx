"use client";
import styles from '../styles/manageStudent.module.scss';

interface StudentDetailsProps {
  initialData: {
    name: string;
    mykad: string;
    class: string;
  };
  closeModalAction: () => void;
}

export default function StudentDetails({ initialData, closeModalAction }: StudentDetailsProps) {
  return (
    <div className={styles.modalContent}>
      <h2>Student Details</h2>
      <p><strong>Name:</strong> {initialData.name}</p>
      <p><strong>MyKad:</strong> {initialData.mykad}</p>
      <p><strong>Class:</strong> {initialData.class}</p>
      <button onClick={closeModalAction} className={styles.closeButton}>
        Close
      </button>
    </div>
  );
}