import { NextResponse } from "next/server";
import db from "@/lib/db"; // Ensure the correct path to your db file

export async function GET() {
  try {
    const users = await db.users.findMany();

    // Serialize BigInt values to strings
    const serializedUsers = users.map((user: { id: BigInt, created_at: Date }) => ({
      ...user,
      id: user.id.toString(),
      created_at: user.created_at.toISOString(), // Convert DateTime to ISO string
    }));

    return NextResponse.json({
      status: "ok",
      data: serializedUsers,
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json({
      status: "error",
      message: "Failed to fetch users",
    }, { status: 500 });
  }
}
