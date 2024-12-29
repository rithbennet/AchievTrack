"use client";

import { useState, useEffect } from 'react';
import styles from "../styles/manageStudent.module.scss";
import EditButtonStudents from './EditButtonStudents';
import ViewButtonStudents from './ViewButtonStudents';
import DeleteButtonStudents from './DeleteButtonStudents';
import PaginationComponent from './PaginationStudent';

interface Student {
  id: number;
  name: string;
  mykad: string;
  class: string;
}

interface StudentListProps {
  query: string;
  currentPage: number;
}

const ITEMS_PER_PAGE = 8;

export default function StudentList({ query, currentPage }: StudentListProps) {
  const [students, setStudents] = useState<Student[]>([]);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchStudents = async () => {
      const offset = (currentPage - 1) * ITEMS_PER_PAGE;
      const response = await fetch(`/api/student?query=${query}&offset=${offset}&limit=${ITEMS_PER_PAGE}`);
      const data = await response.json();

      setStudents(data.students);
      setTotalPages(Math.ceil(data.totalStudents / ITEMS_PER_PAGE));
    };

    fetchStudents();
  }, [query, currentPage]);

  const handleDelete = async (id: number) => {
    await fetch(`/api/student/${id}`, {
      method: 'DELETE',
    });

    const offset = (currentPage - 1) * ITEMS_PER_PAGE;
    const response = await fetch(`/api/student?query=${query}&offset=${offset}&limit=${ITEMS_PER_PAGE}`);
    const data = await response.json();

    setStudents(data.students);
    setTotalPages(Math.ceil(data.totalStudents / ITEMS_PER_PAGE));
  };

  return (
    <div className={styles.StudentListSection}>
      <table className={styles.StudentTable}>
        <thead>
          <tr>
            <th>Name</th>
            <th>MyKad</th>
            <th>Class</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.id}>
              <td>{student.name}</td>
              <td>{student.mykad}</td>
              <td>{student.class}</td>
              <td>
                <div className={styles.actionButtons}>
                  <div className={styles.editButton}>
                    <EditButtonStudents id={student.id} initialData={student} />
                  </div>
                  <div className={styles.viewButton}>
                    <ViewButtonStudents id={student.id} initialData={student} />
                  </div>
                  <div className={styles.deleteButton}>
                    <DeleteButtonStudents id={student.id} onDelete={handleDelete} />
                  </div>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className={styles.pagination}>
        <PaginationComponent pageCount={totalPages} />
      </div>
    </div>
  );
}