import { AuthContext } from "./AuthContext";
import { useEffect, useState } from "react";

const ProfileProvider = ({ children }) => {
  const [token, setToken] = useState(
    localStorage.getItem("token") ? localStorage.getItem("token") : null
  );
  const [isAuth, setIsAuth] = useState(token ? true : false);
  const [error, setError] = useState(null);

  const attError = (error) => {
    const message =
      error.response.data.message || error.message || "Unknow Error";
    const code = error.status || 500;

    setError({ message: message, code: code });
  };

  const Login = (token) => {
    localStorage.setItem("token", token);
    setToken(token);
    setIsAuth(true);
  };

  const Logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setIsAuth(false);
  };

  useEffect(() => {
    setIsAuth(token ? true : false);
  }, [token]);

  return (
    <AuthContext.Provider
      value={{ token, Login, Logout, error, attError, isAuth }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default ProfileProvider;
