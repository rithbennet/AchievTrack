/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import * as XLSX from "xlsx";

interface ExcelButtonProps {
  achievements: {
    title: string;
    category: string;
    level: string;
    date: Date;
  }[];
}

const ExcelButton = ({ achievements }: ExcelButtonProps) => {
  const handleExport = () => {
    // Prepare the data for the Excel sheet
    const data: { No: number; Title: string; Category: string; Level: string; Date: string }[] = achievements.map((achievement, index) => ({
      No: index + 1,
      Title: achievement.title,
      Category: achievement.category,
      Level: achievement.level,
      Date: new Date(achievement.date).toDateString(),
    }));

    // Convert data to a worksheet
    const worksheet = XLSX.utils.json_to_sheet(data);

    // Auto-adjust column widths
    const columnWidths = Object.keys(data[0]).map((key: string) => {
      const maxLength = data.reduce(
        (max, row) => Math.max(max, row[key as keyof typeof row]?.toString().length || 0),
        key.length
      );
      return { width: maxLength + 2 }; // Add padding for better readability
    });
    worksheet["!cols"] = columnWidths;

    // Create a workbook and append the worksheet
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Achievements");

    // Export the workbook to an Excel file
    XLSX.writeFile(workbook, "achievement_list.xlsx");
  };

  return (
    <button
      onClick={handleExport}
      style={{
        padding: "10px",
        backgroundColor: "#3b8b2e",
        color: "white",
        border: "none",
        borderRadius: "5px",
      }}
    >
      Export to Excel
    </button>
  );
};

export default ExcelButton;
