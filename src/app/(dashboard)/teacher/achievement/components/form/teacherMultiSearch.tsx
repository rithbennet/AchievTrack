"use client";
import React, { useState, useEffect } from 'react';
import MultipleSelector, { Option } from '@/components/ui/multiple-selector';
interface Teacher {
  id: number;
  name: string;
}

interface TeacherMultiSearchProps {
  onChange: (teachers: number[]) => void;
  teacherids?: number[];
}

const teacherSearch = async (value: string): Promise<Option[]> => {
  return new Promise((resolve) => {
    setTimeout(async () => {
      const res = await fetch(`/api/teacher?name=${value}`)
        .then(res => res.json())
        .then(data => data.teachers.map((teacher: Teacher) => ({
          label: teacher.name,
          value: teacher.id,
        })));
      resolve(res);
    }, 100);
  });
};

export default function TeacherMultiSearch({ onChange, teacherids }: TeacherMultiSearchProps) {
  const [, setSearchTerm] = useState('');
  const [selectedTeachers, setSelectedTeachers] = useState<Option[]>([]);
  const [, setIsTriggered] = React.useState(false);

  useEffect(() => {
    const fetchInitialTeachers = async () => {
      try {
        const teacherPromises = (teacherids || []).map(id =>
          fetch(`/api/teacher?ids=${id}`)
            .then(res => res.json())
            .then(data => data.teachers.map((teacher: Teacher) => ({
              label: teacher.name,
              value: teacher.id,
            })))
        );
        const fetchedTeachersArray = await Promise.all(teacherPromises);
        const fetchedTeachers: Option[] = fetchedTeachersArray.flat();


        setSelectedTeachers(fetchedTeachers);
      } catch (err) {
        console.error('Error fetching initial Teachers:', err);
      }
    };
    fetchInitialTeachers();
  }, []);

  useEffect(() => {
    const setTeachersIds = (selected: Option[]) => {
      onChange(selected.map(option => parseInt(option.value)));
    };
    setTeachersIds(selectedTeachers);
  }, [selectedTeachers]);

  return (
    <div>
      <MultipleSelector
        value={selectedTeachers}
        onSearch={async (value) => {
          setSearchTerm(value); // Update the searchTerm state
          setIsTriggered(true);
          const res = await teacherSearch(value);
          setIsTriggered(false);
          return res;
        }}
        onChange={setSelectedTeachers}
        placeholder="search teachers"
        loadingIndicator={
          <p className="py-2 text-center text-lg leading-10 text-muted-foreground">searching teacher...</p>
        }
        emptyIndicator={
          <p className="w-full text-center text-lg leading-10 text-muted-foreground">
            teacher not found.
          </p>
        }
      />
    </div>
  );
}
