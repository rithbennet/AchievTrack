// components/UserCard.tsx
import React from 'react';
import styles from '../styles/manageUser.module.scss';
import { User } from '../types';


interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

interface UserCardProps {
  user: User;
  onEdit: (user: User) => void;
  onDelete: (id: number) => void;
}

const UserCard: React.FC<UserCardProps> = ({ user, onEdit, onDelete }) => {
  return (
    <div className={styles.userCard}>
      <h3>{user.name}</h3>
      <p>{user.email}</p>
      <p>{user.role}</p>
      <button onClick={() => onEdit(user)}>Edit</button>
      <button onClick={() => onDelete(user.id)}>Delete</button>
    </div>
  );
};

export default UserCard;
