import { useState } from "react";

import UserTable from "./table/UserTable";
import UserModal from "./modal/UserModal";
import UserDeleteModal from "./modal/UserDeleteModal";

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

      <UserDeleteModal
        visible={isExcludeVisible}
        onHide={() => setIsExcludeVisible(false)}
      />
      <UserTable
        setEditIsVisible={setIsEditVisible}
        setExcludeIsVisible={setIsExcludeVisible}
      />
    </UserProvider>
  );
};

export default Users;
