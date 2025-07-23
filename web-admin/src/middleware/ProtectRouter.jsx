import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";

import { useAuth } from "../context/auth/AuthContext";

import SideNav from "@/pages/nav/SideNav";
import ErrorMiddleware from "./ErrorMiddleware";

const ProtectRouter = () => {
  const { isAuth, token, error } = useAuth();

  const Navigate = useNavigate();

  useEffect(() => {
    !isAuth || !token ? Navigate("/") : "";
  }, []);

  return (
    <div className="h-full bg-window m-auto border-b border-gray-200 dark:border-[unset] mb-1 flex md:flex-row flex-col">
      <SideNav />
      {error ? (
        <ErrorMiddleware error={error}/>
      ) : (
        <div className="p-8 overflow-x-hidden w-full">
          <Outlet></Outlet>
        </div>
      )}
    </div>
  );
};

export default ProtectRouter; // Exporting the component
