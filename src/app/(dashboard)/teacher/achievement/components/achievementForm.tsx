"use client"
import { createUser, updateUser } from '@/actions/manageUserAction';
import styles from '../styles/acheivement.module.scss';
import { FormEvent, useState, useEffect } from 'react';
import { useRouter } from "next/navigation";

interface UserFormProps {
  closeModal: () => void;
  initialData?: {
    id?: number; // Ensure id is a number
    name: string;
    email: string;
    role: string;
  };
}

export default function UserForm({ closeModal, initialData }: UserFormProps) {
  const [user, setUser] = useState({
    name: '',
    email: '',
    role: 'teacher'
  });

  const [isEditingPassword, setIsEditingPassword] = useState(false);
  const [password, setPassword] = useState('');
  const router = useRouter();

  useEffect(() => {
    if (initialData) {
      setUser(initialData);
    }
  }, [initialData]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleEditPassword = () => {
    setIsEditingPassword(true);
  };

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (initialData && typeof initialData.id === 'number') {
      await updateUser(initialData.id, new FormData(event.target as HTMLFormElement));
    } else {
      await createUser(new FormData(event.target as HTMLFormElement));
    }
    closeModal();
    router.refresh();
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
        {!initialData ? (
          <div className={styles.formGroup}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={handlePasswordChange}
              className={styles.inputField}
              required
              minLength={8}
            />
          </div>
        ) : (
          <>
            {isEditingPassword ? (
              <div className={styles.formGroup}>
                <label htmlFor="password">New Password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={password}
                  onChange={handlePasswordChange}
                  className={styles.inputField}
                  required
                  minLength={8}
                />
              </div>
            ) : (
              <button type="button" onClick={handleEditPassword} className={"btn btn-primary"}>
                Edit Password
              </button>
            )}
          </>
        )}
        <button type="submit" className={styles.submitButton}>{initialData ? 'Save Changes' : 'Add User'}</button>
      </form>
    </div>
  );
}
