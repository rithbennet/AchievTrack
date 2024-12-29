"use client"; // Ensures this is client-side only

import React, { useState } from "react";
import styles from "../../styles/achievement.module.scss";

const ImportButton: React.FC = () => {
  const [fileName, setFileName] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dragging, setDragging] = useState(false);

  // Handle the file import from file input
  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFileName(file.name);
      // Logic to process the file (upload, preview, etc.)
      console.log("Imported file:", file.name);
    }
  };

  // Handle file drop (drag and drop)
  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragging(false);
    const file = event.dataTransfer.files[0];
    if (file) {
      setFileName(file.name);
      console.log("Imported file:", file.name);
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = () => {
    setDragging(false);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setFileName(null);
  };

  const handleSubmit = () => {
    if (fileName) {
      // Logic to submit the file can go here (e.g., upload it to a server)
      console.log("File submitted:", fileName);
    }
    handleCloseModal();
  };

  return (
    <div>
      <button className={styles.importButton} onClick={handleOpenModal}>
        Import Excel
      </button>

      {isModalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <h3>Upload your file</h3>

            <div
              className={`${styles.fileDropArea} ${dragging ? styles.dragging : ""}`}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
            >
              <p>Drag and drop your file here</p>
              <p>or</p>
              <label htmlFor="fileInput" className={styles.chooseFileLabel}>
                <button
                  type="button"
                  className={styles.chooseFileButton}
                >
                  Choose a file
                </button>
              </label>
              <input
                type="file"
                id="fileInput"
                className={styles.fileInput}
                onChange={handleImport}
                style={{ display: "none" }} // Hide the default file input
              />
            </div>

            {fileName && <p>Selected file: {fileName}</p>}

            <div className={styles.actions}>
              <button className={styles.submitButton} onClick={handleSubmit}>
                Submit
              </button>
              <span style={{ margin: "0 10px" }}></span>
              <button className={styles.cancelButton} onClick={handleCloseModal}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImportButton;
