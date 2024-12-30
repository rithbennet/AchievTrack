import prisma from "@/lib/db";
import { NextRequest } from "next/server";

export async function PUT(req: NextRequest) {
  const { id, verify } = await req.json();

  if (!id || verify === undefined) {
    return new Response("Missing id or verify", { status: 400 });
  }
  try {
    const achievement = await prisma.achievementdata.update({
      where: {
        id: Number(id),
      },
      data: {
        verified: verify,
      },
    });
    return new Response(JSON.stringify(achievement), { status: 200 });
  } catch (error) {
    console.error("Error updating verification status:", error);
    return new Response("Error updating verification status", { status: 500 });
  }
}
