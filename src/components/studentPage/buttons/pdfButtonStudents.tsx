'use client';

import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

interface PdfButtonStudentsProps {
  students: {
    name: string;
    mykad: string;
    class: string;
    is_active: boolean | null;
  }[];
  logoPath: string; // Path to the logo image
}

export default function PdfButtonStudents({ students, logoPath }: PdfButtonStudentsProps) {
  const [open, setOpen] = useState(false);

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
      doc.text("Student List", 14, 50);

      // Add table headers
      const headers = [["No.", "Name", "MyKad", "Class", "Status"]];
      const data = students.map((student, index) => [
        index + 1,
        student.name,
        student.mykad,
        student.class,
        student.is_active ? "Active" : "Inactive",
      ]);

      // Use jsPDF autoTable for generating the table
      autoTable(doc, {
        head: headers,
        body: data,
        startY: 60, // Adjust starting position based on the logo and school name
      });

      // Save the PDF
      doc.save("student_list.pdf");
    };

    schoolLogo.onerror = () => {
      console.error("Failed to load the logo image.");
    };

    setOpen(false); // Close dialog after export
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Export PDF</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Export Student List</DialogTitle>
        </DialogHeader>
        <div className="py-4">
          Are you sure you want to export the student list to a PDF file?
        </div>
        <DialogFooter>
          <Button onClick={() => setOpen(false)} variant="secondary">
            Cancel
          </Button>
          <Button onClick={handleExport}>Export</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
