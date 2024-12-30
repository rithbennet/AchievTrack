"use client";
import { useState } from "react";
import styles from "../../styles/achievement.module.scss";
import { useRouter } from "next/navigation";

interface DeleteButtonProps {
  achievementId: number;
}

export default function DeleteButton({ achievementId,}: DeleteButtonProps) {
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();

  // Toggle modal visibility
  const toggleModal = () => setShowModal(!showModal);

  // Handle confirmation action

  const handleDelete = async () => {
    try {
      await fetch("/api/achievement", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: achievementId }),
      });
      console.log(`Achievement with ID ${achievementId} deleted successfully.`);
      // Refetch achievements after deletion
    } catch (error) {
      console.error("Error deleting achievement:", error);
    }

    toggleModal();
    router.refresh();
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
