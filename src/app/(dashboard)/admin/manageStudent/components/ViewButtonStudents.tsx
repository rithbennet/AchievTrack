"use client";
import { useState } from 'react';
import StudentDetails from "./StudentDetails";
import styles from '../styles/manageStudent.module.scss';

interface ViewButtonProps {
  id: number;
  initialData: {
    name: string;
    mykad: string;
    class: string;
  };
}

export default function ViewButtonStudents({ id, initialData }: ViewButtonProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    console.log("Opening modal for student details:", id);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    console.log("Closing modal for student details:", id);
    setIsModalOpen(false);
  };

  return (
    <div>
      <button 
        onClick={openModal} 
        className={styles.viewButton} 
        aria-label={`View student ${id}`}
      >
        View
      </button>
      {isModalOpen && (
        <div className={`${styles.modalOverlay} ${isModalOpen ? styles.open : ''}`}>
          <div className={styles.modalContent}>
            <StudentDetails closeModalAction={closeModal} initialData={initialData} />
          </div>
        </div>
      )}
    </div>
  );
}