"use client";
import { useState } from "react";
import styles from "../../styles/achievement.module.scss";

interface DeleteButtonProps {
  achievementId: number;
  onDelete: (id: number) => void; // A callback to handle the delete action
}

export default function DeleteButton({ achievementId, onDelete }: DeleteButtonProps) {
  const [showModal, setShowModal] = useState(false);

  // Toggle modal visibility
  const toggleModal = () => setShowModal(!showModal);

  // Handle confirmation action
  const handleDelete = () => {
    // Call the onDelete function passed from the parent component
    onDelete(achievementId);
    toggleModal(); // Close the modal after the action
  };

  return (
    <>
      <button className={styles.deleteButton} onClick={toggleModal}>
        Delete
      </button>

      {showModal && (
        <div className={styles.modalOverlay} onClick={toggleModal}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <h2>Are you sure you want to delete this achievement?</h2>

            <div className={styles.actions}>
              <div className={styles.cleanFormGroup + " " + styles.actions}>
                  <button className={styles.submitButton} onClick={handleDelete}>Yes, Delete!</button>
                  <button className={styles.cancelButton} onClick={toggleModal}>Cancel</button>
                </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
