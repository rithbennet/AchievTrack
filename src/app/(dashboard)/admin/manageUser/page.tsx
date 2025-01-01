import React from 'react';
import UserTable from './components/userTable';
import prisma from '@/lib/db';

export default async function page() {
  const users = await prisma.user.findMany(
    {
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        password: true,
        is_active: true,
        created_at: true,
      },
      orderBy: {
        created_at: 'desc',
      },
    },
  );
  return (
    <div>
      <h1>Manage Users</h1>
      <UserTable UserData={users} />
    </div>
  );
}
