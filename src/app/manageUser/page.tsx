"use client"; // Add this directive at the top

import { useState, useEffect } from 'react';
import UserForm from './components/UserForm';
import UserList from './components/UserList';
import AdminGuard from './components/AdminGuard';
import Header from '../components/header'; // Import the Header component
import styles from './styles/manageUser.module.scss';
import { User } from './types'; // Import User type from types.ts
import Link from 'next/link';

const ManageUserPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([
    {
      id: 1,
      name: 'John Doe',
      email: 'johndoe@example.com',
      role: 'admin',
      password: 'password123',
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'janesmith@example.com',
      role: 'user',
      password: 'password123',
    },
  ]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean>(true);
  const [search, setSearch] = useState('');
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    setIsAdmin(true);
  }, []);

  const handleAddOrUpdateUser = (user: User) => {
    setUsers((prev) => {
      const updatedUsers = prev.filter((u) => u.id !== user.id);
      const newUser = { ...user, id: user.id ?? Date.now() };
      return [...updatedUsers, newUser];
    });
    setSelectedUser(null);
    setIsModalOpen(false);
  };

  const handleDeleteUser = (id: number) => {
    setUsers((prev) => prev.filter((u) => u.id !== id));
  };

  const openModal = () => {
    setSelectedUser(null);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <AdminGuard isAdmin={isAdmin}>
      <Header
        userName="John Doe" // Pass the user name
        userRole="Admin"     // Pass the user role
        onNotificationClick={() => alert("Notification clicked")} // Handle notification click
      />
      <div className={styles.manageUserPage}>
        <h1 style={{ fontWeight: 'bold' }}>User Management</h1>

        <div className={styles.topSection}>
          <div className={styles.totalInfo}>
            <span>All Users | {filteredUsers.length} total</span>
          </div>
          <div className={styles.searchAndAdd}>
            <input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className={styles.searchInput}
            />
            <button className={styles.addButton} onClick={openModal}>
              Add User
            </button>
          </div>
        </div>

        {isModalOpen && (
          <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
              <button className={styles.closeButton} onClick={closeModal}>
                &times;
              </button>
              <UserForm onSubmit={handleAddOrUpdateUser} initialData={selectedUser || undefined} />
            </div>
          </div>
        )}

        <div className={styles.userListSection}>
          <table className={styles.userTable}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Password</th>
                <th>Role</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers
                .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
                .map((user) => (
                  <tr key={user.id}>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.password}</td>
                    <td>{user.role}</td>
                    <td>
                      <button onClick={() => setSelectedUser(user)} className={styles.editButton}>Edit</button>
                      <button onClick={() => user.id !== undefined && handleDeleteUser(user.id)} className={styles.deleteButton}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>

          <div className={styles.pagination}>
            <span>Items per page:</span>
            <select
              value={itemsPerPage}
              onChange={(e) => setItemsPerPage(Number(e.target.value))}
              className={styles.itemsPerPageSelect}
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="20">20</option>
            </select>
            <span>
              {currentPage} of {Math.ceil(filteredUsers.length / itemsPerPage)} pages
            </span>
            <button onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}>
              Previous
            </button>
            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(Math.ceil(filteredUsers.length / itemsPerPage), prev + 1))
              }
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </AdminGuard>
  );
};

export default ManageUserPage;
