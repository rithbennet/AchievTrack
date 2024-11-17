

import AdminGuard from "./components/AdminGuard";
import styles from "./styles/manageUser.module.scss";
import UserList from "./components/UserList"; // Ensure UserList is a valid React component
import AddButton from "./components/addButton";

export default function ManageUserPage() {


  return (
    <AdminGuard isAdmin={true}>
      <div className={styles.pageContainer}>
        <h1>Manage Users</h1>
        <AddButton />
        <UserList  />
      </div>
    </AdminGuard>
  );
}