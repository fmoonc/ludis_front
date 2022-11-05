import { atom, selector } from "recoil";

const toastError = {
  title: "Error",
  msg: "Error",
  icon: "XCircle",
  className: "text-danger",
  duration: 3000,
};

const toastSuccess = {
  title: "Success",
  msg: "Success",
  icon: "CheckCircle",
  className: "text-success",
  duration: 3000,
};

export const notificationRef = atom({
  key: "notificationRef",
  default: { ref: null, ...toastSuccess },
});

export const addRefNotification = selector({
  key: "addRefNotification",
  get: ({ get }) => {
    return get(notificationRef);
  },
  set: ({ set, get }, newValue) => {
    
    const dataNotification = get(notificationRef);
    set(notificationRef, { ...dataNotification, ref: newValue });
  },
});

export const addNotification = selector({
  key: "addNotification",
  get: ({ get }) => {
    return get(notificationRef);
  },
  set: ({ set, get }, { type, msg }) => {
    const { ref } = get(notificationRef);
    const dataToast = type === "success" ? toastSuccess : toastError;
    set(notificationRef, { ref, ...dataToast, msg });
  },
});
