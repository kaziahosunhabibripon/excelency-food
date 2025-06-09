"use client";

import { toast, ToastOptions, TypeOptions, Id } from "react-toastify";

const toastType: TypeOptions[] = [
  "info",
  "success",
  "warning",
  "error",
  "default",
];

interface ToastAlertOptions extends ToastOptions {
  autoClose?: number;
}

const toastAlert = (
  type: TypeOptions,
  toastBody: string,
  position?: ToastOptions["position"],
  toastId?: React.MutableRefObject<Id | null>,
  options: ToastAlertOptions = { autoClose: 1000 }
): void => {
  if (toastId?.current) {
    toast.dismiss(toastId.current);
  }

  if (toastType.includes(type)) {
    toast[type](toastBody, {
      position,
      toastId: toastId?.current ?? undefined,
      ...options,
    });
  } else {
    toast(toastBody || "Default Toast", {
      position,
      toastId: toastId?.current ?? undefined,
      ...options,
    });
  }
};

export default toastAlert;
