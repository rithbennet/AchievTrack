// src/components/UserTable.tsx

import styles from "./UserTable.module.scss";
import UserRow from "./UserRow"; // Adjust the path as necessary

interface UserTableProps {
  users: Array<{
    id: number;
    name: string;
    username: string;
    role: string;
  }>;
}


export default function UserTable({ users }: UserTableProps) {
  return (
    <div className={styles.userTableContainer}>
      <table className={styles.userTable}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Username</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <UserRow key={user.id.toString()} user={user} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
