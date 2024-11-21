import prisma from "@/lib/db";
import styles from "../styles/manageUser.module.scss";
import EditButton from './editButton';
import DeleteButton from './deleteButton';

interface UserListProps {
  query: string;
  currentPage: number;
}

const ITEMS_PER_PAGE = 10;

export default async function UserList({ query, currentPage }: UserListProps) {
  // Calculate offset for pagination
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  // Fetch filtered and paginated users
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

  // Fetch total number of users matching the query
  const totalUsers = await prisma.user.count({
    where: {
      name: {
        contains: query,
        mode: 'insensitive',
      },
    },
  });

  // Calculate total pages
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
                <DeleteButton userId={user.id} />
                </div>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className={styles.pagination}>
        {Array.from({ length: totalPages }, (_, index) => (
          <a
            key={index}
            href={`?query=${query}&page=${index + 1}`}
            className={`${styles.pageLink} ${
              currentPage === index + 1 ? styles.active : ''
            }`}
          >
            {index + 1}
          </a>
        ))}
      </div>
    </div>
  );
}
