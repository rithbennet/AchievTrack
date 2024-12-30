"use client";
import { useState } from 'react';
import UserForm from "../UserForm";
import styles from '../../styles/manageUser.module.scss';

export default function AddButton() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    console.log("Opening modal");
    setIsModalOpen(true);
  };

  const closeModal = () => {
    console.log("Closing modal");
    setIsModalOpen(false);
  };

  return (
    <div>
      <button onClick={openModal} className={styles.addButton}>Add User</button>
      {isModalOpen && (
        <div className={`${styles.modalOverlay} ${isModalOpen ? styles.open : ''}`}>
          <div className={styles.modalContent}>
            <UserForm closeModal={closeModal} />
          </div>
        </div>
      )}
    </div>
  );
}