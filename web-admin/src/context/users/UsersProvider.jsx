import { useState } from "react";
import { UsersContext } from "./UsersContext"

export const UserProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [userTarget, setUserTarget] = useState(null);

  const addUsers = (newUser) => {
    setUsers((prevUsers) => [...prevUsers, newUser]);
  };

  const removeUsers = (userId) => {
    setUsers((prevUsers) => prevUsers.filter(user => user.id !== userId));
  };

  const updateUsers = (updatedUser) => {
    setUsers((prevUsers) =>
      prevUsers.map(user => user.id === updatedUser.id ? updatedUser : user)
    );
  };

  return (
    <UsersContext.Provider value={{ users, setUsers, addUsers, removeUsers, updateUsers, totalUsers, setTotalUsers, userTarget, setUserTarget }}>
      {children}
    </UsersContext.Provider>
  );
};
