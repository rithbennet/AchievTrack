

import React, { useState } from 'react';
import Link from 'next/link';
import styles from './sidebarAdmin.module.scss';

interface SidebarAdminProps {
  userName: string;
  onLogout: () => void;
}

const SidebarAdmin: React.FC<SidebarAdminProps> = ({ userName, onLogout }) => {
  const [collapsed, setCollapsed] = useState(false); // State for collapse/expand

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  return (
    <aside className={`${styles.sidebar} ${collapsed ? styles.collapsed : ''}`}>
      {/* User section: hidden when collapsed */}
      <div className={styles.userSection}>
        {!collapsed && <h2>{userName}</h2>}
        <button className={styles.toggleButton} onClick={toggleSidebar}>
          {collapsed ? '▶' : '◀'} {/* Toggle icon */}
        </button>
      </div>

      <nav className={styles.navMenu}>
        <Link href="/dashboard" className={styles.navItem}>
          <i className="fas fa-tachometer-alt" />
          {!collapsed && <span>Dashboard</span>} {/* Only show text when not collapsed */}
        </Link>
        <Link href="/manageUser" className={styles.navItem}>
          <i className="fas fa-users" />
          {!collapsed && <span>Manage User</span>}
        </Link>
        <Link href="/manageStudent" className={styles.navItem}>
          <i className="fas fa-user-graduate" />
          {!collapsed && <span>Manage Student</span>}
        </Link>
        <Link href="/achievementRecord" className={styles.navItem}>
          <i className="fas fa-trophy" />
          {!collapsed && <span>Achievement Record</span>}
        </Link>
      </nav>

      <button className={styles.logoutButton} onClick={onLogout}>
        <i className="fas fa-sign-out-alt" />
        {!collapsed && <span>Logout</span>}
      </button>
    </aside>
  );
};

export default SidebarAdmin;
