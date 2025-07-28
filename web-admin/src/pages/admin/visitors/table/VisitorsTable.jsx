import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Paginator } from "primereact/paginator";
import { useState, useEffect } from "react";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Tag } from "primereact/tag";

import TableHeader from "@/components/table/TableHeader";
import { useToast } from "@Context/toast/ToastContext";
import { useVisitors } from "@Context/visitors/VisitorsContext";

import { getVisitor } from "@Service/Visitor";
const columns = [
  { field: "name", header: "Name" },
  { field: "waring", header: "Waring" },
  { field: "createdAt", header: "Created At" },
];

const VisitorsTable = ({ setEditIsVisible, setExcludeIsVisible }) => {
  const {
    visitors,
    setVisitors,
    totalVisitor,
    setTotalVisitor,
    setVisitorTarget,
  } = useVisitors();

  const { showToast } = useToast();
  const [query, setQuery] = useState({
    page: 0,
    limit: 10,
    search: null,
  });

  const fetchData = async () => {
    try {
      const { visitor, count } = await getVisitor(
        query.page,
        query.limit,
        query.search
      );
      setTotalVisitor(count);
      setVisitors(visitor);
    } catch (error) {
      showToast("error", "error", error.response.data.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, [query]);

  const ActionsFields = (data) => {
    const toEdit = () => {
      setVisitorTarget(data);
      setEditIsVisible(true);
    };

    const toExclude = () => {
      setVisitorTarget(data);
      setExcludeIsVisible(true);
    };

    return (
      <div className="flex items-center gap-2">
        <Button
          icon="pi pi-pencil"
          className="p-button-rounded p-button-text"
          onClick={() => {
            toEdit();
          }}
        />
        <Button
          icon="pi pi-trash"
          className="p-button-rounded p-button-text p-button-danger"
          onClick={() => {
            toExclude();
          }}
        />
      </div>
    );
  };

  const WarringField = (data) => {
    switch (data.warring) {
      case "secure":
        return <Tag value={data.status} severity={"success"} />;
      case "warning":
        return <Tag value={data.status} severity={"warning"} />;
      case "danger":
        return <Tag value={data.status} severity={"danger"} />;
      default:
        return <Tag value={"unknow"} severity={"info"} />;
    }
  };

  return (
    <section>
      <div className="p-inputgroup flex-1 pb-4">
        <InputText
          type="search"
          placeholder="Pesquisar por nome, CPF ou sobrenome"
          value={query.search || ""}
          onChange={(e) =>
            setQuery((prev) => ({
              ...prev,
              search: e.target.value,
              page: 0,
            }))
          }
          className="w-full px-4 max-w-86"
        />
        <span className="p-inputgroup-addon">
          <i className="pi pi-search" />
        </span>
      </div>
      <TableHeader
        end={
          <div className="md:flex items-center gap-2">
            <Button
              label="New user"
              icon="pi pi-user-plus"
              className="btn-primary"
              onClick={() => setEditIsVisible(true)}
            />
          </div>
        }
        center={<h2 className="text-2xl font-bold">Users</h2>}
        start={
          <div className="flex items-center gap-4">
            <span>Total Visitors: {totalVisitor}</span>
          </div>
        }
      ></TableHeader>
      <DataTable value={visitors} size="medium" stripedRows>
        {columns.map((col, index) => {
          if (col.field === "waring") {
            return <Column key={index} body={WarringField} header="Warring" />;
          }
          return <Column key={index} field={col.field} header={col.header} />;
        })}
        <Column body={ActionsFields} header="Actions" />
      </DataTable>
      <Paginator
        first={query.page}
        rows={query.limit}
        totalRecords={totalVisitor}
        rowsPerPageOptions={[1, 10, 20, 30]}
        onPageChange={(e) =>{
          setQuery((prev) => ({
            ...prev,
            page: e.page,
            limit: e.rows,
          }))}
        }
      />
    </section>
  );
};

export default VisitorsTable;
