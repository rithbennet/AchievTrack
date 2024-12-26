import db from '@/lib/db'; // Ensure this imports your database connection

export async function createStudent(studentData: any) {
  try {
    // Check if a student with the same MyKad number already exists
    const existingStudent = await db.student.findUnique({
      where: {
        mykad: studentData.mykad,
      },
    });

    if (existingStudent) {
      throw new Error('A student with this MyKad number already exists.');
    }

    // Create the student in the database
    const student = await db.student.create({
      data: studentData,
    });

    return student;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to create student: ${error.message}`);
    } else {
      throw new Error('Failed to create student: Unknown error');
    }
  }
}