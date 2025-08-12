import { useState, useMemo, useEffect } from "react";
// import { Card } from "@/components/ui/card";
// import { Table } from "primereact/table";
import { DataTable } from "primereact/datatable";
import TableHeader from "../../../components/table/TableHeader";

import { Column } from "primereact/column";
import { Avatar } from "primereact/avatar";
import { Tag } from "primereact/tag";
import { format } from "date-fns";
import { InputText } from "primereact/inputtext";
import { Calendar } from "primereact/calendar";

const mockData = [
  {
    uuid: "1",
    visitor: { name: "João Silva", document: "123.456.789-00" },
    subject: "Assinatura de contrato",
    creator: { name: "Maria Souza" },
    createdAt: new Date("2025-08-01T09:30:00"),
  },
  {
    uuid: "2",
    visitor: { name: "Ana Lima", document: "987.654.321-00" },
    subject: "Reunião sobre projeto",
    creator: { name: "Carlos Pinto" },
    createdAt: new Date("2025-08-01T14:15:00"),
  },
  {
    uuid: "3",
    visitor: { name: "Pedro Costa", document: "222.333.444-55" },
    subject: "Entrega de documentos",
    creator: { name: "Fernanda Oliveira" },
    createdAt: new Date("2025-08-02T10:45:00"),
  },
];

export default function VisitsTable() {
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);

  const fetchData = async () => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    setData(mockData);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <TableHeader
        start={<h3 className="text-3xl">Visits</h3>}
        end={
          <div className="flex gap-4 items-end">
            <span>
              <InputText
                placeholder="Buscar por visitante, assunto ou criador"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-80"
              />
            </span>
            {/* <Calendar
              value={dateFilter}
              onChange={(e) => setDateFilter(e.value)}
              dateFormat="dd/mm/yy"
              placeholder="Filter by Date"
            /> */}
          </div>
        }
      />

      <div className="shadow-sm p-4 rounded-2xl flex flex-col gap-">
        <DataTable value={data} className="text-sm">
          <Column
            header="Visitante"
            body={(rowData) => (
              <div className="flex items-center gap-3">
                <Avatar
                  label={rowData.visitor.name[0]}
                  shape="circle"
                  className="bg-primary text-white"
                />
                <div>
                  <div className="font-medium text-gray-900">
                    {rowData.visitor.name}
                  </div>
                  <div className="text-xs text-gray-500">
                    {rowData.visitor.document}
                  </div>
                </div>
              </div>
            )}
          />
          <Column
            field="subject"
            header="Assunto"
            body={(rowData) => <span>{rowData.subject}</span>}
          />
          <Column
            field="creator"
            header="Registrado por"
            body={(rowData) => <span>{rowData.creator.name}</span>}
          />
          <Column
            field="createdAt"
            header="Hora"
            body={(rowData) => (
              <span>{format(rowData.createdAt, "dd/MM/yyyy HH:mm")}</span>
            )}
          />
          <Column
            body={() => (
              <Tag severity="info" value="Concluído" className="text-xs" />
            )}
          />
        </DataTable>
      </div>
    </div>
  );
}
