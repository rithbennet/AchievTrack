// 


"use client"; // Ensures this is client-side only

import React, { useState } from "react";
import * as XLSX from "xlsx";
import styles from "../styles/achievement.module.scss";

// Define the type for the template data
interface AchievementTemplate {
  Title: string;
  Organizer: string;
  Category: string;
  Level: string;
  Date: string;
  Description: string;
}

const DownloadEmptySpreadsheet: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDownload = () => {
    // Define the column headers for the empty template
    const headers: AchievementTemplate[] = [
      {
        Title: "Achievement Title (e.g., Math Olympiad)",
        Organizer: "e.g., School Name, Organization Name",
        Category: "e.g., Academic, Sports",
        Level: "e.g., School, State, National",
        Date: "YYYY-MM-DD (e.g., 2023-12-31)",
        Description: "Brief description (e.g., Won first place in competition)",
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
    const range = XLSX.utils.decode_range(worksheet["!ref"] || "");
    const colWidths = Array.from({ length: range.e.c + 1 }).map((_, colIdx) => {
      const columnKey = XLSX.utils.encode_col(colIdx);
      let maxWidth = 10;

      for (let rowIdx = range.s.r; rowIdx <= range.e.r; rowIdx++) {
        const cellAddress = `${columnKey}${rowIdx + 1}`;
        const cell = worksheet[cellAddress];
        if (cell && cell.v) {
          const valueLength = cell.v.toString().length;
          maxWidth = Math.max(maxWidth, valueLength);
        }
      }

      return maxWidth + 2; // Add padding
    });

    worksheet["!cols"] = colWidths.map((wch) => ({ wch })); // Adjust column widths
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <button className={styles.importButton} onClick={handleOpenModal}>
        Download Template
      </button>

      {isModalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <h3>Download Achievement Template</h3>
            <p>
              Use this template to prepare achievement data for importing. Fill in the required
              fields and ensure all dates are in the correct format.
            </p>
            <div className={styles.actions}>
              <button
                className={styles.submitButton}
                onClick={handleDownload}
              >
                Download
              </button>
              <button
                className={styles.cancelButton}
                onClick={handleCloseModal}
              >
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
