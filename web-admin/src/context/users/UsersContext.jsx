// src/components/ui/ToastProvider.jsx
import { createContext, useContext } from "react";

export const UsersContext = createContext(null);

export const useUsers = () => useContext(UsersContext);
