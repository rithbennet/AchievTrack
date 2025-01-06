/* eslint-disable @typescript-eslint/no-explicit-any */
import { jsPDF } from "jspdf";
import "jspdf-autotable";

interface Achievement {
  title: string;
  date: Date;
  category: string;
  level: string;
  description: string | null;
}

interface Student {
  name: string;
  class: string;
  mykad: string;
  achievementstudents: { achievementdata: Achievement }[];
}

export const exportStudentToPDF = (studentData: Student, logoPath: string) => {
  const doc = new jsPDF();

  const schoolLogo = new Image();
  schoolLogo.src = logoPath;

  schoolLogo.onload = () => {
    // Add school logo
    doc.addImage(schoolLogo, "JPEG", 20, 10, 30, 30); // Adjust size and position

    // Add school name
    doc.setFont("helvetica", "bold");
    doc.setFontSize(24);
    doc.text("Sek. Keb Saujana Utama", 60, 30); // Adjust position as needed

    // Add student details
    doc.setFont("helvetica", "normal");
    doc.setFontSize(16);
    doc.text("Student Details", 14, 50);

    (doc as any).autoTable({
      startY: 60,
      theme: "grid",
      head: [["Field", "Details"]],
      body: [
        ["Name", studentData.name],
        ["Class", studentData.class],
        ["MYKAD", studentData.mykad],
      ],
    });

    // Add achievements if any
    if (studentData.achievementstudents.length > 0) {
      doc.text("Achievements", 14, (doc as any).lastAutoTable.finalY + 10);

      (doc as any).autoTable({
        startY: (doc as any).lastAutoTable.finalY + 15,
        theme: "striped",
        head: [["No.", "Title", "Level", "Category", "Date", "Description"]],
        body: studentData.achievementstudents.map(({ achievementdata }, index) => [
          index + 1,
          achievementdata.title,
          achievementdata.level,
          achievementdata.category,
          new Date(achievementdata.date).toDateString(),
          achievementdata.description || "No description",
        ]),
      });
    }

    // Save the PDF
    doc.save(`${studentData.name}_details.pdf`);
  };

  // Handle image loading errors
  schoolLogo.onerror = () => {
    console.error("Failed to load the logo image.");
  };
};
