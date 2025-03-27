import type { Metadata } from "next";
import SidebarAdmin from '@/components/sidebar/sidebarAdmin';
import Header from '@/components/header/header';
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import styles from '@/styles/dashboard.module.css';

export const metadata: Metadata = {
  title: "AchievTrack",
  description: "SK Saujana Utama achievement tracking system",
};

export default async function AdminDashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  if (!session || session?.user?.role !== "Admin") {
    redirect('/signIn'); // Redirect if not an admin
  }

  const userName = session?.user?.name as string;
  const userRole = session?.user?.role as string;

  return (
    <div className={styles.dashboardContainer}>
      <Header userName={userName} userRole={userRole} />
      <SidebarAdmin userName={userName} />
      <main className={styles.mainContent}>
        {children}
      </main>
    </div>
  );
}
