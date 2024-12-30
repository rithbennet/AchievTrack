import prisma from '@/lib/db';
import MetricsCard from './components/MetricsCard';
import VisitorInsights from './components/VisitorInsights'; // Correct import path

export default async function DashboardAdmin() {
  // Fetch metrics data from the database
  const totalUsers = await prisma.user.count();
  const activeUsers = await prisma.user.count({ where: { is_active: true } });
  const pendingApprovals = await prisma.user.count({ where: { role: 'PENDING' } }); // Adjust the condition based on your schema
  const achievements = await prisma.achievementdata.count();

  return (
    <main className="container-fluid">
      {/* Metrics Section */}
      <div className="row my-3">
        <MetricsCard title="Total Users" value={totalUsers} />
        <MetricsCard title="Active Users" value={activeUsers} />
        <MetricsCard title="Pending Approvals" value={pendingApprovals} />
        <MetricsCard title="Achievements" value={achievements} />
      </div>

      {/* Quick Actions Section */}
      <div className="row my-3">
      </div>

      {/* Visitor Insights Section */}
      <div className="row my-3">
        <div className="col">
          <VisitorInsights />
        </div>
      </div>
    </main>
  );
}