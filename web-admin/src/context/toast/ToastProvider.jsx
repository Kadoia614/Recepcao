// src/components/ui/ToastProvider.jsx
import { Toast } from "primereact/toast";
import { useRef } from "react";
import { ToastContext } from "./ToastContext"

export const ToastProvider = ({ children }) => {
  const toastRef = useRef(null);

  const showToast = (severity = "info", summary = "", detail = "", life = 3000) => {
    toastRef.current?.show({ severity, summary, detail, life });
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      <Toast ref={toastRef} />
      {children}
    </ToastContext.Provider>
  );
};
