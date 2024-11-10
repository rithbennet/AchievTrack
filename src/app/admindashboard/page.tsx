import styles from './page.module.scss';

export default function HomePage() {
  return (
    <div className={styles.container}>
      {/* Sidebar */}
      <aside className={styles.sidebar}>
        <h2 className={styles.userName}>John Doe</h2>
        <nav>
          <ul>
            <li>Dashboard</li>
            <li className={styles.active}>Manage Users</li>
            <li>Manage Students</li>
            <li>Achievement Records</li>
            <li>Profile</li>
          </ul>
        </nav>
        <button className={styles.logout}>Logout</button>
      </aside>

      {/* Main Content */}
      <main className={styles.mainContent}>
        <div className={styles.header}>
          <input type="text" className={styles.searchBar} placeholder="Search" />
          <button className={styles.addButton}>Add</button>
        </div>

        {/* User Table */}
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {/* Example rows */}
            <tr>
              <td>Jason</td>
              <td>abc@gmail.com</td>
              <td>Admin</td>
              <td>
                <button className={styles.actionButton}>👁️</button>
                <button className={styles.actionButton}>✏️</button>
                <button className={styles.actionButton}>🗑️</button>
              </td>
            </tr>
            {/* Repeat as necessary */}
          </tbody>
        </table>

        {/* Pagination */}
        <div className={styles.pagination}>
          <button>«</button>
          <button>‹</button>
          <span>Page 1 of 10</span>
          <button>›</button>
          <button>»</button>
        </div>
      </main>
    </div>
  );
}
