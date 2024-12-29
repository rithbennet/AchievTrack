"use client";
import { createStudent, updateStudent } from '@/actions/manageStudentAction';
import styles from '../styles/manageStudent.module.scss';
import { FormEvent, useState, useEffect } from 'react';
import { useRouter } from "next/navigation";

interface StudentFormProps {
  closeModalAction: () => void;
  initialData?: {
    id?: number; // Ensure id is a number
    name: string;
    mykad: string;
    class: string;
  };
}

export default function StudentForm({ closeModalAction, initialData }: StudentFormProps) {
  const [student, setStudent] = useState({
    name: '',
    mykad: '',
    class: '',
  });

  const router = useRouter();

  useEffect(() => {
    if (initialData) {
      setStudent(initialData);
    }
  }, [initialData]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setStudent((prevStudent) => ({ ...prevStudent, [name]: value }));
  };

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (initialData && typeof initialData.id === 'number') {
      await updateStudent(initialData.id, new FormData(event.target as HTMLFormElement));
    } else {
      await createStudent(new FormData(event.target as HTMLFormElement));
    }
    closeModalAction();
    router.refresh();
  }

  return (
    <div className={styles.studentFormSection}>
      <div className={styles.modalHeader}>
        <h2>{initialData ? 'Edit Student' : 'Add Student'}</h2>
        <button type="button" className={styles.closeButton} onClick={closeModalAction} aria-label="Close modal">
          &times;
        </button>
      </div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          value={student.name}
          onChange={handleChange}
          className={styles.inputField}
          required
          maxLength={100}
        />

        <label htmlFor="myKadNumber">MyKad Number</label>
        <input
          type="text"
          id="myKadNumber"
          name="myKadNumber"
          value={student.mykad}
          onChange={handleChange}
          className={styles.inputField}
          required
        />

        <label htmlFor="class">Class</label>
        <input
          type="text"
          id="class"
          name="class"
          value={student.class}
          onChange={handleChange}
          className={styles.inputField}
          required
        />

        <button type="submit" className={styles.submitButton}>
          {initialData ? 'Save Changes' : 'Add Student'}
        </button>
      </form>
    </div>
  );
}