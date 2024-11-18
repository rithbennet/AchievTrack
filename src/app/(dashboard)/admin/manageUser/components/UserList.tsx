import prisma from "@/lib/db";
import styles from "./styles/manageUser.module.scss";
import EditButton from './editButton';
import DeleteButton from './deleteButton';


export default async function UserList() {
  const users = await prisma.user.findMany();

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
                <EditButton />
                <DeleteButton  />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
}
