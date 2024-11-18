// components/AdminGuard.tsx
"use client"; // Add this directive at the top

import { useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';

interface AdminGuardProps {
  children: ReactNode;
  isAdmin: boolean;
}

const AdminGuard: React.FC<AdminGuardProps> = ({ children, isAdmin }) => {
  const router = useRouter();

  useEffect(() => {
    if (!isAdmin) {
      router.push('/'); // Redirect if not an admin
    }
  }, [isAdmin, router]);

  return isAdmin ? <>{children}</> : null;
};

export default AdminGuard;
