// components/EditButton.tsx
"use client"
import { useState } from 'react';
import UserForm from "../UserForm";
import styles from '../styles/manageUser.module.scss';

interface EditButtonProps {
  userId: string;
  initialData: {
    name: string;
    email: string;
    role: string;
    password: string;
  };
}

export default function EditButton({ userId, initialData }: EditButtonProps) {
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
      <button onClick={openModal} className={styles.editButton} aria-label={`Edit user ${userId}`}>
        Edit
      </button>
      {isModalOpen && (
        <div className={`${styles.modalOverlay} ${isModalOpen ? styles.open : ''}`}>
          <div className={styles.modalContent}>
            <UserForm closeModal={closeModal} initialData={initialData} />
          </div>
        </div>
      )}
    </div>
  );
}