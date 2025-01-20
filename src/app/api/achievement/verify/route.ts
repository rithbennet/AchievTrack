import prisma from "@/lib/db";
import { NextRequest } from "next/server";

export async function PUT(req: NextRequest) {
  const { id, verify, verifier } = await req.json();

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

    const createdby = await prisma.achievementdata.findUnique({
      where: {
        id: Number(id),
      },
      select: {
        createdby: true,
      },
    });

    if (createdby) {
      await prisma.notification.create({
        data: {
          type: "AchievementVerified",
          from: verifier, // Use the extracted createdBy variable
          created_at: new Date(),
          recipientid: createdby.createdby,
        },
      });
    } else {
      return new Response("Created by user not found", { status: 404 });
    }

    return new Response(JSON.stringify(achievement), { status: 200 });
  } catch (error) {
    console.error("Error updating verification status:", error);
    return new Response("Error updating verification status", { status: 500 });
  }
}
