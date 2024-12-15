import prisma from "@/lib/db";
import styles from "../styles/manageStudent.module.scss";
import EditButton from './EditButtonStudents';
import PaginationComponent from './PaginationStudent';

interface StudentListProps {
  query: string;
  currentPage: number;
}

const ITEMS_PER_PAGE = 8;

export default async function StudentList({ query, currentPage }: StudentListProps) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  const Students = await prisma.student.findMany({
    where: {
      name: {
        contains: query,
        mode: 'insensitive', // Case-insensitive search
      },
    },
    skip: offset,
    take: ITEMS_PER_PAGE,
  });

  const totalStudents = await prisma.student.count();

  const totalPages = Math.ceil(totalStudents / ITEMS_PER_PAGE);

  return (
    <div className={styles.StudentListSection}>
      <table className={styles.StudentTable}>
        <thead>
          <tr>
            <th>Name</th>
            <th>MyKad</th>
            <th>Class</th>
          </tr>
        </thead>
        <tbody>
          {Students.map((Student) => (
            <tr key={Student.id}>
              <td>{Student.name}</td>
              <td>{Student.mykad}</td>
              <td>{Student.class}</td>
              <td>
                <div className={styles.actionButtons}>
                  <div className={styles.editButton}>
                    <EditButton id={Student.id} initialData={Student} />
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
