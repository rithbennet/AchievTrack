"use client";
import { useState } from "react";
import AchievementForm from '../form/achievementForm';
import styles from '../../styles/achievement.module.scss';


export default function AddButton() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <button className={styles.addButton} onClick={handleOpenModal}>
        Add Achievement
      </button>
      {isModalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent} >
            <AchievementForm onClose={handleCloseModal} />
          </div>
        </div>
      )}
    </div>
  );
}
