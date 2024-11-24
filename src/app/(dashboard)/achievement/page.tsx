"use client";
import React, { useState } from "react";
import styles from "./page.module.css";

const Page = () => {
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [fileUploaded, setFileUploaded] = useState(false);
  const [selectedFileName, setSelectedFileName] = useState(""); // State to store the selected file name

  const handleUploadClick = () => {
    setShowUploadModal(true);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedFileName(event.target.files[0].name); // Update file name
    }
  };

  const handleFileSubmit = () => {
    if (selectedFileName) {
      setShowUploadModal(false);
      setFileUploaded(true);
    } else {
      alert("Please select a file before submitting.");
    }
  };

  return (
    <div className={styles.container}>
      {!showUploadModal && !fileUploaded && (
        <div className={styles.form}>
          <h1 className={styles.header}>Edit Achievement</h1>
          
          <form>
            <div className={styles.left}>
              <label>ID</label>
              <input type="text" defaultValue="0001" />
              <label>Title</label>
              <input type="text" defaultValue="Annual Sports Carnival" />
              <label>Category</label>
              <input type="text" defaultValue="Sport" />
              <label>Level</label>
              <input type="text" defaultValue="District" />
              <label>Created By</label>
              <input type="text" defaultValue="Mr. Bob" />
            </div>
            <div className={styles.right}>
              <label>Date</label>
              <input type="date" />
              <label>Description</label>
              <textarea />
              <label>Teacher(s) Involved</label>
              <input type="text" defaultValue="Mr. Bob" />
              <label>Student(s) Involved</label>
              <input type="text" defaultValue="Aaron" />
            </div>
            <div className={styles.upload}>
              <button
                type="button"
                className={styles.uploadButton}
                onClick={handleUploadClick}
              >
                Upload Certificate
              </button>
            </div>
            <button className={styles.saveButton}>Save</button>
          </form>
        </div>
      )}
      {showUploadModal && (
        <div className={styles.uploadModal}>
          <button
            className={styles.closeButton}
            onClick={() => setShowUploadModal(false)}
          >
            ✖
          </button>
          <h2>Import Excel</h2>
          <div className={styles.uploadContainer}>
            <input
              type="file"
              id="fileInput"
              className={styles.fileInput}
              onChange={handleFileChange} // Trigger file change handler
            />
            <label htmlFor="fileInput" className={styles.fileLabel}>
              Select a file from your computer
            </label>
            {selectedFileName && (
              <p className={styles.fileName}>Selected File: {selectedFileName}</p> // Display file name
            )}
            <button className={styles.submitButton} onClick={handleFileSubmit}>
              Submit
            </button>
          </div>
        </div>
      )}
      {fileUploaded && (
        <div className={styles.successModal}>
          <button
            className={styles.closeButton}
            onClick={() => setFileUploaded(false)}
          >
            ✖
          </button>
          <h2>Submitted</h2>
          <div className={styles.checkIcon}>✔</div>
          <p className={styles.fileName}>Uploaded File: {selectedFileName}</p>
        </div>
      )}
    </div>
  );
};

export default Page;
