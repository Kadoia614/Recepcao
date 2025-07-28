// src/components/ui/ToastProvider.jsx
import { createContext, useContext } from "react";

export const VisitorsContext = createContext(null);

export const useVisitors = () => useContext(VisitorsContext);
