"use client"
import React, { useState, useEffect } from 'react';
import Pills from './pills';
import styles from './multiselect.module.scss';

interface Student {
  id: number;
  name: string;
  class: string;
}

interface StudentMultiSearchProps {
  onChange: (students: number[]) => void;
}

export default function studentMultiSearch({ onChange }: StudentMultiSearchProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState<Student[]>([]);
  const [selectedStudents, setSelectedStudents] = useState<Student[]>([]);
  const [selectedStudentSet, setSelectedStudentSet] = useState(new Set<number>());

  useEffect(() => {
  
    const fetchStudent = () => {
      if (searchTerm.trim() === '') {
        setSuggestions([]);
        return;
      }
      
      fetch(`/api/student?name=${searchTerm}`)
        .then((res) => res.json())
        .then((data) => setSuggestions(data.students || []))
        .catch((err) => {
          console.error(err);
        });
    };

    fetchStudent();
  }, [searchTerm]);

  const handleSelectedStudent = (student: Student) => {
    const newSelectedStudents = [...selectedStudents, student];
    setSelectedStudents([...selectedStudents, student]);
    setSelectedStudentSet(new Set([...selectedStudentSet, student.id]));
    setSearchTerm('');
    setSuggestions([]);
    onChange(newSelectedStudents.map(s => s.id));
  };

  const handleRemoveStudent = (id: number) => {
    const newSelectedStudents = selectedStudents.filter(student => student.id !== id);
    setSelectedStudents(selectedStudents.filter(student => student.id !== id));
    setSelectedStudentSet(new Set([...selectedStudentSet].filter(studentId => studentId !== id)));
    onChange(newSelectedStudents.map(s => s.id));
  };

  return (
    <div className={styles.container}>
      <div className={styles.searchBar}>
        <Pills students={selectedStudents} onRemove={handleRemoveStudent} />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search for students"
          className={styles.searchInput}
        />
      </div>
      <ul className={styles.suggestions}>
        {suggestions.map((student) => (
          !selectedStudentSet.has(student.id) && (
            <li key={student.id} onClick={() => handleSelectedStudent(student)}>
              {student.name}
            </li>
          )
        ))}
      </ul>
    </div>
  );
}