import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const queryIds = searchParams.get("ids"); // Get 'ids' query parameter

  // If neither 'name' nor 'ids' is provided, return a 400 error
    if (!queryIds) {
        return NextResponse.json(
        { error: "Query parameter 'ids' is required" },
        { status: 400 }
        );
    }
    try {

    // If 'ids' is provided, search students by IDs

      const ids = queryIds.split(",").map((id) => parseInt(id, 10)); // Convert the IDs into an array of integers
    const achievements = await prisma.achievementstudents.findMany({
      where: {
        studentid: {
          in: ids
        }
      },
      select: {
        achievementid: true,
        studentid: true
      }
    });

    const achievementList = await prisma.achievementdata.findMany({
        where: {
          id: {
            in: achievements.map(a => a.achievementid)
          }
        }
      });

    


    // Return the list of students found in JSON format
    return NextResponse.json({ achievementList }, { status: 200 });
  } catch (error) {
    // Log the error and return a 500 error if something goes wrong
    console.error(error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}