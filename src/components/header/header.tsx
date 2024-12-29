// /app/components/header.tsx
import React from 'react';
import Image from 'next/image';
import styles from './header.module.scss';

interface HeaderProps {
  userName: string;
  userRole: string;
}

const Header: React.FC<HeaderProps> = ({ userName, userRole }) => {


  return (
    <header className={styles.header}>
      <div className={styles.logoSection}>
        <Image src="/logo.png" alt="School Logo" width={50} height={50} />
        <h1>Sek. Keb Saujana Utama</h1>
      </div>
      <div className={styles.userSection}>
        <button className={styles.notificationButton}>
          <Image src="/notification.png" alt="Notifications" width={24} height={24} />
        </button>
        <div className={styles.userInfo}>
          <span className={styles.userName}>{userName}</span>
          <span className={styles.userRole}>{userRole}</span>
          
        </div>
      </div>
    </header>
  );
};

export default Header;
