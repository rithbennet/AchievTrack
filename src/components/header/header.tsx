// /app/components/header.tsx
import React from 'react';
import Image from 'next/image';
import styles from './header.module.scss';
import { NotificationBell } from '../notifications/NotificationBell';
import { TeacherNotificationBell } from '../notificationsTeacher/TeacherNotificationBell';

interface HeaderProps {
  userName: string;
  userRole: string;
}

const Header: React.FC<HeaderProps> = ({ userName, userRole }) => {
  return (
    <header className={styles.header}>
      <div className={styles.logoSection}>
        <Image src="/logo.png" alt="School Logo" width={45} height={45} className={styles.logo} />
        <h1>Sek. Keb Saujana Utama</h1>
      </div>
      <div className={styles.userSection}>
        <div className={styles.notificationButton}>
          {userRole === "Admin" ? <NotificationBell /> : <TeacherNotificationBell />}
        </div>
        <div className={styles.userInfo}>
          <span className={styles.userName}>{userName}</span>
          <span className={styles.userRole}>{userRole}</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
