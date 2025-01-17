import prisma from "@/lib/db";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const achievements = await req.json(); // Expecting an array of achievement objects

  try {
    const createdAchievements = await prisma.achievementdata.createMany({
      data: achievements.map((achievement: any) => ({
        title: achievement.title,
        category: achievement.category,
        level: achievement.level,
        date: new Date(achievement.date),
        description: achievement.description || null, // Set description to null if not provided
        createdby: achievement.createdby,
        achievementstudents: {
          create: achievement.students ? achievement.students.map((studentId: number) => ({
            studentid: studentId,
          })) : [], // Set to empty array if no students
        },
        achievementteachers: {
          create: achievement.teachers ? achievement.teachers.map((teacherId: number) => ({
            teacherid: teacherId,
          })) : [], // Set to empty array if no teachers
        },
      })),
    });
    return new Response(JSON.stringify(createdAchievements), { status: 201 });
  } catch (error) {
    console.error("Error creating achievements:", error);
    return new Response("Error creating achievements", { status: 500 });
  }
}
