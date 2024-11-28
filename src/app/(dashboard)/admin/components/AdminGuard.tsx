
import { ReactNode } from 'react';
import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';

interface AdminGuardProps {
  children: ReactNode;
}

const AdminGuard = async ({ children }: AdminGuardProps) => {
  const session = await auth();

  if (!session || session?.user?.role !== "Admin") {
    redirect('/signIn'); // Redirect if not an admin
  }

  return <>{children}</>;
};

export default AdminGuard;

