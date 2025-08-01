import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";

import { useAuth } from "../context/auth/AuthContext";
import { useProfile } from "../context/profile/ProfileContext";

import SideNav from "@/pages/nav/SideNav";
import ErrorMiddleware from "./ErrorMiddleware";
import { validateToken } from "../service/Login";

const ProtectRouter = () => {
  const { isAuth, token, error, Logout } = useAuth();
  const { attImage, attUser } = useProfile(); 

  const Navigate = useNavigate();

  const Validate = async () => {
    try {
     const {name, role, uuid} = await validateToken();
      attUser({name, role, uuid})
      
    } catch (error) {
      if (error.status == 401)
        Logout()
    }
  };

  useEffect(() => {
    !isAuth || !token ? Navigate("/") : "";
    Validate()
  }, [token, isAuth]);

  return (
    <div className="h-full bg-content m-auto border-b border-gray-200 dark:border-none mb-1 flex md:flex-row flex-col">
      <SideNav />
      {error ? (
        <ErrorMiddleware error={error} />
      ) : (
        <div className="p-8 overflow-x-hidden w-full">
          <Outlet></Outlet>
        </div>
      )}
    </div>
  );
};

export default ProtectRouter; // Exporting the component
