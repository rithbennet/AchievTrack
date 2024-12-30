import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import prisma from '@/lib/db';



export default async function RecentActivities() {
  const recentActivity = await prisma.achievementdata.findMany({
    take: 4,
    orderBy: {
      date: 'desc',
    },
  }); 

  const recentActivities = recentActivity.map((activity) => ({
    id: activity.id,
    level: activity.level,
    achievement: activity.title,
    date: new Date(activity.date).toLocaleDateString('en-GB'), // Format date to day-month-year
  }));

  return (
    <Card className="col-span-1">
      <CardHeader>
        <CardTitle>Recent Activities</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          {recentActivities.map((activity) => (
            <div key={activity.id} className="flex items-center">
              <div className="space-y-1">
                <p className="text-sm font-medium leading-none">{activity.achievement}</p>
                <p className="text-sm text-muted-foreground">{activity.level}</p>
              </div>
              <div className="ml-auto font-medium">{activity.date}</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

