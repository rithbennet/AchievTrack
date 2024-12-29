import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const query = searchParams.get("name"); // Get 'name' query parameter
  const queryIds = searchParams.get("ids"); // Get 'ids' query parameter

  // If neither 'name' nor 'ids' is provided, return a 400 error
  if (!query && !queryIds) {
    return NextResponse.json(
      { error: "Missing query parameter" },
      { status: 400 }
    );
  }

  try {
    let students;

    // If 'ids' is provided, search students by IDs
    if (queryIds) {
      const ids = queryIds.split(",").map((id) => parseInt(id, 10)); // Convert the IDs into an array of integers
      students = await prisma.student.findMany({
        where: {
          id: {
            in: ids, // Match students with the provided IDs
          },
          is_active: true, // Ensure the student is active
        },
        select: {
          id: true,
          name: true,
          class: true,
          mykad: true,
        },
      });
    } 
    // If 'name' is provided, search students by name (case insensitive)
    else if (query) {
      students = await prisma.student.findMany({
        where: {
          name: {
            contains: query, // Match students whose name contains the query string
            mode: "insensitive", // Case-insensitive search
          },
          is_active: true, // Ensure the student is active
        },
        select: {
          id: true,
          name: true,
          class: true,
          mykad: true,
        },
      });
    }

    // Return the list of students found in JSON format
    return NextResponse.json({ students }, { status: 200 });
  } catch (error) {
    // Log the error and return a 500 error if something goes wrong
    console.error(error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}