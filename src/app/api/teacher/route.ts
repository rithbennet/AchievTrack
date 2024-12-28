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
    let teachers;

    if (queryIds) {
      const ids = queryIds.split(",").map((id) => parseInt(id, 10));
      teachers = await prisma.user.findMany({
        where: {
          id: {
            in: ids,
          },
          role: "Teacher",
          is_active: true,
        },
        select: {
          id: true,
          name: true,
          email: true,
        },
      });
    } else if (query) {
      teachers = await prisma.user.findMany({
        where: {
          AND: [
            {
              name: {
                contains: query,
                mode: "insensitive",
              },
            },
            {
              role: "Teacher",
            },
            {
              is_active: true,
            },
          ],
        },
        select: {
          id: true,
          name: true,
          email: true,
        },
      });
    }
    return NextResponse.json({ teachers }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
