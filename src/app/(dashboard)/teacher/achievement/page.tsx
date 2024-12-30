import React from 'react';
import prisma from '@/lib/db';
import Achievementtable from './components/table/achievementTable';

export default async function table() {

  const achievements = await prisma.achievementdata.findMany({
    where: {
      title: {
        mode: "insensitive",
      },
    },
    include: {
      achievementstudents: {
        include: {
          Student: true, // Include student details
        },
      },
      achievementteachers: {
        include: {
          Teacher: {
            include: {
              User: true, // Fetch teacher's details from User model
            },
          },
        },
      },
    },
    orderBy: {
      date: 'desc',
    },
  });

  return (
    <div>
    <h1>Achievement Records</h1>
    <Achievementtable achievementData={achievements}/>    
    </div>
  );
}
