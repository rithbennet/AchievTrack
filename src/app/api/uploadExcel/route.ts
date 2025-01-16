// pages/api/uploadExcel/route.ts
import { NextRequest, NextResponse } from 'next/server';
import * as XLSX from 'xlsx';
import prisma from '@/lib/db'; // Import prisma instance

// Define an interface for the Excel row
interface ExcelRow {
  title: string;
  category: string;
  level: string;
  date: string;  // We'll convert this to a Date object
  description: string;
  students?: number[];  // Optional array of student IDs
  teachers?: number[];  // Optional array of teacher IDs
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('excelFile') as File;

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    // Read the uploaded file as binary string
    const buffer = await file.arrayBuffer();
    const workbook = XLSX.read(buffer, { type: 'array' });

    // Parse the first sheet of the workbook into JSON
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const jsonData: ExcelRow[] = XLSX.utils.sheet_to_json(sheet);

    // Map the data into the format expected by your database
    const formattedData = jsonData.map((row) => ({
      title: row.title,
      category: row.category,
      level: row.level,
      date: new Date(row.date), // Convert to Date object
      description: row.description,
      createdby: 1,  // Assuming createdby is a fixed user ID or can be dynamically set
      achievementstudents: {
        create: row.students?.map((studentId: number) => ({
          studentid: studentId,
        })) || [],
      },
      achievementteachers: {
        create: row.teachers?.map((teacherId: number) => ({
          teacherid: teacherId,
        })) || [],
      },
    }));

    // Insert the parsed and formatted data into the database using Prisma
    const createdAchievements = await prisma.achievementdata.createMany({
      data: formattedData,
    });

    return NextResponse.json({ success: true, data: createdAchievements }, { status: 200 });
  } catch (error) {
    console.error('Error processing the Excel file:', error);
    return NextResponse.json({ error: 'Error processing the Excel file' }, { status: 500 });
  }
}
