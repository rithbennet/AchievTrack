// pages/api/uploadExcel/route.ts
import { NextRequest } from "next/server";
import prisma from "@/lib/db"; // Import prisma instance

// Define an interface for the Excel row
interface ExcelRow {
  Title: string;
}

export async function POST(request: NextRequest) {
  if (!request.body) {
    throw new Error("Request body is null");
  }

  const body = await request.json();
  const { data } = body;

  // Process the data as needed
  console.log("Processing data:", data);

  // Save the data to the database
  await prisma.achievementdata.createMany({
    data: data.map((row: ExcelRow) => ({ data: row })),
  });
}
