import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest) {
  try {
    const { ids } = await req.json();

    if (!Array.isArray(ids) || ids.length === 0) {
      return new NextResponse("Invalid request payload", { status: 400 });
    }

    await prisma.notification.updateMany({
      data: {
        acknowledged: true,
      },
      where: {
        id: {
          in: ids,
        },
      },
    });

    return new NextResponse("Notifications marked as read", { status: 200 });
  } catch (error) {
    console.error("Error marking notifications as read:", error);
    return new NextResponse("Error marking notifications as read", {
      status: 500,
    });
  }
}
