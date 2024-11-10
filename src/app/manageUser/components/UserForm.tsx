import React, { useState, useEffect } from 'react';
import { User } from '../types';  // Import User type from types.ts
import styles from '../styles/manageUser.module.scss';

interface UserFormProps {
  onSubmit: (user: User) => void;
  initialData?: User; // Optional initial data for editing
  isSubmitting?: boolean;
}

const UserForm: React.FC<UserFormProps> = ({ onSubmit, initialData, isSubmitting }) => {
  // Initialize the state with initial data if provided, otherwise with default empty values
  const [user, setUser] = useState<User>(
    initialData || { name: '', email: '', role: 'user', password: '' }
  );

  // Whenever the initialData changes, update the user state (for editing)
  useEffect(() => {
    if (initialData) {
      setUser(initialData);
    }
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  return (
    <form onSubmit={(e) => { e.preventDefault(); onSubmit(user); }} className={styles.userForm}>
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
        <option value="user">User</option>
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
