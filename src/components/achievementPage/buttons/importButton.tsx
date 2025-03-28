// FRONTEND: importButton.tsx
"use client"; // Ensures this is client-side only

import React, { useState, useEffect } from "react";
import * as XLSX from "xlsx";
import styles from "../styles/achievement.module.scss";
import { getSession } from "next-auth/react";

interface AchievementData {
  title: string;
  organizer: string;
  category: string;
  level: string;
  date: string; // Dates are strings in "YYYY-MM-DD" format
  description: string;
  students: number[]; // Default empty array
  teachers: number[]; // Default empty array
}

const ImportButton: React.FC = () => {
  const [userId, setUserId] = useState<number | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [importedData, setImportedData] = useState<AchievementData[] | null>(null);

  useEffect(() => {
    async function fetchUserId() {
      const session = await getSession();
      if (session && session.user) {
        const id = Number(session.user.id); // Assuming the user ID is stored in session.user.id and converting it to a number
        setUserId(id);
      }
    }
    fetchUserId();
  }, []);

  console.log("userId:", userId);

  const fileInputRef = React.useRef<HTMLInputElement | null>(null);

  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFileName(file.name);
      processFile(file);
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragging(false);
    const file = event.dataTransfer.files[0];
    if (file) {
      setFileName(file.name);
      processFile(file);
    }
  };

  const processFile = (file: File) => {
    const reader = new FileReader();
  
    reader.onload = (e) => {
      const data = e.target?.result;
      if (!data) return;
  
      const workbook = XLSX.read(data, { type: "binary" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const jsonData: { [key: string]: string }[] = XLSX.utils.sheet_to_json(sheet, { raw: false });
  
      // Map Excel headers to `AchievementData` keys
      const mappedData: AchievementData[] = jsonData.map((row) => ({
        title: row["Title"] || "Untitled",
        organizer: row["Organizer"] || "Unknown",
        category: row["Category"] || "Uncategorized",
        level: row["Level"] || "Unknown",
        date: row["Date"] || "2000-01-01", // Fallback date
        description: row["Description"] || "No description provided",
        students: [], // Default empty array for students
        teachers: [], // Default empty array for teachers
      }));
  
      setImportedData(mappedData);
      console.log("Imported data:", mappedData);
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

  const handleSubmit = async () => {
    if (!importedData || !userId) return;

    // Map imported data to ensure required fields exist and add default values
    const dataWithDefaults = importedData.map((achievement) => ({
      title: achievement.title || "Untitled",
      organizer: achievement.organizer || "Unknown",
      category: achievement.category || "Uncategorized",
      level: achievement.level || "Unknown",
      date: achievement.date || "2000-01-01", // Fallback date
      description: achievement.description || "No description provided",
      students: achievement.students || [],
      teachers: achievement.teachers || [],
      createdby: userId,
    }));

    console.log("Payload being sent:", { createdby: userId, data: dataWithDefaults });

    try {
      const response = await fetch("/api/uploadExcel", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ createdby: userId, data: dataWithDefaults }),
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Successfully submitted:", result);
        alert("Data successfully uploaded!");
        handleCloseModal();
      } else {
        console.error("Failed to submit data:", await response.text());
        alert("Failed to upload data.");
      }
    } catch (error) {
      console.error("Error submitting data:", error);
      alert("An error occurred during submission.");
    }
  };

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
                  onClick={handleChooseFileClick}
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
                style={{ display: "none" }}
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

