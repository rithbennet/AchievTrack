"use server"

import prisma from "@/lib/db";
import { z } from "zod";

// Define a schema for creating a new student
const createStudentSchema = z.object({
  name: z.string().min(1, "Name is required").max(100, "Name must be at most 100 characters"),
  class: z.string().min(1, "Class is required").max(50, "Class must be at most 50 characters"),
  mykad: z.string().length(12, "MYKAD must be 12 characters").nonempty("MYKAD is required"),
});

// Define a schema for editing an existing student
const editStudentSchema = z.object({
  name: z.string().min(1, "Name is required").max(100, "Name must be at most 100 characters"),
  class: z.string().min(1, "Class is required").max(50, "Class must be at most 50 characters"),
  mykad: z.string().length(12, "MYKAD must be 12 characters").nonempty("MYKAD is required"),
  is_active: z.boolean().optional(),
});

// Create a new student
export async function createStudent(formData: FormData) {
  const studentData = {
    name: formData.get('name') as string,
    class: formData.get('class') as string,
    mykad: formData.get('mykad') as string,
  };

  // Validate the student data
  const validatedStudentData = createStudentSchema.parse(studentData);

  // Create the student in the database
  const student = await prisma.student.create({
    data: {
      name: validatedStudentData.name,
      class: validatedStudentData.class,
      mykad: validatedStudentData.mykad,
    },
  });

  return student;
}

// Edit an existing student
export async function editStudent(studentId: number, formData: FormData) {
  const studentData = {
    name: formData.get('name') as string,
    class: formData.get('class') as string,
    mykad: formData.get('mykad') as string,
    is_active: formData.get('is_active') as string | undefined,
  };

  // Handle null values in FormData
  if (studentData.is_active === null) {
    studentData.is_active = undefined;
  }

  // Validate the student data
  const validatedStudentData = editStudentSchema.parse(studentData);

  // Prepare the data to be updated
  const updateData: any = {
    name: validatedStudentData.name,
    class: validatedStudentData.class,
    mykad: validatedStudentData.mykad,
  };

  // Set active status if provided
  if (validatedStudentData.is_active !== undefined) {
    updateData.is_active = validatedStudentData.is_active;
  }

  // Update the student in the database
  const student = await prisma.student.update({
    where: {
      id: studentId,
    },
    data: updateData,
  });

  return student;
}

// View a student by ID
export async function viewStudent(studentId: number) {
  const student = await prisma.student.findUnique({
    where: { id: studentId },
    select: {
      id: true,
      name: true,
      class: true,
      mykad: true,
      is_active: true,
    },
  });

  if (!student) {
    throw new Error(`Student with ID ${studentId} does not exist.`);
  }

  return student;
}

// Delete a student by ID
export async function deleteStudent(studentId: number) {
  const student = await prisma.student.findUnique({
    where: { id: studentId },
  });

  if (!student) {
    throw new Error(`Student with ID ${studentId} does not exist.`);
  }

  const response = await prisma.student.delete({
    where: { id: studentId },
  });

  return response;
}

// List all students
export async function relatedAchievements(id: number) {
  const achievements = await prisma.achievementstudents.findMany({
    where: {
      studentid: id,
    },
  });

  if (!achievements) {
    throw new Error(`No achievement found`);
  }

  const achievementList = await prisma.achievementdata.findMany({
    where: {
      id: {
        in: achievements.map(a => a.achievementid)
      }
    }
  });

  return achievementList;

}