import prisma from "@/lib/db";
import styles from "../styles/manageStudent.module.scss";
import EditButtonStudents from './buttons/EditButtonStudents';
import ViewButtonStudents from './buttons/ViewButtonStudents';
import DeleteButtonStudents from './buttons/DeleteButtonStudents';
import ImportStudentButton from "./ImportStudentButton";
import PaginationStudent from './PaginationStudent';

const ITEMS_PER_PAGE = 8;

const StudentList = async ({ query, currentPage }: { query: string, currentPage: number }) => {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  // Fetch the list of students based on search query and pagination
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

  // Get the total number of students matching the query
  const totalStudents = await prisma.student.count({
    where: {
      name: {
        contains: query,
        mode: 'insensitive',
      },
    },
  });

  // Calculate total pages for pagination
  const totalPages = Math.ceil(totalStudents / ITEMS_PER_PAGE);

  return (
    <div className={styles.pageContainer}>
      <div className={styles.topSection}>
        <div className={styles.searchAndAddContainer}>
        <ImportStudentButton />  {/* Import Button Component */}
        </div>
      </div>

      {/* Student List Section */}
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
            {/* Displaying the list of students */}
            {students.map((student) => (
              <tr key={student.id}>
                <td>{student.name}</td>
                <td>{student.mykad}</td>
                <td>{student.class}</td>
                <td>
                  <div className={styles.actionButtons}>
                    {/* Action buttons for each student */}
                    <EditButtonStudents id={student.id} initialData={student} />
                    <ViewButtonStudents id={student.id} initialData={student} />
                    <DeleteButtonStudents id={student.id} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <PaginationStudent pageCount={totalPages} />
      </div>
    </div>
  );
};

export default StudentList;