"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import styles from './sidebarAdmin.module.scss';
import { FaHome, FaUserCog, FaUserGraduate, FaMedal, FaSignOutAlt } from 'react-icons/fa';

interface SidebarProps {
  userName: string;
}

const SidebarAdmin: React.FC<SidebarProps> = ({ userName }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className={`${styles.sidebar} ${isCollapsed ? styles.collapsed : ''}`}>
      <div className={styles.header} onClick={toggleSidebar}>
        <span className={styles.userName}>{isCollapsed ? '' : userName}</span>
      </div>
      <nav className={styles.nav}>
        <Link href="/admin" className={styles.navItem}>
          <FaHome className={styles.icon} />
          {!isCollapsed && <span>Dashboard</span>}
        </Link>
        <Link href="/manageUser" className={styles.navItem}>
          <FaUserCog className={styles.icon} />
          {!isCollapsed && <span>Manage Users</span>}
        </Link>
        <Link href="/manageStudent" className={styles.navItem}>
          <FaUserGraduate className={styles.icon} />
          {!isCollapsed && <span>Manage Students</span>}
        </Link>
        <Link href="/achievementRecords" className={styles.navItem}>
          <FaMedal className={styles.icon} />
          {!isCollapsed && <span>Achievement Records</span>}
        </Link>
      </nav>
      <div className={styles.logout}>
        <Link href="/logout" className={styles.navItem}>
          <FaSignOutAlt className={styles.icon} />
          {!isCollapsed && <span>Logout</span>}
        </Link>
      </div>
    </div>
  );
};

export default SidebarAdmin;
