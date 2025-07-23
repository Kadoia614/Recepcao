import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import TableHeader from "@/components/table/TableHeader";
import { Paginator } from "primereact/paginator"; 

import { useEffect, useState } from "react";
import { useToast } from "@Context/toast/ToastContext";
import { useUsers } from "@Context/users/UsersContext";
import { getUser } from "@API/User";

const columns = [
  { field: "first_name", header: "First_Name" },
  { field: "last_name", header: "Last_Name" },
  { field: "username", header: "Username" },
  { field: "email", header: "Email" },
  { field: "password", header: "Password" },
];

const UserTable = ({ setIsVisible }) => {
  const { users, setUsers, totalUsers, setTotalUsers } = useUsers();

  const { showToast } = useToast();
  const [query, setQuery] = useState({
    page: 0,
    limit: 10,
    search: null,
  });

  const fetchData = async () => {
    try {
      const { user, count } = await getUser(
        query.page,
        query.limit,
        query.search
      );
      setTotalUsers(count);
      setUsers(user);
    } catch (error) {
      showToast("error", "error", error.response.data.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, [query]);

  return (
    <section>
      <TableHeader
        start={
          <div>
            <button onClick={() => setIsVisible(true)} className="btn-primary">
              New user
            </button>
          </div>
        }
      ></TableHeader>
      <DataTable value={users} size="medium" stripedRows>
        {columns.map((col, index) => (
          <Column key={index} field={col.field} header={col.header} />
        ))}
      </DataTable>
      <Paginator
        first={query.page}
        rows={query.limit}
        totalRecords={totalUsers}
        rowsPerPageOptions={[1,10, 20, 30]}
        onPageChange={(e) =>
          setQuery((prev) => ({
            ...prev,
            page: e.first,
            limit: e.rows,
          }))
        }
      />
    </section>
  );
};

export default UserTable;
