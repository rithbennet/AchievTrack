"use client";
import { useState } from 'react';
import StudentForm from "./StudentForm";  // Replace with your student form component
import styles from '../styles/manageStudent.module.scss';

interface EditButtonProps {
  id: number;
  initialData: {
    name: string;
    mykad: string;
    class: string;
  };
}

export default function EditButtonStudents({id, initialData }: EditButtonProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    console.log("Opening modal for student:", id);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    console.log("Closing modal for student:", id);
    setIsModalOpen(false);
  };

  return (
    <div>
      <button 
        onClick={openModal} 
        className={styles.editButton} 
        aria-label={`Edit student ${id}`}
      >
        Edit
      </button>
      {isModalOpen && (
        <div className={`${styles.modalOverlay} ${isModalOpen ? styles.open : ''}`}>
          <div className={styles.modalContent}>
            <StudentForm closeModalAction={closeModal} initialData={initialData} />
          </div>
        </div>
      )}
    </div>
  );
}