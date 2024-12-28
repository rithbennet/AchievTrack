import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const query = searchParams.get("name");
  const queryIds = searchParams.get("ids");

  if (!query && !queryIds) {
    return NextResponse.json(
      { error: "Missing query parameter" },
      { status: 400 }
    );
  }

  try {
    let students;

    if (queryIds) {
      const ids = queryIds.split(",").map((id) => parseInt(id, 10));
      students = await prisma.student.findMany({
        where: {
          id: {
            in: ids,
          },
          is_active: true,
        },
        select: {
          id: true,
          name: true,
          class: true,
          mykad: true,
        },
      });
    } else if (query) {
      students = await prisma.student.findMany({
        where: {
          name: {
            contains: query,
            mode: "insensitive",
          },
          is_active: true,
        },
        select: {
          id: true,
          name: true,
          class: true,
          mykad: true,
        },
      });
    }

    return NextResponse.json({ students }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
