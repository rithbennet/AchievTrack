"use client"
import React, { useState, useEffect } from 'react';
import Pills from './pills';
import styles from './multiselect.module.scss';

interface Teacher {
  id: number;
  name: string;
}

interface TeacherMultiSearchProps {
  onChange: (teachers: number[]) => void;
}

export default function teacherMultiSearch({ onChange }: TeacherMultiSearchProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState<Teacher[]>([]);
  const [selectedTeachers, setSelectedTeachers] = useState<Teacher[]>([]);
  const [selectedTeacherSet, setSelectedTeacherSet] = useState(new Set<number>());

  useEffect(() => {
    const fetchUsers = () => {
      if (searchTerm.trim() === '') {
        setSuggestions([]);
        return;
      }
      fetch(`/api/teacher?name=${searchTerm}`)
        .then((res) => res.json())
        .then((data) => setSuggestions(data.teachers || []))
        .catch((err) => {
          console.error(err);
        });
    };

    fetchUsers();
  }, [searchTerm]); 

  const handleSelectedTeacher = (Teacher: Teacher) => {
    const newSelecteedTeachers = [...selectedTeachers, Teacher];
    setSelectedTeachers([...selectedTeachers, Teacher]);
    setSelectedTeacherSet(new Set([...selectedTeacherSet, Teacher.id]));
    setSearchTerm('');
    setSuggestions([]);
    onChange(newSelecteedTeachers.map(s => s.id));
  };

  const handleRemoveTeacher = (id: number) => {
    const newSelectedTeachers = selectedTeachers.filter(Teacher => Teacher.id !== id);
    setSelectedTeachers(selectedTeachers.filter(Teacher => Teacher.id !== id));
    setSelectedTeacherSet(new Set([...selectedTeacherSet].filter(TeacherId => TeacherId !== id)));
    onChange(newSelectedTeachers.map(s => s.id));
  };

  return (
    <div className={styles.container}>
      <div className={styles.searchBar}>
        <Pills students={selectedTeachers} onRemove={handleRemoveTeacher} />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search for Teachers"
          className={styles.searchInput}
        />
      </div>
      <ul className={styles.suggestions}>
        {suggestions.map((teacher) => (
          !selectedTeacherSet.has(teacher.id) && (
            <li key={teacher.id} onClick={() => handleSelectedTeacher(teacher)}>
              {teacher.name}
            </li>
          )
        ))}
      </ul>
    </div>
  );
}