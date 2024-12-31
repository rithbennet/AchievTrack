"use client"; // Ensures this is client-side only

import React, { useState } from "react";
import * as XLSX from "xlsx";
import styles from "../styles/achievement.module.scss";

interface AchievementData {
  Title: string;
  Category: string;
  Level: string;
  Date: string; // Ensure dates are in YYYY-MM-DD format
  Description: string;
}

const ImportButton: React.FC = () => {
  const [fileName, setFileName] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [importedData, setImportedData] = useState<AchievementData[] | null>(null);

  // Reference to the file input element
  const fileInputRef = React.useRef<HTMLInputElement | null>(null);

  // Handle the file import
  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFileName(file.name);
      processFile(file);
    }
  };

  // Handle file drop (drag and drop)
  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragging(false);
    const file = event.dataTransfer.files[0];
    if (file) {
      setFileName(file.name);
      processFile(file);
    }
  };

  // Handle file processing
  const processFile = (file: File) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      const data = e.target?.result;
      if (!data) return;

      const workbook = XLSX.read(data, { type: "binary" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const jsonData: AchievementData[] = XLSX.utils.sheet_to_json(sheet);

      setImportedData(jsonData);
      console.log("Imported data:", jsonData);
    };

    reader.readAsBinaryString(file);
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
    setImportedData(null);
  };

  const handleSubmit = () => {
    if (importedData) {
      // Process the imported data
      console.log("Submitting imported data:", importedData);
      // Submit to the server or use as needed
    }
    handleCloseModal();
  };

  // Trigger click on file input when the button is clicked
  const handleChooseFileClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
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
                  onClick={handleChooseFileClick} // Trigger file input click
                >
                  Choose a file
                </button>
              </label>
              <input
                ref={fileInputRef}
                type="file"
                id="fileInput"
                className={styles.fileInput}
                onChange={handleImport}
                style={{ display: "none" }} // Hide the default file input
              />
            </div>

            {fileName && <p>Selected file: {fileName}</p>}

            {importedData && (
              <div className={styles.preview}>
                <h4>Preview Data:</h4>
                <ul>
                  {importedData.slice(0, 5).map((data, index) => (
                    <li key={index}>
                      {Object.entries(data).map(([key, value]) => (
                        <p key={key}>
                          <strong>{key}:</strong> {value}
                        </p>
                      ))}
                    </li>
                  ))}
                </ul>
                {importedData.length > 5 && <p>...and more</p>}
              </div>
            )}

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
