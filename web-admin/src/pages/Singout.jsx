import { useEffect } from "react";
import { useAuth } from "../context/auth/AuthContext";
import { useNavigate } from "react-router-dom";

const Singout = () => {
  const { Logout } = useAuth();
  const Navigate = useNavigate();
  useEffect(() => {
    Logout();
    Navigate("/");
  });

  return;
};

export default Singout;
