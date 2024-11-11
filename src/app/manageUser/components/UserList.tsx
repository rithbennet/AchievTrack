// components/UserList.tsx
import React from 'react';
import UserCard from './UserCard';
import styles from '../styles/manageUser.module.scss';
import { User } from '../types';


interface LocalUser {
  id: number;
  name: string;
  email: string;
  role: string;
}

interface UserListProps {
  users: LocalUser[];
  onEdit: (user: LocalUser) => void;
  onDelete: (id: number) => void;
}

const UserList: React.FC<UserListProps> = ({ users, onEdit, onDelete }) => {
  return (
    <div className={styles.userList}>
      {users.map((user) => (
        <UserCard key={user.id} user={user} onEdit={onEdit} onDelete={onDelete} />
      ))}
    </div>
  );
};

export default UserList;
