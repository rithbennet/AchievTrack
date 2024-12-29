import { jsPDF } from "jspdf";
import "jspdf-autotable";

interface Achievement {
  title: string;
  category: string;
  level: string;
  date: Date;
  description: string | null;
}

interface AchievementStudent {
  Student: {
    name: string;
    class: string;
  };
}

interface AchievementTeacher {
  Teacher: {
    User: {
      name: string;
      email: string;
    };
  };
}

export const exportAchievementToPDF = (
  achievement: Achievement,
  students: AchievementStudent[],
  teachers: AchievementTeacher[],
  logoPath: string // Path to the logo image
) => {
  const doc = new jsPDF();

  const schoolLogo = new Image();
  schoolLogo.src = logoPath;

  schoolLogo.onload = () => {
    // Add school logo
    doc.addImage(schoolLogo, "JPEG", 20, 10, 30, 30); // Adjust size and position as necessary

    // Add school name
    doc.setFont("helvetica", "bold");
    doc.setFontSize(24);
    doc.text("Sek. Keb Saujana Utama", 60, 30); // Position to the right of the logo

    // Add a title for the achievement details
    doc.setFont("helvetica", "normal");
    doc.setFontSize(16);
    doc.text("Achievement Details", 14, 50);

    // Achievement details table
    (doc as any).autoTable({
      startY: 60,
      theme: "grid",
      head: [["Field", "Details"]],
      body: [
        ["Title", achievement.title],
        ["Category", achievement.category],
        ["Level", achievement.level],
        ["Date", new Date(achievement.date).toDateString()],
        ["Description", achievement.description || "No description available."],
      ],
    });

    // Associated Students table
    if (students.length > 0) {
      doc.text("Associated Students", 14, (doc as any).lastAutoTable.finalY + 10);
      (doc as any).autoTable({
        startY: (doc as any).lastAutoTable.finalY + 15,
        theme: "striped",
        head: [["No.", "Name", "Class"]],
        body: students.map((student, index) => [
          index + 1,
          student.Student.name,
          student.Student.class,
        ]),
      });
    }

    // Associated Teachers table
    if (teachers.length > 0) {
      doc.text("Associated Teachers", 14, (doc as any).lastAutoTable.finalY + 10);
      (doc as any).autoTable({
        startY: (doc as any).autoTable.previous.finalY + 15,
        theme: "striped",
        head: [["No.", "Name", "Email"]],
        body: teachers.map((teacher, index) => [
          index + 1,
          teacher.Teacher.User.name,
          teacher.Teacher.User.email,
        ]),
      });
    }

    // Add footer
    // const pageCount = doc.internal.pages.length;
    // doc.setFontSize(10);
    // doc.text(
    //   `Page 1 of ${pageCount}`,
    //   doc.internal.pageSize.width - 40,
    //   doc.internal.pageSize.height - 10
    // );

    // Save the PDF
    doc.save("achievement_details.pdf");
  };

  // Handle image loading errors
  schoolLogo.onerror = () => {
    console.error("Failed to load the logo image.");
  };
};
