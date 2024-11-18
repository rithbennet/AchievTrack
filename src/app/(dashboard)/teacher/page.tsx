import React from 'react';
import styles from './homepage.module.scss';
import Link from 'next/link';

const HomePage = () => {
  return (
    <div className={styles.container}>
      {/* Side Menu */}
      <aside className={styles.sidebar}>
        <button className={styles.userName}>Saleha</button>
        <div className={styles.menu}>
          <Link href="/dashboardTeacher"><button className={styles.menuItem}>🏠Dashboard</button></Link>
          <button className={styles.menuItem}>🚵Achievement Records</button>
          <button className={styles.menuItem}>👤Profile</button>
        </div>
        <button className={styles.logoutButton}>ⓘLogout</button>
      </aside>

      {/* Main Content */}
      <div className={styles.mainContent}>
        {/* Top Bar */}
        <div className={styles.topBar}>
          <div className={styles.schoolInfo}>
            <img src="/images/SKSU.jpg" alt="School Logo" className={styles.logo} />
            <h1 className={styles.schoolName}>SEK. KEB. SAUJANA UTAMA</h1>
          </div>
          <div className={styles.userIcon}>
            <img src="/images/user.webp" alt="User" />
          </div>
        </div>

        {/* Search Bar and Action Buttons */}
        <div className={styles.header}>
          <input type="text" placeholder="Search" className={styles.searchBar} />
          <button className={styles.importButton}>Import Excel</button>
          <Link href="/formAdd">
        <button className={styles.addButton}>Add</button>
      </Link>
        </div>

        {/* Achievement Table */}
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Title</th>
              <th>Category</th>
              <th>Level</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Sports Carnival</td>
              <td>Sport</td>
              <td>District</td>
              <td className={styles.actions}>
                <Link href="/formView">
                <button className={styles.iconButton}>👁️</button>
                </Link>
                <Link href="/formEdit"><button className={styles.iconButton}>✏️</button></Link>
                <button className={styles.iconButton}>🗑️</button>
              </td>
            </tr>
            {/* Add more rows as needed */}
          </tbody>
        </table>

        {/* Pagination */}
        <div className={styles.pagination}>
          <button>«</button>
          <button>‹</button>
          <span>Page 1</span>
          <button>›</button>
          <button>»</button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
