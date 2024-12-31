"use client";
import { useCallback, useState } from "react";
import TeacherMultiSearch from "../search/teacherMultiSearch";
import styles from "../styles/achievement.module.scss";
import StudentMultiSearch from "../search/studentMultiSearch";
import { useRouter } from "next/navigation";

interface TeacherUser {
  id: number;
  name: string;
  email: string;
}

interface Teacher {
  id: number;
  User: TeacherUser; // Teacher's user details
}

interface Student {
  id: number;
  name: string;
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
  students?: number[];
  teachers?: number[];
}

interface EditButtonProps {
  achievement: Achievement;
  students: AchievementStudent[];
  teachers: AchievementTeacher[];
}

export default function EditButton({ achievement, students, teachers }: EditButtonProps) {

  const router = useRouter();
  const toggleModal = () => setShowModal(!showModal);
  const [showModal, setShowModal] = useState(false);
  const [editedAchievement, setEditedAchievement] = useState(achievement);
  const studentIds = students.map(s => s.Student.id);
  const teacherIds = teachers.map(t => t.Teacher.id);


  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditedAchievement({
      ...editedAchievement,
      [name]: value,
    });
  };

  const handleStudentChange = useCallback((students: number[]) => {
    setEditedAchievement((prevAchievement) => ({ ...prevAchievement, students }));
  }, []);

  const handleTeacherChange = useCallback((teachers: number[]) => {
    setEditedAchievement((prevAchievement) => ({ ...prevAchievement, teachers }));
  }, []);

  // Handle form submission (Saving the edited achievement)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/achievement', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editedAchievement),
      });
      if (response.ok) {
        const achievement = await response.json();
        // Handle the successful submission of the achievement
        console.log('Achievement submitted successfully:', achievement);
      } else {
        console.error('Failed to submit achievement');
      }
    } catch (error) {
      console.error('Error submitting achievement:', error);
    }

    toggleModal();
    router.refresh();
  };



  return (
    <>
      <button className={styles.editButton} onClick={toggleModal}>Edit</button>

      {showModal && (
        <div className={styles.modalOverlay} onClick={toggleModal}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <h2>Edit Achievement</h2>

            <form onSubmit={handleSubmit}>
              <div className={styles.cleanFormGroup}>
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={editedAchievement.title}
                  onChange={handleInputChange}
                />
              </div>

              <div className={styles.cleanFormGroup}>
                <label htmlFor="category">Category</label>
                <input
                  type="text"
                  id="category"
                  name="category"
                  value={editedAchievement.category}
                  onChange={handleInputChange}
                />
              </div>

              <div className={styles.cleanFormGroup}>
                <label htmlFor="level">Level</label>
                <input
                  type="text"
                  id="level"
                  name="level"
                  value={editedAchievement.level}
                  onChange={handleInputChange}
                />
              </div>

              <div className={styles.cleanFormGroup}>
                <label htmlFor="date">Date</label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  value={editedAchievement.date.toISOString().split("T")[0]}
                  onChange={handleInputChange}
                />
              </div>

              <div className={styles.cleanFormGroup}>
                <label htmlFor="description">Description</label>
                <textarea
                  id="description"
                  name="description"
                  value={editedAchievement.description || ""}
                  onChange={handleInputChange}
                />
              </div>

              <div className={styles.cleanFormGroup}>
                <label htmlFor="students">Students</label>
                <StudentMultiSearch
                  studentids={studentIds}
                  onChange={handleStudentChange}
                />
              </div>

              <div className={styles.cleanFormGroup}>
                <label htmlFor="teachers">Teachers</label>
                <TeacherMultiSearch
                  teacherids={teacherIds}
                  onChange={handleTeacherChange}
                />
              </div>


              <div className={styles.cleanFormGroup + " " + styles.actions}>
                <button type="submit" className={styles.submitButton}>Save</button>
                <button type="button" className={styles.cancelButton} onClick={toggleModal}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}


