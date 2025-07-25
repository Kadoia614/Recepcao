import { useState } from "react";

import UserTable from "./table/UserTable";
import UserModal from "./modal/UserModal";

import { UserProvider } from "@Context/users/UsersProvider";


const Users = () => {
  // UserModal
  const [isEditVisible, setIsEditVisible] = useState(false);
  const [isExcludeVisible, setIsExcludeVisible] = useState(false);

  return (
    <UserProvider>
      <UserModal
        visible={isEditVisible}
        onHide={() => setIsEditVisible(false)}
      />
      <UserTable setEditIsVisible={setIsEditVisible} setExcludeIsVisible={setIsExcludeVisible} />
    </UserProvider>
  );
};

export default Users;
