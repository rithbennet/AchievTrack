import { InsightCard } from "./components/insightCard";
import { StudentAchievementGraph } from "./components/student-achievement-graph";
import { TeacherPerformanceGraph } from "./components/teacher-achievement-graph";
import { BarChart3, GraduationCap, Trophy, Users } from 'lucide-react';
import prisma from "@/lib/db";

export default async function Dashboard() {
  const totStudents = await prisma.student.count();
  const totTeachers = await prisma.user.count(
    {
      where: {
        role: "Teacher"
      }
    }
  );
  const totAchievements = await prisma.achievementdata.count();
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
        <InsightCard
          title="Total Students"
          value={totStudents}
          icon={<Users className="h-4 w-4 text-muted-foreground" />}
        />
        <InsightCard
          title="Total Teachers"
          value={totTeachers}
          icon={<GraduationCap className="h-4 w-4 text-muted-foreground" />}
        />
        <InsightCard
          title="Achievements Awarded"
          value={totAchievements}
          icon={<Trophy className="h-4 w-4 text-muted-foreground" />}
        />
        <InsightCard
          title="Average Performance"
          value="85%"
          icon={<BarChart3 className="h-4 w-4 text-muted-foreground" />}
        />
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <StudentAchievementGraph />
        <TeacherPerformanceGraph />
      </div>
    </div>
  );
}

