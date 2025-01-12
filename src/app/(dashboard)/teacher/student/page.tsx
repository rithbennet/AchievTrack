import React from 'react';
import prisma from '@/lib/db';
import StudentTable from './studentTable';

export default async function student() {
  const student = await prisma.student.findMany({
    where: {
      name: {
        mode: "insensitive",
      },
    },
    include: {
      achievementstudents: {
        include: {
          achievementdata: {
            select: {
              id: true,
              createdby: true,
              title: true,
              category: true,
              level: true,
              certificate: true,
              date: true,
              description: true,
            },
          },
        },
      },
    },
    orderBy: {
      created_at: 'asc',
    },
  });

  const existingMyKads = student.map((student) => student.mykad);



  return (
    <div>
      <h1>Students</h1>
      <StudentTable studentData={student} existingMyKads={existingMyKads} />
    </div>
  );
}
