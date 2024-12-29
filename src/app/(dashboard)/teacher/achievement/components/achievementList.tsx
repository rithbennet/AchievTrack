import prisma from "@/lib/db";
import styles from "../styles/achievement.module.scss";
import PaginationComponent from "./Pagination";
import ViewButton from "./buttons/viewButton";
import EditButton from "./buttons/editButton";
import DeleteButton from "./buttons/deleteButton";
import PdfButton from "./buttons/pdfButton";
// import ExportButton from "./buttons/exportButton";

interface AchievementListProps {
  query: string;
  currentPage: number;
}

const ITEMS_PER_PAGE = 5;

export default async function AchievementList({ query, currentPage }: AchievementListProps) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  const achievements = await prisma.achievementdata.findMany({
    where: {
      title: {
        contains: query,
        mode: "insensitive",
      },
    },
    include: {
      achievementstudents: {
        include: {
          Student: true, // Include student details
        },
      },
      achievementteachers: {
        include: {
          Teacher: {
            include: {
              User: true, // Fetch teacher's details from User model
            },
          },
        },
      },
    },
    skip: offset,
    take: ITEMS_PER_PAGE,
  });

  // Getting the total count for pagination
  const totalAchievements = await prisma.achievementdata.count();
  const totalPages = Math.ceil(totalAchievements / ITEMS_PER_PAGE);

  return (
    <div className={styles.achievementListSection}>
      <table className={styles.achievementTable}>
        <thead>
          <tr>
            <th>Title</th>
            <th>Category</th>
            <th>Level</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {achievements.map((achievement) => (
            <tr key={achievement.id}>
              <td>{achievement.title}</td>
              <td>{achievement.category}</td>
              <td>{achievement.level}</td>
              <td>{new Date(achievement.date).toDateString()}</td>
              <td>
                <div className={styles.actionButtons}>
                  <ViewButton achievement={achievement} students={achievement.achievementstudents} teachers={achievement.achievementteachers} />
                  <EditButton achievement={achievement} students={achievement.achievementstudents} teachers={achievement.achievementteachers} />
                  <DeleteButton achievementId={achievement.id} />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <PaginationComponent pageCount={totalPages} />
      <PdfButton achievements={achievements}
        logoPath="/logo.png" // Replace with the actual path to your logo
      />
    </div>
  );
}
