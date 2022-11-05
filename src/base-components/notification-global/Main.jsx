import { Lucide, Notification } from "@/base-components";
import { addRefNotification, notificationRef } from "@/stores/notification";
import React from "react";
import { useSetRecoilState, useRecoilValue } from "recoil";

export default function NotificationGlobal() {
  const setRefNotification = useSetRecoilState(addRefNotification);
  const notification = useRecoilValue(notificationRef);

  return (
    <Notification
      getRef={(el) => {
        setRefNotification(el);
      }}
      options={{
        duration: notification.duration,
      }}
      className="flex"
    >
      <Lucide icon={notification.icon} className={notification.className} />
      <div className="ml-4 mr-4">
        <div className="font-medium">{notification.title}</div>
        <div className="text-slate-500 mt-1">{notification.msg}</div>
      </div>
    </Notification>
  );
}
