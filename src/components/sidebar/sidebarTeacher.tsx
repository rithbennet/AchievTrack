"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './sidebarAdmin.module.scss';
import { FaHome, FaUserGraduate, FaMedal, FaSignOutAlt, FaBars } from 'react-icons/fa';
import { signOut } from 'next-auth/react';

interface SidebarProps {
  userName: string;
}

const SidebarTeacher: React.FC<SidebarProps> = ({ userName }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const pathname = usePathname();

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
    // Update the body class for responsive layout
    if (!isCollapsed) {
      document.body.classList.add('sidebar-collapsed');
    } else {
      document.body.classList.remove('sidebar-collapsed');
    }
  };

  useEffect(() => {
    // Ensure the sidebar state is consistent between server and client
    setIsCollapsed(false);
    document.body.classList.remove('sidebar-collapsed');

    // Handle responsive behavior
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setIsCollapsed(true);
        document.body.classList.add('sidebar-collapsed');
      } else {
        setIsCollapsed(false);
        document.body.classList.remove('sidebar-collapsed');
      }
    };

    // Initial check
    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isActive = (path: string) => {
    return pathname === path || pathname.startsWith(`${path}/`);
  };

  return (
    <div className={`${styles.sidebar} ${isCollapsed ? styles.collapsed : ''}`}>
      <div className={styles.header} onClick={toggleSidebar}>
        {isCollapsed ? <FaBars className={styles.icon} /> : <span className={styles.userName}>{userName}</span>}
      </div>
      <nav className={styles.nav}>
        <Link href="/teacher" className={`${styles.navItem} ${isActive('/teacher') && !isActive('/teacher/achievement') && !isActive('/teacher/student') ? styles.active : ''}`}>
          <FaHome className={styles.icon} />
          {!isCollapsed && <span>Dashboard</span>}
        </Link>
        <Link href="/teacher/achievement" className={`${styles.navItem} ${isActive('/teacher/achievement') ? styles.active : ''}`}>
          <FaMedal className={styles.icon} />
          {!isCollapsed && <span>Achievement Records</span>}
        </Link>
        <Link href="/teacher/student" className={`${styles.navItem} ${isActive('/teacher/student') ? styles.active : ''}`}>
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
