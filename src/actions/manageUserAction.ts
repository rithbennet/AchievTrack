"use server"

import prisma from "@/lib/db";
import { z } from "zod";
import { hash } from "bcrypt";

// Define a schema for user validation using Zod
const userSchema = z.object({
    name: z.string().min(1, "Name is required").max(100, "Name must be at most 100 characters"),
    email: z.string().email("Invalid email address").nonempty("Email is required"),
    role: z.string().nonempty("Role is required"),
    password: z.string().nonempty("Password is required").min(8, "Password must be at least 8 characters"),
    
  });

// Create a new user
export async function createUser(formData: FormData){
  // Extract and validate form data using Zod
  const userData = {
    name: formData.get('name') as string,
    email: formData.get('email') as string,
    password: formData.get('password') as string,
    role: formData.get('role') as string,
  };

  // Validate the user data
  const validatedUserData = userSchema.parse(userData);

  // Hash the password
  const hashedPassword = await hash(validatedUserData.password, 10);

  // Create the user in the database
  const user = await prisma.user.create({
    data: {
      name: validatedUserData.name,
      email: validatedUserData.email,
      password: hashedPassword,
      role: validatedUserData.role,
    },
  });

}

export async function updateUser(userId: number, formData: FormData){
  // Extract and validate form data using Zod
  const userData = {
    name: formData.get('name') as string,
    email: formData.get('email') as string,
    password: formData.get('password') as string,
    role: formData.get('role') as string,
  };

  // Validate the user data
  const validatedUserData = userSchema.parse(userData);

  // Hash the password
  const hashedPassword = await hash(validatedUserData.password, 10);

  // Update the user in the database
  const user = await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      name: validatedUserData.name,
      email: validatedUserData.email,
      password: hashedPassword,
      role: validatedUserData.role,
    },
  });

}

export async function deleteUser(userId: number) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user) {
    throw new Error(`User with ID ${userId} does not exist.`);
  }

  const response = await prisma.user.delete({
    where: { id: userId },
  });

  return response;
}