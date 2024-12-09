import prisma from "@/lib/db";
import styles from "../styles/achievement.module.scss";
import PaginationComponent from "./Pagination";

interface AchievementListProps {
  query: string;
  currentPage: number;
}

const ITEMS_PER_PAGE = 10;

export default async function AchievementList({ query, currentPage }: AchievementListProps) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  // Fetching achievements based on search query
  const achievements = await prisma.achievementdata.findMany({
    where: {
      title: {
        contains: query,
        mode: "insensitive", // Case-insensitive search
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
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {achievements.map((achievement) => (
            <tr key={achievement.id}>
              <td>{achievement.title}</td>
              <td>{achievement.category}</td>
              <td>{achievement.level}</td>
              <td>
                <div className={styles.actionButtons}>
                  <button className={styles.viewButton}>View</button>
                  <button className={styles.editButton}>Edit</button>
                  <button className={styles.deleteButton}>Delete</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <PaginationComponent pageCount={totalPages} />
    </div>
  );
}
