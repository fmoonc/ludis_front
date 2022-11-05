import { addNotification, notificationRef } from "@/stores/notification";
import { useEffect, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";

export default function useNotification() {
  const notification = useRecoilValue(notificationRef);
  const setNotification = useSetRecoilState(addNotification);
  const [activeNotification, setActiveNotification] = useState(false);

  useEffect(() => {
    if (activeNotification === true) {
      notification?.ref.showToast();
      setActiveNotification(false);
    }
  }, [activeNotification]);

  const showNotification = ({ type = "success", msg = "mensaje" }) => {
    notification?.ref.hideToast(); // TODO: falla al caducar el token
    setNotification({ type, msg });
    setActiveNotification(true);
  };

  return {
    showNotification,
  };
}
