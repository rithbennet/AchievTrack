import { Metadata } from "next";
import QuickLinks from './components/dashboard/QuickLinks';
import Insights from './components/dashboard/Insights';
import RecentActivities from './components/dashboard/RecentActivities';
import AchievementTrends from './components/dashboard/AchievementTrends';

export const metadata: Metadata = {
  title: 'Teacher Dashboard',
  description: 'Dashboard for managing student achievements and school activities',
};

export default async function DashboardPage() {
  return (
    <div className="container mx-auto p-6">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-5">
        <QuickLinks />
        <Insights />
      </div>
      <div className="mt-6 grid gap-6 md:grid-cols-2">
        <RecentActivities />
        <AchievementTrends />
      </div>
    </div>
  );
}
