import type { Metadata } from "next";
import SidebarAdmin from '@/components/sidebar/sidebarAdmin'; // Ensure the correct path to your SidebarAdmin component
import Header from '@/components/header/header'; 
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";


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

  if (!session || session?.user?.role !== "Admin") { // if not admin or no session
    redirect('/signIn'); // Redirect if not an admin
  }

  const userName = session?.user?.name as string;
  const userRole = session?.user?.role as string;

  return (
    <>
      <Header userName={userName} userRole={userRole} />
      <SidebarAdmin userName={userName} />
      <main className="flex flex-col h-full p-4">
        {children}
      </main>
    </>
  );
}
