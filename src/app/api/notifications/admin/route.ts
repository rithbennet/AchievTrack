import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const dbNotifications = await prisma.notification.findMany({
      where: { acknowledged: false },
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

      if (notification.type === "VerifyRequest") {
        message =
          "New achievement from " + notification.users.name + " please verify";
      } else if (notification.type === "EditedVerifyRequest") {
        message =
          "Edited achievement from " +
          notification.users.name +
          " please verify";
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
