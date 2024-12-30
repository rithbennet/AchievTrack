"use client";

import { useState } from 'react';
import StudentForm from './StudentForm'; // Assuming you have a StudentForm component to handle student data
import styles from '../styles/manageStudent.module.scss'; // Make sure styles are updated to match the student context

export default function AddButtonStudents() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Function to open the modal
  const openModal = () => {
    console.log("Opening Add/Edit student modal");
    setIsModalOpen(true);
  };



  return (
    <div>
      {/* Add Button */}
      <button onClick={openModal} className={styles.addButton}>
        Add Student
      </button>

      {/* Modal for adding student */}
      {isModalOpen && (
        <div className={`${styles.modalOverlay} ${isModalOpen ? styles.open : ''}`}>
          <div className={styles.modalContent}>
          </div>
        </div>
      )}
    </div>
  );
}
