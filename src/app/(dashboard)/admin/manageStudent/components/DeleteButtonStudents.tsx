import { useState } from 'react';
import styles from '../styles/manageStudent.module.scss';

interface DeleteButtonProps {
  id: number;
  onDelete: (id: number) => void;
}

export default function DeleteButtonStudents({ id, onDelete }: DeleteButtonProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleDelete = () => {
    onDelete(id);
    setIsModalOpen(false);
  };

  return (
    <div>
      <button 
        onClick={openModal} 
        className={styles.deleteButton} 
        aria-label={`Delete student ${id}`}
      >
        Delete
      </button>
      {isModalOpen && (
        <div className={`${styles.modalOverlay} ${isModalOpen ? styles.open : ''}`}>
          <div className={styles.modalContent}>
            <h2>Are you sure you want to delete this student?</h2>
            <button onClick={handleDelete} className={styles.confirmDeleteButton}>
              Confirm
            </button>
            <button onClick={closeModal} className={styles.cancelDeleteButton}>
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}