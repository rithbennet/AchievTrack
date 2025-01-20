// // pages/api/uploadExcel/route.ts
// import { NextRequest } from "next/server";
// import prisma from "@/lib/db"; // Import prisma instance

// // Define an interface for the Excel row
// interface ExcelRow {
//   Title: string;
// }

// export async function POST(request: NextRequest) {
//   if (!request.body) {
//     throw new Error("Request body is null");
//   }

//   const body = await request.json();
//   const { data } = body;

//   // Process the data as needed
//   console.log("Processing data:", data);

//   // Save the data to the database
//   await prisma.achievementdata.createMany({
//     data: data.map((row: ExcelRow) => ({ data: row })),
//   });
// }

import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db"; // Import prisma instance

interface AchievementData {
  title: string;
  organizer: string | null;
  category: string;
  level: string;
  date: string;
  description: string;
  createdby: number;
  students: number[];
  teachers: number[];
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { createdby, data }: { createdby: number; data: AchievementData[] } = body;

    if (!createdby || !data || !Array.isArray(data)) {
      return NextResponse.json(
        { message: "Invalid request payload. 'createdby' and 'data' are required." },
        { status: 400 }
      );
    }
    
    const validDate = (dateStr: string) => {
      const date = new Date(dateStr);
      return !isNaN(date.getTime());
    };

    const achievements = data.map((row) => {
      if (!row.title || !row.category || !row.level || !row.date || !row.description) {
        throw new Error(`Missing required fields in achievement: ${JSON.stringify(row)}`);
      }

      if (!validDate(row.date)) {
        throw new Error(`Invalid date format for achievement: ${row.title}`);
      }

      return {
        title: row.title,
        organizer: row.organizer || "",
        category: row.category,
        level: row.level,
        date: new Date(row.date),
        description: row.description,
        createdby,
        achievementstudents: {
          create: row.students.map((studentId) => ({ studentid: studentId })),
        },
        achievementteachers: {
          create: row.teachers.map((teacherId) => ({ teacherid: teacherId })),
        },
      };
    });

    await prisma.$transaction(
      achievements.map((achievement) =>
        prisma.achievementdata.create({ data: achievement })
      )
    );

    return NextResponse.json(
      { message: "Achievements imported successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error importing achievements:", error);

    return NextResponse.json(
      {
        message: "Error importing achievements",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}



