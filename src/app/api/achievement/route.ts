import prisma from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function POST(req: NextRequest) {
  const { title, category, level, date, description, students, teachers } = await req.json();

  try {
    const achievement = await prisma.achievementdata.create({
      data: {
        title,
        category,
        level,
        date: new Date(date),
        description,
        achievementstudents: {
          create: students.map((studentId: any) => ({
            studentid: studentId,
          })),
        },
        achievementteachers: {
          create: teachers.map((teacherId: any) => ({
            teacherid: teacherId,
          })),
        },
      },
    });
    return new Response(JSON.stringify(achievement), { status: 201 });
  } catch (error) {
    console.error('Error creating achievement:', error);
    return new Response('Error creating achievement', { status: 500 });
  }
}

export async function DELETE(req: NextRequest, res: NextResponse) {
  const { id } = await req.json();


    try {
      await prisma.achievementdata.delete({
        where: {
          id: Number(id)
        },
      });
      return new Response(null, { status: 204 });
    } catch (error) {
      console.error('Error deleting achievement:', error);
      return new Response('Error deleting achievement', { status: 500 });
    }
  

}