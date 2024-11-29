import React from 'react';
import styles from './homepage.module.scss';
import Link from 'next/link';

const HomePage = () => {
  return (
    <div className={styles.container}>
      {/* Main Content */}
      <div className={styles.mainContent}>
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
