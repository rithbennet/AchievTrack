"use client"; // Ensures this is client-side only

import { useState } from "react";
import * as XLSX from "xlsx";
import styles from "../styles/achievement.module.scss";

// Define the type for the template data
interface AchievementTemplate {
  Title: string;
  Category: string;
  Level: string;
  Date: string;
  Description: string;
  Students: string;  // List of student IDs or names, separated by commas
  Teachers: string;  // List of teacher IDs or names, separated by commas
}

const DownloadEmptySpreadsheet = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDownload = () => {
    // Define the column headers for the empty template
    const headers: AchievementTemplate[] = [
      {
        Title: "Achievement Title (e.g., Math Olympiad)",
        Category: "e.g., Academic, Sports",
        Level: "e.g., School, State, National",
        Date: "YYYY-MM-DD (e.g., 2023-12-31)",
        Description: "Brief description (e.g., Won first place in competition)",
        Students: "Comma-separated list of student IDs or names (e.g., 101, 102)",
        Teachers: "Comma-separated list of teacher IDs or names (e.g., T1, T2)",
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

  return (
    <div>
      <button
        className={styles.importButton}
        onClick={() => setIsModalOpen(true)}
      >
        Download Template
      </button>

      {isModalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <h3>Download Empty Template</h3>
            <p>
              Use this template to prepare achievement data for importing. You can later edit or
              add additional details after submission.
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
                onClick={() => setIsModalOpen(false)}
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
