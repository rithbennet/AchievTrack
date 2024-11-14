"use client"; // This is a client component

import { useState } from 'react';
import UserForm from '../components/UserForm';
import styles from '../styles/manageUser.module.scss'; // Import styles for consistency

interface User {
  name: string;
  email: string;
  role: string; // Add other user properties as needed
  password: string;
}

const AddUserPage: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (user: User): void => {
    setIsSubmitting(true);
    // Simulate user submission
    console.log(user);
    // Add your logic to save user data (e.g., API call)
    setTimeout(() => {
      setIsSubmitting(false);
      alert('User added successfully!');
      // Optionally, navigate back to the manage user page
      // router.push('/manageUser');
    }, 1000);
  };

  return (
    <div className={styles.addUserPage}>
      <h1 className={styles.pageTitle}>Add New User</h1>
      <div className={styles.formContainer}>
        <UserForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />
      </div>
    </div>
  );
};

export default AddUserPage;
