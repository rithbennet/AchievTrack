"use client";
import styles from "./homepage.module.scss";
import "bootstrap/dist/css/bootstrap.min.css";

export default function TeacherStudentProfile() {
  return (
    <div className={`container ${styles.teacherContainer}`}>
      <h1>Student Profiles</h1>
      <table className="table table-hover">
        <thead>
          <tr>
            <th>Name</th>
            <th>MyKad</th>
            <th>Class</th>
            <th>Achievements</th>
          </tr>
        </thead>
        <tbody>
          {/* Example row */}
          <tr>
            <td>Jane Smith</td>
            <td>987654-32-1098</td>
            <td>4B</td>
            <td>
              <ul>
                <li>Top in Math</li>
                <li>Science Fair Winner</li>
              </ul>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}