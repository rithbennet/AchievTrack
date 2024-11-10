import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const users = await prisma.users.findMany();

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
}

export async function POST(req: Request) {
  return NextResponse.json({
    status: "ok",
    message: "We are creating a request"
  });
}
