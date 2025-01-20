import prisma from "@/lib/db";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const {
    title,
    organizer,
    category,
    level,
    date,
    description,
    createdby,
    students,
    teachers,
  } = await req.json();

  try {
    const achievement = await prisma.achievementdata.create({
      data: {
        title,
        organizer,
        category,
        level,
        date: new Date(date),
        description,
        createdby,
        achievementstudents: {
          create: students.map((studentId: number) => ({
            studentid: studentId,
          })),
        },
        achievementteachers: {
          create: teachers.map((teacherId: number) => ({
            teacherid: teacherId,
          })),
        },
      },
    });

    await prisma.notification.create({
      data: {
        type: "VerifyRequest",
        from: createdby,
        created_at: new Date(),
      },
    });

    return new Response(JSON.stringify(achievement), { status: 201 });
  } catch (error) {
    console.error("Error creating achievement:", error);
    return new Response("Error creating achievement", { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  const { id } = await req.json();

  try {
    await prisma.achievementdata.delete({
      where: {
        id: Number(id),
      },
    });
    return new Response(null, { status: 204 });
  } catch (error) {
    console.error("Error deleting achievement:", error);
    return new Response("Error deleting achievement", { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  const {
    id,
    title,
    organizer,
    category,
    level,
    date,
    description,
    students,
    teachers,
  } = await req.json();

  try {
    const achievement = await prisma.achievementdata.update({
      where: {
        id: Number(id),
      },
      data: {
        title,
        category,
        organizer,
        level,
        date: new Date(date),
        description,
        achievementstudents: {
          deleteMany: {},
          create: students.map((studentId: number) => ({
            studentid: studentId,
          })),
        },
        achievementteachers: {
          deleteMany: {},
          create: teachers.map((teacherId: number) => ({
            teacherid: teacherId,
          })),
        },
        verified: false,
      },
    });

    const editcreatedby = await prisma.achievementdata.findUnique({
      where: {
        id: Number(id),
      },
      select: {
        createdby: true,
      },
    });

    if (!editcreatedby) {
      throw new Error("Achievement data not found");
    }

    const createdBy = editcreatedby.createdby;

    if (createdBy === null) {
      throw new Error("CreatedBy is null");
    }

    await prisma.notification.create({
      data: {
        type: "EditedVerifyRequest",
        from: createdBy, // Use the extracted createdBy variable
        created_at: new Date(),
      },
    });

    return new Response(JSON.stringify(achievement), { status: 200 });
  } catch (error) {
    console.error("Error updating achievement:", error);
    return new Response("Error updating achievement", { status: 500 });
  }
}
