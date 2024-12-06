import prisma from "@/lib/db";
import styles from '../styles/achievement.module.scss';
import PaginationComponent from './Pagination';

interface UserListProps {
  query: string;
  currentPage: number;
}

const ITEMS_PER_PAGE = 10;

export default async function AchievementList({ query, currentPage }: UserListProps) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  const achievement = await prisma.achievementdata.findMany({
    where: {
      title: {
        contains: query,
        mode: 'insensitive', // Case-insensitive search
      },
    },
    skip: offset,
    take: ITEMS_PER_PAGE,
  });

  const totalAchievement = await prisma.user.count();

  const totalPages = Math.ceil(totalAchievement / ITEMS_PER_PAGE);

  return (
    <div className={styles.userListSection}>
      <table className={styles.userTable}>
        <thead>
          <tr>
            <th>Title</th>
            <th>Category</th>
            <th>Level</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {achievement.map((achievement) => (
            <tr key={achievement.id}>
              <td>{achievement.title}</td>
              <td>{achievement.category}</td>
              <td>{achievement.level}</td>
              <td>
                <div className={styles.actionButtons}>
                  <div className={styles.editButton}>
                  </div>
                  <div className={styles.deleteButton}><area shape="" coords="" href="" alt="" />
                  </div>
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
