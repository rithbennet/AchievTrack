"use client";

import { useState } from 'react';
import styles from '../styles/manageStudent.module.scss';

const ImportStudentButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append('file', selectedFile);

      const response = await fetch('/api/import-students', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        alert('Students imported successfully!');
        setIsModalOpen(false);
      } else {
        alert('Failed to import students.');
      }
    }
  };

  return (
    <div>
      <button className={styles.importButton} onClick={handleOpenModal}>
        Import Students
      </button>

      {/* Modal */}
      <div className={`${styles.importModalOverlay} ${isModalOpen ? styles.open : ''}`}>
        <div className={styles.importModalContent}>
          <div className={styles.importModalHeader}>
            <h2>Import Students</h2>
            <button className={styles.closeButton} onClick={handleCloseModal}>×</button>
          </div>

          <form className={styles.importForm}>
            <input type="file" accept=".csv, .xlsx, .xls" onChange={handleFileChange} />
            <button type="button" onClick={handleUpload}>Upload</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ImportStudentButton;