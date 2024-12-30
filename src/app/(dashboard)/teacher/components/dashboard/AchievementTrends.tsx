'use client';

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Jan', achievements: 65 },
  { name: 'Feb', achievements: 59 },
  { name: 'Mar', achievements: 80 },
  { name: 'Apr', achievements: 81 },
  { name: 'May', achievements: 56 },
];

export default function AchievementTrends() {
  return (
    <Card className="col-span-1">
      <CardHeader>
        <CardTitle>Achievement Trends</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="achievements" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

