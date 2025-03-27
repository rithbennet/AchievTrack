"use client";
import { useEffect, useState } from 'react';
import { Bell } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useNotifications, Notification } from './hooks/useNotifications';

export function NotificationBell() {
  const { notifications, markAsRead, clearAll } = useNotifications();
  const [open, setOpen] = useState(false);

  const unreadCount = notifications.filter(n => !n.read).length;

  useEffect(() => {
    console.log('Notifications:', notifications);
  }, [notifications]);

  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);
    if (!isOpen) {
      notifications.forEach(n => markAsRead(n.id));
    }
  };

  return (
    <Popover open={open} onOpenChange={handleOpenChange}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="relative rounded-full h-9 w-9 flex items-center justify-center bg-transparent hover:bg-[rgba(255,255,255,0.2)] transition-colors focus:outline-none"
        >
          <Bell className="h-[1.3rem] w-[1.3rem] text-gray-700" />
          {unreadCount > 0 && (
            <span className="absolute top-0 right-0 inline-flex items-center justify-center w-5 h-5 text-xs font-semibold text-white transform translate-x-1/3 -translate-y-1/3 bg-red-500 rounded-full">
              {unreadCount}
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0 shadow-lg border-gray-200">
        <div className="flex justify-between items-center p-3 border-b border-gray-100">
          <h3 className="font-semibold text-gray-800">Notifications</h3>
          <Button variant="ghost" size="sm" className="h-8 text-xs hover:bg-gray-100" onClick={clearAll}>
            Clear all
          </Button>
        </div>
        <ScrollArea className="h-[300px]">
          {notifications.length === 0 ? (
            <div className="flex items-center justify-center h-20">
              <p className="text-sm text-gray-500">No notifications</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {notifications.map((notification) => (
                <NotificationItem key={notification.id} notification={notification} />
              ))}
            </div>
          )}
        </ScrollArea>
      </PopoverContent>
    </Popover>
  );
}

function NotificationItem({ notification }: { notification: Notification }) {
  return (
    <div className={`p-3 hover:bg-gray-50 ${notification.read ? 'bg-white' : 'bg-blue-50'}`}>
      <p className="text-sm text-gray-800">{notification.message}</p>
      <p className="text-xs text-gray-500 mt-1">
        {notification.timestamp.toLocaleString()}
      </p>
    </div>
  );
}

