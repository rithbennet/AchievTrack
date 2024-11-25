import prisma from "@/lib/db";
import styles from "../styles/manageUser.module.scss";
import EditButton from './editButton';
import DeactivateButton from './deleteButton';
import PaginationComponent from './Pagination';

interface UserListProps {
  query: string;
  currentPage: number;
}

const ITEMS_PER_PAGE = 8;

export default async function UserList({ query, currentPage }: UserListProps) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  const users = await prisma.user.findMany({
    where: {
      name: {
        contains: query,
        mode: 'insensitive', // Case-insensitive search
      },
    },
    skip: offset,
    take: ITEMS_PER_PAGE,
  });

  const totalUsers = await prisma.user.count();

  const totalPages = Math.ceil(totalUsers / ITEMS_PER_PAGE);

  return (
    <div className={styles.userListSection}>
      <table className={styles.userTable}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>
                <div className={styles.actionButtons}>
                  <div className={styles.editButton}>
                    <EditButton userId={user.id.toString()} initialData={user} />
                  </div>
                  <div className={styles.deleteButton}>
                    <DeactivateButton userId={user.id} />
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
