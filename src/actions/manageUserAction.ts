"use server";

import prisma from "@/lib/db";
import { z } from "zod";
import { hash } from "bcrypt";

interface userData {
  name: string;
  email: string;
  password?: string;
  role: string;
}

// Define a schema for creating a new user
const createUserSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .max(100, "Name must be at most 100 characters"),
  email: z
    .string()
    .email("Invalid email address")
    .nonempty("Email is required"),
  role: z.string().nonempty("Role is required"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .nonempty("Password is required"),
});

// Define a schema for updating an existing user
const updateUserSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .max(100, "Name must be at most 100 characters"),
  email: z
    .string()
    .email("Invalid email address")
    .nonempty("Email is required"),
  role: z.string().nonempty("Role is required"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .optional(),
});

// Create a new user
export async function createUser(formData: FormData) {
  // Extract and validate form data using Zod
  const userData = {
    name: formData.get("name") as string,
    email: formData.get("email") as string,
    password: formData.get("password") as string,
    role: formData.get("role") as string,
  };

  // Validate the user data
  const validatedUserData = createUserSchema.parse(userData);

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

  // Populate the admin or teacher table based on the role
  if (validatedUserData.role === "Teacher") {
    await prisma.teacher.create({
      data: {
        id: user.id,
        specialization: "teacher",
      },
    });
  } else if (validatedUserData.role === "Admin") {
    await prisma.admin.create({
      data: {
        id: user.id,
      },
    });
  }

  return user;
}

// Update an existing user
export async function updateUser(userId: number, formData: FormData) {
  // Extract and validate form data using Zod
  const userData = {
    name: formData.get("name") as string,
    email: formData.get("email") as string,
    password: formData.get("password") as string | undefined,
    role: formData.get("role") as string,
  };

  // Handle null values in FormData
  if (userData.password === null) {
    userData.password = undefined;
  }

  // Validate the user data
  const validatedUserData = updateUserSchema.parse(userData);

  // Prepare the data to be updated
  const updateData: userData = {
    name: validatedUserData.name,
    email: validatedUserData.email,
    role: validatedUserData.role,
  };

  // Hash the password if it is provided
  if (validatedUserData.password) {
    const hashedPassword = await hash(validatedUserData.password, 10);
    updateData.password = hashedPassword;
  }

  // Update the user in the database
  const user = await prisma.user.update({
    where: {
      id: userId,
    },
    data: updateData,
  });

  return user;
}

export async function deactivateUser(userId: number) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user) {
    throw new Error(`User with ID ${userId} does not exist.`);
  }

  const response = await prisma.user.update({
    where: { id: userId },
    data: { is_active: !user.is_active },
  });

  return response;
}
