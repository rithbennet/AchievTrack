import { useState, useEffect } from "react";
import { getSession } from "next-auth/react";

export interface Notification {
  id: string;
  message: string;
  read: boolean;
  timestamp: Date;
}

export const useNotifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [userid, setUserid] = useState<string | null>(null);

  useEffect(() => {
    const getUserId = async () => {
      const session = await getSession();
      setUserid(session?.user?.id ?? null);
    };

    getUserId();
  }, []);

  useEffect(() => {
    // Fetch notifications from the API
    const fetchNotifications = async () => {
      try {
        const response = await fetch("/api/notifications/teacher", {
          headers: userid ? { "user-id": userid } : {}, // Replace with actual user ID
        });
        const data = await response.json();
        console.log("Data:", data);
        const notifications = Array.isArray(data.data)
          ? data.data.map((item: Notification) => ({
              id: item.id,
              message: item.message,
              read: item.read,
              timestamp: new Date(item.timestamp), // Convert timestamp to Date object
            }))
          : [];
        setNotifications(notifications);
        console.log("Notifications fetched:", notifications);
      } catch (error) {
        console.error("Failed to fetch notifications:", error);
        setNotifications([]);
      }
    };

    fetchNotifications();
  }, [userid]);

  const markAsRead = async (id: string) => {
    try {
      await fetch("/api/notifications/read", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ids: [id] }),
      });

      setNotifications((prevNotifications) =>
        prevNotifications.map((notification) =>
          notification.id === id
            ? { ...notification, read: true }
            : notification
        )
      );
    } catch (error) {
      console.error("Failed to mark notification as read:", error);
    }
  };

  const clearAll = async () => {
    try {
      const ids = notifications.map((notification) => notification.id);
      await fetch("/api/notifications/read", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ids }),
      });

      setNotifications([]);
    } catch (error) {
      console.error("Failed to clear notifications:", error);
    }
  };

  return { notifications, markAsRead, clearAll };
};
