import type { Metadata } from "next";
import SidebarTeacher from '@/components/sidebar/sidebarTeacher';
import Header from '@/components/header/header';
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import styles from '@/styles/dashboard.module.css';

export const metadata: Metadata = {
  title: "AchievTrack",
  description: "SK Saujana Utama achievement tracking system",
};

export default async function TeacherDashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  if (!session || session?.user?.role !== "Teacher") {
    redirect('/signIn'); // Redirect if not a teacher
  }

  const userName = session?.user?.name as string;
  const userRole = session?.user?.role as string;

  return (
    <div className={styles.dashboardContainer}>
      <Header userName={userName} userRole={userRole} />
      <SidebarTeacher userName={userName} />
      <main className={styles.mainContent}>
        {children}
      </main>
    </div>
  );
}
