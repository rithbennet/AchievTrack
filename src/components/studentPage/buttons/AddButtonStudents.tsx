'use client';

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
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
}

export default function AddButtonStudents({ initialData }: StudentFormProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [student, setStudent] = useState({
    name: '',
    mykad: '',
    class: '',
  });


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
    if (initialData && typeof initialData.id === 'number') {
      await updateStudent(initialData.id, new FormData(event.target as HTMLFormElement));
    } else {
      await createStudent(new FormData(event.target as HTMLFormElement));
    }
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
          <DialogTitle>{initialData ? 'Edit Student' : 'Add New Student'}t</DialogTitle>
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
          <DialogFooter>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

