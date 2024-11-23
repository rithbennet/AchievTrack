// components/AdminGuard.tsx
"use client"; // Add this directive at the top

import { useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';

interface AdminGuardProps {
  children: ReactNode;
  isAdmin: boolean;
}

export default function AdminGuard({ children, isAdmin }: AdminGuardProps) {
  const router = useRouter();

  useEffect(() => {
    if (!isAdmin) {
      router.push('/'); // Redirect if not an admin
    }
  }, [isAdmin, router]);

  return isAdmin ? <>{children}</> : null;
};

