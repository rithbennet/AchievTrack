import type { Metadata } from "next";
import SidebarAdmin from '@/app/components2/sidebar/sidebarAdmin'; // Ensure the correct path to your SidebarAdmin component
import Header from '@/app/components2/header/header'; 


export const metadata: Metadata = {
  title: "AchievTrack",
  description: "SK Saujana Utama achievement tracking system",
};

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header userName="Admin" userRole="Administrator" />
      <SidebarAdmin userName="Admin" />
      {children}
    </>
  );
}
