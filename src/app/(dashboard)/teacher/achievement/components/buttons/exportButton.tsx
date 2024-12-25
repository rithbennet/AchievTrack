import { jsPDF } from "jspdf";
import { Achievement, AchievementStudent, AchievementTeacher } from "../types"; // Adjust path as necessary

export const exportAchievementToPDF = (
  achievement: Achievement,
  students: AchievementStudent[],
  teachers: AchievementTeacher[],
  logoPath: string // Path to the logo image
) => {
  const doc = new jsPDF();

//   // Set gold background color
//   const certColor = [204,204,255]; 

//   // Create a gold background rectangle (covers the whole page)
//   doc.setFillColor(certColor[0], certColor[1], certColor[2]); 
//   doc.rect(0, 0, doc.internal.pageSize.width, doc.internal.pageSize.height, "F"); // 'F' stands for filling the rectangle

  // Add school logo (simulating <Image> usage in a PDF context)
  const schoolLogo = new Image();
  schoolLogo.src = logoPath;

  schoolLogo.onload = () => {
    // Add school logo to PDF once loaded
    doc.addImage(schoolLogo, "JPEG", 20, 10, 30, 30); // Adjust size and position as necessary

    // Add school name
    doc.setFont("helvetica", "bold");
    doc.setFontSize(24);
    doc.text("Sek. Keb Saujana Utama", 60, 30); // Position to the right of the logo

    // Add a title for the achievement details section
    doc.setFont("helvetica", "normal");
    doc.setFontSize(14);
    doc.text("Achievement Details", 20, 50);
    doc.setLineWidth(0.5);
    doc.line(20, 52, 65, 52); // Underline the text

    // Add achievement details with some spacing and styling
    doc.setFontSize(12);
    doc.text(`Title: ${achievement.title}`, 20, 70);
    doc.text(`Category: ${achievement.category}`, 20, 80);
    doc.text(`Level: ${achievement.level}`, 20, 90);
    doc.text(`Date: ${new Date(achievement.date).toDateString()}`, 20, 100);
    doc.text(`Description:`, 20, 110);
    doc.setFontSize(11);
    doc.text(`${achievement.description || "No description available."}`, 20, 115, { maxWidth: 170 });
    doc.setFontSize(12);

    // Add section for associated students
    doc.setFontSize(14);
    doc.text("Associated Students:", 20, 140);
    students.forEach((student, index) => {
      doc.setFontSize(12);
      doc.text(
        `Student ${index + 1}: ${student.Student.name} - Class: ${student.Student.class}`,
        20,
        150 + index * 10
      );
    });

    // Add section for associated teachers
    doc.setFontSize(14);
    doc.text("Associated Teachers:", 20, 160 + students.length * 10);
    teachers.forEach((teacher, index) => {
      doc.setFontSize(12);
      doc.text(
        `Teacher ${index + 1}: ${teacher.Teacher.User.name} - Email: ${teacher.Teacher.User.email}`,
        20,
        170 + students.length * 10 + index * 10
      );
    });

    // Add footer with page number
    doc.setFontSize(10);
    const totalPages = doc.internal.pages.length;
    doc.text(`Page 1 of ${totalPages}`, doc.internal.pageSize.width - 40, doc.internal.pageSize.height - 10);

    // Save the PDF
    doc.save("achievement_details.pdf");
  };

  // Handle image loading errors
  schoolLogo.onerror = () => {
    console.error("Failed to load the logo image.");
  };
};
