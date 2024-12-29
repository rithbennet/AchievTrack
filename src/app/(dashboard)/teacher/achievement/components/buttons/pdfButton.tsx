"use client";

import { jsPDF } from "jspdf";
import "jspdf-autotable";

interface PdfButtonProps {
  achievements: {
    title: string;
    category: string;
    level: string;
    date: string;
  }[];
  logoPath: string; // Path to the logo image
}

const PdfButton = ({ achievements, logoPath }: PdfButtonProps) => {
  const handleExport = () => {
    const doc = new jsPDF();
    const schoolLogo = new Image();
    schoolLogo.src = logoPath;

    schoolLogo.onload = () => {
      // Add school logo
      doc.addImage(schoolLogo, "JPEG", 20, 10, 30, 30); // Adjust size and position

      // Add school name
      doc.setFont("helvetica", "bold");
      doc.setFontSize(24);
      doc.text("Sek. Keb Saujana Utama", 60, 30); // Position next to the logo

      // Add title for the table
      doc.setFont("helvetica", "normal");
      doc.setFontSize(16);
      doc.text("Achievement List", 14, 50);

      // Add table headers
      const headers = [["No.", "Title", "Category", "Level", "Date"]];
      const data = achievements.map((achievement, index) => [
        index + 1,
        achievement.title,
        achievement.category,
        achievement.level,
        new Date(achievement.date).toDateString(),
      ]);

      // Use jsPDF autoTable for generating the table
      (doc as any).autoTable({
        head: headers,
        body: data,
        startY: 60, // Adjust starting position based on the logo and school name
      });

      // Save the PDF
      doc.save("achievement_list.pdf");
    };

    schoolLogo.onerror = () => {
      console.error("Failed to load the logo image.");
    };
  };

  return (
    <button
      onClick={handleExport}
      style={{
        padding: "10px",
        backgroundColor: "#623988",
        color: "white",
        border: "none",
        borderRadius: "5px",
      }}
    >
      Export to PDF
    </button>
  );
};

export default PdfButton;
