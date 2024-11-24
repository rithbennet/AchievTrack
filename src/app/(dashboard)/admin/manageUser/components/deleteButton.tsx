// components/EditButton.tsx
"use client";
import { deleteUser } from '@/actions/manageUserAction';
import styles from '../styles/manageUser.module.scss';

interface DeleteButtonProps {
  userId: number; // Ensure userId is a number
}

export default function DeleteButton({ userId }: DeleteButtonProps) {
  const handleDelete = async () => {
    try {
      await deleteUser(userId);
      console.log(`User with ID ${userId} deleted successfully.`);
      // Optionally, you can add code here to update the UI after deletion
    } catch (error) {
      console.error(`Failed to delete user with ID ${userId}:`, error);
    }
  };

  return (
    <button onClick={handleDelete} className={styles.deleteButton} aria-label={`Delete user ${userId}`}>
      Delete
    </button>
  );
}