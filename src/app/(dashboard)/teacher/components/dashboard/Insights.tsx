import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Award, Users, GraduationCap } from 'lucide-react';
import prisma from '@/lib/db';
import { auth } from '@/lib/auth';

export default async function Insights() {
  const session = await auth();
  const userId = session?.user?.id as string;

  const achievements = await prisma.achievementdata.count();
  const students = await prisma.student.count();
  const teachers = await prisma.teacher.count();
  const currentTeacherAchievementCreated = await prisma.achievementdata.count({
    where: {
      createdby: parseInt(userId),
    },
  });
  const currentTeacherAchievementInvolved = await prisma.achievementteachers.count({
    where: {
      teacherid: parseInt(userId),
    },
  });

  const insights = [
    { title: 'Total Achievements', value: achievements, icon: Award },
    { title: 'Students', value: students, icon: Users },
    { title: 'Teachers', value: teachers, icon: GraduationCap },
  ];

  return (
    <>
      {insights.map((insight) => (
        <Card key={insight.title}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {insight.title}
            </CardTitle>
            <insight.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <p className="text-lg font-semibold">{insight.value}</p>
          </CardContent>
        </Card>

      ))}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            My Achievements
          </CardTitle>
          <Award className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <p><small>Created:</small> <strong>{currentTeacherAchievementCreated}</strong></p>
          <p><small>Involved:</small> <strong>{currentTeacherAchievementInvolved}</strong></p>
        </CardContent>
      </Card>
    </>
  );
}

