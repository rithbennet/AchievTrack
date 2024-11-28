import type { Metadata } from "next";
import SidebarAdmin from '@/components/sidebar/sidebarAdmin'; // Ensure the correct path to your SidebarAdmin component
import Header from '@/components/header/header'; 
import AdminGuard from "./components/AdminGuard";
import { auth } from "@/lib/auth";


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

  if (!session) {
    // Handle the case where there is no session
    return <div>Loading...</div>;
  }

  const userName = session?.user?.name as string;
  const userRole = session?.user?.role as string;

  return (
    <AdminGuard>
      <Header userName={userName} userRole={userRole} />
      <SidebarAdmin userName={userName} />
      {children}
    </AdminGuard>
  );
}
