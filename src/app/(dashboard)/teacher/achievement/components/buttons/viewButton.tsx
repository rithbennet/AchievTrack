"use client";
import { useState } from "react";
import styles from "../../styles/achievement.module.scss";

interface TeacherUser {
  id: number;
  name: string;
  email: string;
}

interface Teacher {
  id: number;
  department: string;
  User: TeacherUser; // Teacher's user details
}

interface Student {
  id: number;
  name: string;
  email: string;
  class: string;
}

interface AchievementStudent {
  Student: Student;
}

interface AchievementTeacher {
  Teacher: Teacher;
}

interface Achievement {
  id: number;
  title: string;
  category: string;
  level: string;
  certificate: string[];
  date: Date;
  description: string | null;
  createdby: number | null;
  verified: boolean | null;
  created_at: Date | null;
  updated_at: Date | null;
}

interface ViewButtonProps {
  achievement: Achievement;
  students: AchievementStudent[];
  teachers: AchievementTeacher[];
}

export default function ViewButton({ achievement, students, teachers }: ViewButtonProps) {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => setShowModal(!showModal);

  return (
    <>
      <button className={styles.viewButton} onClick={toggleModal}>
        View
      </button>

      {showModal && (
        <div className={styles.modalOverlay} onClick={toggleModal}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <h2>Achievement Details</h2>
            <p>
              <strong>Title:</strong> {achievement.title}
            </p>
            <p>
              <strong>Category:</strong> {achievement.category}
            </p>
            <p>
              <strong>Level:</strong> {achievement.level}
            </p>
            <p>
              <strong>Date:</strong> {new Date(achievement.date).toDateString()}
            </p>
            <p>
              <strong>Description:</strong>{" "}
              {achievement.description || "No description available."}
            </p>
            <p>
              <strong>Verified:</strong> {achievement.verified ? "Yes" : "No"}
            </p>
            <p>
              <strong>Created By:</strong>{" "}
              {achievement.createdby ? `User ${achievement.createdby}` : "Unknown"}
            </p>

            {/* Display Certificate Links */}
            <div>
              <h3>Certificate</h3>
              {achievement.certificate.length > 0 ? (
                <ul>
                  {achievement.certificate.map((file, index) => (
                    <li key={index}>
                      <a href={file} target="_blank" rel="noopener noreferrer">
                        View Certificate
                      </a>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No certificate available.</p>
              )}
            </div>

            {/* Display Associated Students */}
            <div>
              <h3>Associated Students</h3>
              {students.length > 0 ? (
                <ul>
                  {students.map(({ Student }, index) => (
                    <li key={index}>
                      <p>
                        <strong>Name:</strong> {Student.name}
                      </p>
                      <p>
                        <strong>Class:</strong> {Student.class}
                      </p>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No students associated with this achievement.</p>
              )}
            </div>

            {/* Display Associated Teachers */}
            <div>
              <h3>Associated Teachers</h3>
              {teachers.length > 0 ? (
                <ul>
                  {teachers.map(({ Teacher }, index) => (
                    <li key={index}>
                      <p>
                        <strong>Name:</strong> {Teacher.User.name}
                      </p>
                      <p>
                        <strong>Email:</strong> {Teacher.User.email}
                      </p>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No teachers associated with this achievement.</p>
              )}
            </div>

            <div className={styles.actions}>
              <button className={styles.cancelButton} onClick={toggleModal}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
