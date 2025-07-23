import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import TableHeader from "@/components/table/TableHeader";
import { Paginator } from "primereact/paginator";
import { useState } from "react";
import { useToast } from "@/context/toast/ToastContext";

const columns = [
  { field: "uuid", header: "UUID" },
  { field: "name", header: "Name" },
  { field: "email", header: "Email" },
  { field: "phone", header: "Phone" },
  { field: "photo", header: "Photo" },
];

const VisitorsTable = () => {
  const [visitors, setVisitors] = useState([
    {
      uuid: "224957c6-7bc8-477f-8d4e-91a2b383b5f5",
      name: "Miguel Moraes",
      cpf: "478.677.228.31",
      photo: "static/media/visitors/auditory.jpg",
      email: "miguel.moraes@itapecerica.sp.gov.br",
      phone: "(11) 12345-6789",
      // Additional fields for address
      address: "Rua A, 123",
      city: "City Name",
      state: "State Name",
      zipCode: "12345-678",
    },
  ]);
  const { showToast } = useToast();
  const [query, setQuery] = useState({
    page: 0,
    limit: 10,
    search: null,
  });

  return (
    <section>
      <TableHeader
        start={
          <div>
            <button onClick={() => setIsVisible(true)} className="btn-primary">
              New Visitor
            </button>
          </div>
        }
      ></TableHeader>
      <DataTable
        value={visitors}
        size="medium"
        stripedRows
        paginator
        rows={10}
        rowsPerPageOptions={[10, 20, 30]}
      >
        {columns.map((col, index) => (
          <Column key={index} field={col.field} header={col.header} />
        ))}
      </DataTable>
    </section>
  );
};

export default VisitorsTable;
