// src/components/ui/ToastProvider.jsx
import { createContext, useContext } from "react";

export const ToastContext = createContext(null);

export const useToast = () => useContext(ToastContext);
