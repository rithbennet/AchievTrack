"use client";

import { useState, useEffect, useMemo } from "react";
import UserForm from "./components/UserForm";
import AdminGuard from "./components/AdminGuard";
import Header from "@/components/header/header";
import SidebarAdmin from "@/components/sidebar/sidebarAdmin";
import styles from "./styles/manageUser.module.scss";
import { User } from "./types";

const ManageUserPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([
    { id: 1, name: "John Doe", email: "johndoe@example.com", role: "admin", password: "password123" },
    { id: 2, name: "Jane Smith", email: "janesmith@example.com", role: "user", password: "password123" },
  ]);
  
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean>(true);
  const [search, setSearch] = useState("");
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredUsers = useMemo(() => {
    return users.filter((user) => user.name.toLowerCase().includes(search.toLowerCase()) || user.email.toLowerCase().includes(search.toLowerCase()));
  }, [users, search]);

  const openModal = (user: User | null) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

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

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const paginatedUsers = filteredUsers.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <AdminGuard isAdmin={isAdmin}>
      <Header userName="John Doe" userRole="Admin" onNotificationClick={() => alert("Notification clicked")} />
      <div className={styles.pageContainer}>
        <SidebarAdmin userName="John Doe" onLogout={() => alert("Logged out")} />
        <div className={styles.contentContainer}>
          <div className={styles.manageUserPage}>
            <h2 style={{fontWeight: "bold" }}>USER MANAGEMENT</h2>

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
                <button className={styles.addButton} onClick={() => openModal(null)}>
                  Add User
                </button>
              </div>
            </div>

            {isModalOpen && (
              <div className={`${styles.modalOverlay} ${isModalOpen ? styles.open : ""}`}>
                <div className={styles.modalContent}>
                  {/* <button className={styles.closeButton} onClick={closeModal} aria-label="Close modal">
                    &times;
                  </button> */}
                  <UserForm
                    onSubmit={handleAddOrUpdateUser}
                    initialData={selectedUser || undefined}
                    onClose={closeModal}
/>

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
                  {paginatedUsers.map((user) => (
                    <tr key={user.id}>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>{user.password}</td>
                      <td>{user.role}</td>
                      <td>
                        <button onClick={() => openModal(user)} className={styles.editButton} aria-label={`Edit user ${user.name}`}>
                          Edit
                        </button>
                        <button
                          onClick={() => (user.id !== undefined ? handleDeleteUser(user.id) : console.error("User ID not defined"))}
                          className={styles.deleteButton}
                          aria-label={`Delete user ${user.name}`}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className={styles.pagination}>
                <span>Items per page:</span>
                <select value={itemsPerPage} onChange={(e) => setItemsPerPage(Number(e.target.value))} className={styles.itemsPerPageSelect}>
                  <option value="5">5</option>
                  <option value="10">10</option>
                  <option value="20">20</option>
                </select>
                <span>
                  {currentPage} of {totalPages} pages
                </span>
                <button onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))} disabled={currentPage === 1}>
                  Previous
                </button>
                <button onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))} disabled={currentPage === totalPages}>
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminGuard>
  );
};

export default ManageUserPage;
