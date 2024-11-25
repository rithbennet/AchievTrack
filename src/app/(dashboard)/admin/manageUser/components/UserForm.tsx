"use client"
import { createUser, updateUser } from '@/actions/manageUserAction';
import styles from '../styles/manageUser.module.scss';
import { FormEvent, useState, useEffect } from 'react';

interface UserFormProps {
  closeModal: () => void;
  initialData?: {
    id?: number; // Ensure id is a number
    name: string;
    email: string;
    role: string;
    password: string;
  };
}

export default function UserForm({ closeModal, initialData }: UserFormProps) {
  const [user, setUser] = useState({
    name: '',
    email: '',
    role: 'teacher',
    password: ''
  });

  useEffect(() => {
    if (initialData) {
      setUser(initialData);
    }
  }, [initialData]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (initialData && typeof initialData.id === 'number') {
      await updateUser(initialData.id, new FormData(event.target as HTMLFormElement));
    } else {
      await createUser(new FormData(event.target as HTMLFormElement));
    }
    closeModal();
  }

  return (
    <div className={styles.userFormSection}>
      <div className={styles.modalHeader}>
        <h2>{initialData ? 'Edit User' : 'Add User'}</h2>
        <button type="button" className={styles.closeButton} onClick={closeModal} aria-label="Close modal">
          &times;
        </button>
      </div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          value={user.name}
          onChange={handleChange}
          className={styles.inputField}
          required
          maxLength={100}
        />
        
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={user.email}
          onChange={handleChange}
          className={styles.inputField}
          required
        />
        
        <label htmlFor="role">Role</label>
        <select
          id="role"
          name="role"
          value={user.role}
          onChange={handleChange}
          className={styles.inputField}
          required
        >
          <option value="Teacher">Teacher</option>
          <option value="Admin">Admin</option>
        </select>
        
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          value={user.password}
          onChange={handleChange}
          className={styles.inputField}
          required
          minLength={8}
        />
        
        <button type="submit" className={styles.submitButton}>{initialData ? 'Save Changes' : 'Add User'}</button>
      </form>
    </div>
  );
}
