"use client"; // Ensures this is a Client Component

import { useState } from "react";
import * as XLSX from "xlsx";
import styles from "../../styles/achievement.module.scss";

const DownloadEmptySpreadsheet = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDownload = () => {
    // Define the updated column headers and sample data
    const headers = [
      {
        Title: "Achievement Title",
        Category: "e.g., Academic, Sports",
        Level: "e.g., School, State, National",
        // Certificate: "Provide file name or URL if applicable",
        Date: "YYYY-MM-DD",
        Description: "Brief description of the achievement",
        // AssociatedStudents: "Comma-separated student IDs (e.g., 1,2,3)",
        // AssociatedTeachers: "Comma-separated teacher IDs (e.g., 4,5)",
      },
    ];

    // Convert headers to a worksheet
    const worksheet = XLSX.utils.json_to_sheet(headers);

    // Create a new workbook and append the worksheet
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Achievements Template");

    // Adjust column widths
    autoFitColumns(worksheet);

    // Generate the file and trigger download
    XLSX.writeFile(workbook, "AchievementsTemplate.xlsx");

    setIsModalOpen(false); // Close the modal after download
  };

  const autoFitColumns = (worksheet: XLSX.WorkSheet) => {
    const columns = Object.keys(worksheet).filter((key) => key[0] !== "!");
    const columnWidths = columns.map((key) => {
      const column = worksheet[key];
      return column ? column.v.toString().length : 10;
    });

    const maxColumnWidths = columns.reduce((acc, key, index) => {
      const col = key.replace(/[0-9]/g, "");
      acc[col] = Math.max(acc[col] || 0, columnWidths[index]);
      return acc;
    }, {} as { [key: string]: number });

    worksheet["!cols"] = Object.keys(maxColumnWidths).map((key) => ({
      wch: maxColumnWidths[key] + 2,
    }));
  };

  return (
    <div>
      <button className={styles.importButton} onClick={() => setIsModalOpen(true)}>
        Download Template
      </button>

      {isModalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <h3>Download Empty Template</h3>
            <p>
              This template helps you add new achievements.
            </p>
            <div className={styles.actions}>
              <button className={styles.submitButton} onClick={handleDownload}>
                Download
              </button>
              <button className={styles.cancelButton} onClick={() => setIsModalOpen(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DownloadEmptySpreadsheet;
