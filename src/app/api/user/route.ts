import { NextResponse } from "next/server";
import db from "@/lib/db"; // Ensure the correct path to your db file
import { hash } from 'bcrypt';
import { z } from "zod";

// Define a schema for user validation using zod
const userSchema = z.object({
  name: z.string().min(1, "Name is required").max(100, "Name must be at most 100 characters"),
  email: z.string().email("Invalid email address").nonempty("Email is required"),
  role: z.string().nonempty("Role is required"),
  password: z.string().nonempty("Password is required").min(8, "Password must be at least 8 characters"),
  id: z.number().optional(),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, role, password } = userSchema.parse(body);

    // Check if the user already exists
    const existingUserByEmail = await db.user.findUnique({
      where: { email: email },
    });

    if (existingUserByEmail) {
      return NextResponse.json({
        status: "error",
        message: "User with this email already exists",
      }, { status: 409 });
    }

    const hashedPassword = await hash(password, 10);

    // Create a new user
    const newUser = await db.user.create({
      data: {
        name,
        email,
        role,
        password: hashedPassword,
      },
    });
    const { password: newUserPassword, ...rest } = newUser;

    return NextResponse.json({
      user: rest,
      message: "User created successfully",
    }, { status: 201 });
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json({
      status: "error",
      message: "Failed to create user",
    }, { status: 500 });
  }
}

export async function GET() {
  try {
    const users = await db.user.findMany();
 

    return NextResponse.json({
      status: "ok",
      data: users,
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json({
      status: "error",
      message: "Failed to fetch users",
    }, { status: 500 });
  }
}

