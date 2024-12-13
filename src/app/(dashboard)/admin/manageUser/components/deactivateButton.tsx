// components/EditButton.tsx
"use client";
import { deactivateUser } from '@/actions/manageUserAction';
import styles from '../styles/manageUser.module.scss';
import { useRouter } from 'next/navigation';

interface DeleteButtonProps {
  userId: number; // Ensure userId is a number
}

export default function deactivateButton({ userId }: DeleteButtonProps) {
  const router = useRouter();
  const handleDeactivate = async () => {
    try {
      await deactivateUser(userId);
      console.log(`User with ID ${userId} deleted successfully.`);
      // Optionally, you can add code here to update the UI after deletion
      router.refresh();
    } catch (error) {
      console.error(`Failed to delete user with ID ${userId}:`, error);
    }
  };

  return (
    <button onClick={handleDeactivate} className={styles.deleteButton} aria-label={`Delete user ${userId}`}>
      Deactivate
    </button>
  );
}