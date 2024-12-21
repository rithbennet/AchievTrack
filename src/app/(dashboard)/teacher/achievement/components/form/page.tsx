"use client"
import React, { useState, useEffect } from 'react';

interface Student {
  id: number;
  name: string;
  class: string;
}

export default function Page() {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState<Student[]>([]);
  const [selectedStudents, setSelectedStudents] = useState<Student[]>([]);
  const [selectedStudentSet, setSelectedStudentSet] = useState(new Set<number>());

  useEffect(() => {
    const fetchUsers = () => {
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

    fetchUsers();
  }, [searchTerm]);

  const handleSelectedStudent = (student: Student) => {
    setSelectedStudents([...selectedStudents, student]);
    setSelectedStudentSet(new Set([...selectedStudentSet, student.id]));
    setSearchTerm('');
    setSuggestions([]);
  };

  return (
    <div>
      <div>
        {/* Input field with search suggestions */}
        <div>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search for students"
          />
          <ul>
            {suggestions.map((student) => (
              !selectedStudentSet.has(student.id) && (
                <li key={student.id} onClick={() => handleSelectedStudent(student)}>
                  {student.name}
                </li>
              )
            ))}
          </ul>
        </div>
      </div>
      <div>
        <h3>Selected Students</h3>
        <ul>
          {selectedStudents.map((student) => (
            <li key={student.id}>{student.name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
    