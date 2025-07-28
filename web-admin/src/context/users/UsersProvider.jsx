import { useState } from "react";
import { UsersContext } from "./UsersContext"

export const UserProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [userTarget, setUserTarget] = useState(null);

  const addUsers = (newUser) => {
    setUsers((prevUsers) => [...prevUsers, newUser]);

    setTotalUsers(e => e + 1);
  };

  const removeUsers = (userId) => {
    // Filter out the user with the specified ID
    setUsers((prevUsers) => 
      prevUsers.filter(user => user.uuid != userId));

    setTotalUsers(e => e - 1);

  };

  const updateUsers = (updatedUser) => {
    setUsers((prevUsers) =>
      prevUsers.map(user => user.uuid === updatedUser.uuid ? updatedUser : user)
    );
  };

  return (
    <UsersContext.Provider value={{ users, setUsers, addUsers, removeUsers, updateUsers, totalUsers, setTotalUsers, userTarget, setUserTarget }}>
      {children}
    </UsersContext.Provider>
  );
};
