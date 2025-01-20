'use client';

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createStudent, updateStudent } from '@/actions/manageStudentAction';
import { useRouter } from 'next/navigation';
import { Pencil } from 'lucide-react';

interface StudentFormProps {
  initialData?: {
    id?: number; // Ensure id is a number
    name: string;
    mykad: string;
    class: string;
  };

  existingMyKads: string[]
}

export default function AddButtonStudents({ initialData, existingMyKads }: StudentFormProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [student, setStudent] = useState({
    name: '',
    mykad: '',
    class: '',
  });

  const [error, setError] = useState<string | null>(null); // State for error message

  useEffect(() => {
    if (initialData) {
      setStudent(initialData);
    }
  }, [initialData]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setStudent((prevStudent) => ({ ...prevStudent, [name]: value }));
  };

  async function handleSubmit(event: React.FormEvent) {

    event.preventDefault();
    if (existingMyKads.includes(student.mykad)) {
      setError('MyKad is the same, invalid cannot be same');
      return;
    }
    setError(null);
    const formData = new FormData(event.target as HTMLFormElement);
    if (initialData && typeof initialData.id === 'number') {
      await updateStudent(initialData.id, formData);
    } else {
      await createStudent(formData);
    } // Create or update student
    console.log('Submitted:', { student });
    // Reset form and close dialog
    setOpen(false);
    router.refresh();
  }


  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>{initialData ? <Pencil color='white' /> : 'Add'}</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{initialData ? 'Edit Student' : 'Add New Student'}</DialogTitle>
          <DialogDescription>
            {initialData ? 'Edit the student\'s details below.' : 'Enter the student\'s details below.'}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                name="name"
                value={student.name}
                onChange={handleChange}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="mykad" className="text-right">
                MyKad
              </Label>
              <Input
                id="mykad"
                name="mykad"
                value={student.mykad}
                onChange={handleChange}
                className="col-span-3"
                required
                minLength={12}
                maxLength={12}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="class" className="text-right">
                Class
              </Label>
              <Input
                id="class"
                name="class"
                value={student.class}
                onChange={handleChange}
                className="col-span-3"
                required
              />
            </div>
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>} {/* Display error message */}
          <div className="flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2">
            <Button type="submit">{initialData ? 'Save Changes' : 'Add Student'}</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

