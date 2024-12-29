"use client";  // This marks this as a client component

import { useState } from "react";
import styles from "../../styles/manageStudent.module.scss"; // Ensure the path is correct
import { deleteStudent } from "@/actions/manageStudentAction";  // Import delete function
import {useRouter} from "next/navigation"
interface DeleteButtonProps {
  id: number;
}

export default function DeleteButtonStudents({ id }: DeleteButtonProps) {
  const router = useRouter();
  

  const handleDelete = async () => {
    try {
      await deleteStudent(id);  // Directly calling delete function on button click
      // Optionally, you can add a success message or update state here
      router.refresh()
    } catch (error) {
      console.error("Error deleting student:", error);
    }
  };

  return (
    <button
      className={styles.deleteButton}
      onClick={handleDelete}
    >
    Delete 
    </button>
  );
}
