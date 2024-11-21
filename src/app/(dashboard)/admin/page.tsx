"use client"; // Client-side component

import React, { useEffect, useState } from 'react';
import MetricsCard from './components/MetricsCard'; // Correct import path
import QuickActionCard from './components/QuickActionCard'; // Correct import path
import VisitorInsights from './components/VisitorInsights'; // Correct import path

interface Metrics {
  totalUsers: number;
  activeUsers: number;
  pendingApprovals: number;
  achievements: number;
}

const DashboardAdmin: React.FC = () => {
  const [metrics, setMetrics] = useState<Metrics>({
    totalUsers: 0,
    activeUsers: 0,
    pendingApprovals: 0,
    achievements: 0,
  });

  useEffect(() => {
    fetch('/api/dashboard-metrics')
      .then((res) => res.json())
      .then((data) => setMetrics(data))
      .catch((err) => console.error('Error fetching metrics:', err));
  }, []);

  return (
    <main className="container-fluid">
      {/* Metrics Section */}
      <div className="row my-3">
        <MetricsCard title="Total Users" value={metrics.totalUsers} />
        <MetricsCard title="Active Users" value={metrics.activeUsers} />
        <MetricsCard title="Pending Approvals" value={metrics.pendingApprovals} />
        <MetricsCard title="Achievements" value={metrics.achievements} />
      </div>

      {/* Quick Actions Section */}
      <div className="row my-3">
        <QuickActionCard title="Add New User" onClick={() => alert('Redirect to Add User')} />
        <QuickActionCard title="Add Achievement" onClick={() => alert('Redirect to Add Achievement')} />
        <QuickActionCard title="Verify Achievement" onClick={() => alert('Redirect to Verify Achievement')} />
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

export default DashboardAdmin;