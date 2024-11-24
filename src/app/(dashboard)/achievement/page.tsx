"use client";
import React, { useState } from "react";
import { supabase } from "../../../lib/superbase.js"; // Import the Supabase client
import styles from "./page.module.css";

const Page = () => {
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [fileUploaded, setFileUploaded] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null); // Store the file object
  const [selectedFileName, setSelectedFileName] = useState(""); // Store the file name
  const [formData, setFormData] = useState({
    id: "0001",
    title: "Annual Sports Carnival",
    category: "Sport",
    level: "District",
    created_by: "Mr. Bob",
    date: "2024-11-01",
    description: "",
    teachers_involved: "Mr. Bob",
    students_involved: "Aaron",
  });

  // Open the upload modal
  const handleUploadClick = () => {
    setShowUploadModal(true);
  };

  // Handle file selection
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedFile(event.target.files[0]);
      setSelectedFileName(event.target.files[0].name);
    }
  };

  // File upload logic
  const handleFileSubmit = async () => {
    if (!selectedFile) {
      alert("Please select a file before submitting.");
      return;
    }

    try {
      const { data, error } = await supabase.storage
        .from("certificates") // Replace with your storage bucket name
        .upload(`certificates/${Date.now()}_${selectedFile.name}`, selectedFile);

      if (error) {
        throw new Error(error.message);
      }

      const { data: publicUrlData } = supabase.storage
        .from("certificates")
        .getPublicUrl(data.path);

      const fileUrl = publicUrlData.publicUrl;
      setSelectedFileName(fileUrl);
      alert("File uploaded successfully!");
      setShowUploadModal(false);
      setFileUploaded(true);
    } catch (err) {
      if (err instanceof Error) {
        alert("Error uploading file: " + err.message);
      } else {
        console.error("Unexpected error:", err);
        alert("An unexpected error occurred while uploading the file.");
      }
    }
  };

  // Save form data including file URL
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const achievementData = {
      ...formData,
      pdf_url: selectedFileName, // Add the file URL to the data
    };

    try {
      const { data, error } = await supabase
        .from("achievements") // Replace with your table name
        .insert([achievementData]);

      if (error) {
        throw new Error(error.message);
      }

      alert("Form saved successfully!");
    } catch (err) {
      if (err instanceof Error) {
        alert("Error saving data: " + err.message);
      } else {
        console.error("Unexpected error:", err);
        alert("An unexpected error occurred while saving the data.");
      }
    }
  };

  return (
    <div className={styles.container}>
      {!showUploadModal && !fileUploaded && (
        <div className={styles.form}>
          <h1 className={styles.header}>Edit Achievement</h1>

          <form onSubmit={handleFormSubmit}>
            <div className={styles.left}>
              {/* Form Fields */}
              <label>ID</label>
              <input
                type="text"
                value={formData.id}
                onChange={(e) => setFormData({ ...formData, id: e.target.value })}
              />
              <label>Title</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              />
              <label>Category</label>
              <input
                type="text"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              />
              <label>Level</label>
              <input
                type="text"
                value={formData.level}
                onChange={(e) => setFormData({ ...formData, level: e.target.value })}
              />
              <label>Created By</label>
              <input
                type="text"
                value={formData.created_by}
                onChange={(e) => setFormData({ ...formData, created_by: e.target.value })}
              />
            </div>
            <div className={styles.right}>
              <label>Date</label>
              <input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              />
              <label>Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
              <label>Teacher(s) Involved</label>
              <input
                type="text"
                value={formData.teachers_involved}
                onChange={(e) => setFormData({ ...formData, teachers_involved: e.target.value })}
              />
              <label>Student(s) Involved</label>
              <input
                type="text"
                value={formData.students_involved}
                onChange={(e) => setFormData({ ...formData, students_involved: e.target.value })}
              />
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
            <button className={styles.saveButton} type="submit">
              Save
            </button>
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
          <h2>Upload Certificate</h2>
          <div className={styles.uploadContainer}>
            <input
              type="file"
              id="fileInput"
              className={styles.fileInput}
              onChange={handleFileChange}
            />
            <label htmlFor="fileInput" className={styles.fileLabel}>
              Select a file
            </label>
            {selectedFileName && <p>Selected File: {selectedFileName}</p>}
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
          <p>Uploaded File: {selectedFileName}</p>
        </div>
      )}
    </div>
  );
};

export default Page;
