"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from './sidebarAdmin.module.scss';
import { FaHome, FaUserGraduate, FaMedal, FaSignOutAlt } from 'react-icons/fa';
import { signOut } from 'next-auth/react';
interface SidebarProps {
  userName: string;
}

const SidebarTeacher: React.FC<SidebarProps> = ({ userName }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  useEffect(() => {
    // Ensure the sidebar state is consistent between server and client
    setIsCollapsed(false);
  }, []);

  return (
    <div className={`${styles.sidebar} ${isCollapsed ? styles.collapsed : ''}`}>
      <div className={styles.header} onClick={toggleSidebar}>
        <span className={styles.userName}>{isCollapsed ? '' : userName}</span>
      </div>
      <nav className={styles.nav}>
        <Link href="/teacher" className={styles.navItem}>
          <FaHome className={styles.icon} />
          {!isCollapsed && <span>Dashboard</span>}
        </Link>
        <Link href="/teacher/achievement" className={styles.navItem}>
          <FaMedal className={styles.icon} />
          {!isCollapsed && <span>Achievement Records</span>}
        </Link>
        <Link href="/teacher/viewStudent" className={styles.navItem}>
          <FaUserGraduate className={styles.icon} />
          {!isCollapsed && <span>Students</span>}
        </Link>
      </nav>
      <div className={styles.logout}>
        <button onClick={() => signOut({ callbackUrl: '/signIn' })} className={styles.navItem}>
          <FaSignOutAlt className={styles.icon} />
          {!isCollapsed && <span>Logout</span>}
        </button>
      </div>
    </div>
  );
};

export default SidebarTeacher;
