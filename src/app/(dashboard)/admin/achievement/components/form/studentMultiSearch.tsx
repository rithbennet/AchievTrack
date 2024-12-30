"use client";
import React, { useState, useEffect } from 'react';
import MultipleSelector, { Option } from '@/components/ui/multiple-selector';

interface Student {
  id: number;
  name: string;
  class: string;
}

interface StudentMultiSearchProps {
  onChange: (students: number[]) => void;
  studentids?: number[];
}

const studentSearch = async (value: string): Promise<Option[]> => {
  return new Promise((resolve) => {
    setTimeout(async () => {
      const res = await fetch(`/api/student?name=${value}`)
        .then(res => res.json())
        .then(data => data.students.map((student: Student) => ({
          label: student.name,
          value: student.id,
          group: student.class
        })));
      resolve(res);
    }, 100);
  });
};

export default function StudentMultiSearch({ onChange, studentids }: StudentMultiSearchProps) {
  const [, setSearchTerm] = useState('');
  const [selectedStudents, setSelectedStudents] = useState<Option[]>([]);
  const [, setIsTriggered] = React.useState(false);

  useEffect(() => {
    const fetchInitialStudents = async () => {
      try {
        const studentPromises = (studentids || []).map(id =>
          fetch(`/api/student?ids=${id}`)
            .then(res => res.json())
            .then(data => data.students.map((student: Student) => ({
              label: student.name,
              value: student.id,
              group: student.class
            })))
        );
        const fetchedStudentsArray = await Promise.all(studentPromises);
        const fetchedStudents: Option[] = fetchedStudentsArray.flat();


        setSelectedStudents(fetchedStudents);
      } catch (err) {
        console.error('Error fetching initial Students:', err);
      }
    };
    fetchInitialStudents();
  },);

  useEffect(() => {
    const setStudentsIds = (selected: Option[]) => {
      onChange(selected.map(option => parseInt(option.value)));
    };
    setStudentsIds(selectedStudents);
  }, [selectedStudents, onChange]);



  return (
    <div>
      <MultipleSelector
        value={selectedStudents}
        onSearch={async (value) => {
          setSearchTerm(value); // Update the searchTerm state
          setIsTriggered(true);
          const res = await studentSearch(value);
          setIsTriggered(false);
          return res;
        }}
        onChange={setSelectedStudents}
        placeholder="search students"
        groupBy='group'
        loadingIndicator={
          <p className="py-2 text-center text-lg leading-10 text-muted-foreground">searching student...</p>
        }
        emptyIndicator={
          <p className="w-full text-center text-lg leading-10 text-muted-foreground">
            student not found.
          </p>
        }
      />
    </div>
  );
}
