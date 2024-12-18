"use client"
import { useState } from "react";
import AchievementForm from '../achievementForm';
import styles from '../../styles/achievement.module.scss';

export default function AddButton() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleFormSubmit = (data: any) => {
    console.log("Achievement Submitted:", data);
    // Add logic to save the data to your backend
    handleCloseModal();
  };

  return (
    <div>
      <button className={styles.addButton} onClick={handleOpenModal}>
      Add Achievement
      </button>
      {isModalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <AchievementForm onSubmit={handleFormSubmit} onClose={handleCloseModal} />
          </div>
        </div>
      )}
    </div>
  );
}
