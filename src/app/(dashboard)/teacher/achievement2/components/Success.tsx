import styles from '../styles/acheivement.module.scss';

interface SuccessProps {
  message: string;
  closeModal: () => void;
}

export default function Success({ message, closeModal }: SuccessProps) {
  return (
    <div className={styles.successModal}>
      <div className={styles.modalHeader}>
        <h1>Success</h1>
        <button type="button" className={styles.closeButton} onClick={closeModal} aria-label="Close modal">
          &times;
        </button>
      </div>
      <p>{message}</p>
    </div>
  );
}