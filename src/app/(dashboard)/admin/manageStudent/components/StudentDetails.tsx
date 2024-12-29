'use client'; // This line marks the component as a client component

import styles from '../styles/manageStudent.module.scss';
import React, { useEffect, useState } from 'react';

interface StudentDetailsProps {
  initialData: {
    id: number;
    name: string;
    mykad: string;
    class: string;
  };
  closeModalAction: () => void;
}

interface Option {
  id: number;
  title: string;
}

export default function StudentDetails({ initialData, closeModalAction }: StudentDetailsProps) {
  // State to store the achievements data
  const [achievements, setAchievements] = useState<Option[]>([]);

  // Fetch achievements data based on student ID
  const achievementlist = async (): Promise<Option[]> => {
    const res = await fetch(`/api/tmanageStudent?ids=${initialData.id}`);
    const data = await res.json(); // Assuming the API returns a JSON response
    return data;
  };

  // Use useEffect to fetch the achievements once the component mounts
  useEffect(() => {
    const fetchAchievements = async () => {
      const data = await achievementlist();
      setAchievements(data); // Store the fetched achievements in state
    };
    fetchAchievements();
  }, [initialData.id]); // Depend on student ID to refetch achievements if it changes

  return (
    <div className={styles.modalContent}>
      <h2>Student Details</h2>
      <p><strong>Name:</strong> {initialData.name}</p>
      <p><strong>MyKad:</strong> {initialData.mykad}</p>
      <p><strong>Class:</strong> {initialData.class}</p>
      <h3>Achievements</h3>
      <ul>
        {achievements.map((achievement: { id: number; title: string }) => (
          <li key={achievement.id}>{achievement.title}</li>
        ))}
      </ul>
      <button onClick={closeModalAction} className={styles.closeButton}>
        Close
      </button>
    </div>
  );
}
