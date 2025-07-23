import { useState } from "react";

import UserTable from "./table/UserTable";
import UserModal from "./modal/UserModal";

import { UserProvider } from "@Context/users/UsersProvider";


const Users = () => {
  // UserModal
  const [isVisible, setIsVisible] = useState(false);

  return (
    <UserProvider>
      <UserModal
        visible={isVisible}
        onHide={() => setIsVisible(false)}
      />
      <UserTable setIsVisible={setIsVisible} />
    </UserProvider>
  );
};

export default Users;
