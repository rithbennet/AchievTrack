import React, { useState, useEffect } from 'react';
import { User } from '../types'; // Import User type from types.ts
import styles from '../styles/manageUser.module.scss';

interface UserFormProps {
  onSubmit: (user: User) => void;
  initialData?: User; // Optional initial data for editing
  isSubmitting?: boolean;
  onClose: () => void; // Callback function to close the modal
}

const UserForm: React.FC<UserFormProps> = ({ onSubmit, initialData, isSubmitting, onClose }) => {
  const [user, setUser] = useState<User>(
    initialData || { name: '', email: '', role: 'user', password: '' }
  );

  useEffect(() => {
    if (initialData) {
      setUser(initialData);
    }
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({ ...prevUser, [name]: value }));
  };
  // Removed close button as per request
  return (
    <form onSubmit={(e) => { e.preventDefault(); onSubmit(user); }} className={styles.userForm}>
      <div className={styles.modalHeader}>
        <h2>{initialData ? 'Edit User' : 'Add User'}</h2>
        <button type="button" className={styles.closeButton} onClick={onClose} aria-label="Close modal">
          &times;
        </button>
      </div>
      <input
        type="text"
        name="name"
        value={user.name}
        onChange={handleChange}
        placeholder="Name"
        required
        className={styles.inputField}
      />
      <input
        type="email"
        name="email"
        value={user.email}
        onChange={handleChange}
        placeholder="Email"
        required
        className={styles.inputField}
      />
      <select name="role" value={user.role} onChange={handleChange} className={styles.inputField}>
        <option value="teacher">Teacher</option>
        <option value="admin">Admin</option>
      </select>
      <input
        type="password"
        name="password"
        value={user.password}
        onChange={handleChange}
        placeholder="Password"
        required
        className={styles.inputField}
      />
      <button type="submit" className={styles.submitButton} disabled={isSubmitting}>
        {isSubmitting ? 'Saving...' : initialData ? 'Save Changes' : 'Add User'}
      </button>
    </form>
  );
};

export default UserForm;
