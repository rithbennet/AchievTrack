import prisma from "@/lib/db";
import { NextResponse, NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const userId = req.headers.get("user-id");

  if (!userId) {
    return NextResponse.json({ error: "User ID is required" }, { status: 400 });
  }

  try {
    const dbNotifications = await prisma.notification.findMany({
      where: {
        acknowledged: false,
        type: "AchievementVerified",
        recipientid: Number(userId),
      },
      include: {
        users: {
          select: {
            name: true,
          },
        },
      },
    });

    const notifications = dbNotifications.map((notification) => {
      let message = "";

      if (notification.type === "AchievementVerified") {
        message =
          "Your achievement has been verified by " + notification.users.name;
      }

      return {
        id: notification.id,
        message,
        read: notification.acknowledged,
        timestamp: new Date(notification.created_at).toLocaleString(),
      };
    });

    console.log("Notifications fetched:", notifications);

    return NextResponse.json({
      status: "ok",
      data: notifications,
    });
  } catch (error) {
    console.error("Error fetching notifications:", error);
    return NextResponse.json(
      {
        status: "error",
        message: "Failed to fetch notifcations",
      },
      { status: 500 }
    );
  }
}
