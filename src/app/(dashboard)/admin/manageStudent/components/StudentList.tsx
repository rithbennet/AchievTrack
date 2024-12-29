import prisma from "@/lib/db";
import styles from "../styles/manageStudent.module.scss";
import EditButtonStudents from './buttons/EditButtonStudents';
import ViewButtonStudents from './buttons/ViewButtonStudents';
import DeleteButtonStudents from './buttons/DeleteButtonStudents';
import PaginationComponent from './PaginationStudent';

interface StudentListProps {
  query: string;
  currentPage: number;
}

const ITEMS_PER_PAGE = 8;

export default async function StudentList({ query, currentPage }: StudentListProps) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  const students = await prisma.student.findMany({
    where: {
      name: {
        contains: query,
        mode: 'insensitive', // Case-insensitive search
      },
    },
    skip: offset,
    take: ITEMS_PER_PAGE,
  });

  const totalStudents = await prisma.student.count({
    where: {
      name: {
        contains: query,
        mode: 'insensitive',
      },
    },
  });

  const totalPages = Math.ceil(totalStudents / ITEMS_PER_PAGE);

  return (
    <div className={styles.StudentListSection}>
      <table className={styles.StudentTable}>
        <thead>
          <tr>
            <th>Name</th>
            <th>MyKad</th>
            <th>Class</th>
            <th>Actions</th>
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
                    <DeleteButtonStudents id={student.id} />
                  </div>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <PaginationComponent pageCount={totalPages} />
    </div>
  );
}