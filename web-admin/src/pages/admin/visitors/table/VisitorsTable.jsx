import { useEffect, useState } from "react";

import { DataView } from "primereact/dataview";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Paginator } from "primereact/paginator";
import { Image } from 'primereact/image';
import { Tag } from "primereact/tag";

import { useToast } from "@Context/toast/ToastContext";
import { useVisitors } from "@Context/visitors/VisitorsContext";

import TableHeader from "@/components/table/TableHeader";
import { getVisitor } from "@Service/Visitor";
const VisitorsView = ({ setEditIsVisible, setExcludeIsVisible }) => {
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
      showToast("error", "Erro", error.response?.data?.message || "Erro geral");
    }
  };

  useEffect(() => {
    fetchData();
  }, [query]);

  const itemTemplate = (data) => {
    const toEdit = () => {
      setVisitorTarget(data);
      setEditIsVisible(true);
    };

    const toExclude = () => {
      setVisitorTarget(data);
      setExcludeIsVisible(true);
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
      <div className="flex items-center p-4 border border-gray-200 rounded-lg shadow-sm gap-4">
        <Image
          src={data.photo ? `${data.photo}` : "/placeholder.png"}
          alt="visitor"
          className="w-20 max-h-24 rounded-md object-cover overflow-hidden"
          preview
        />
        <div className="flex-1">
          <h4 className="font-semibold text-lg">{data.name} <span className="ml-3">{WarringField(data)}</span></h4>
          <p className="text-sm text-gray-600">{data.email}</p>
          <p className="text-sm text-gray-600">{data.phone}</p>
          <p className="text-xs text-gray-400">
            Criado em: {new Date(data.createdAt).toLocaleDateString("pt-BR")}
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            icon="pi pi-pencil"
            className="p-button-rounded p-button-text"
            onClick={toEdit}
          />
          <Button
            icon="pi pi-trash"
            className="p-button-rounded p-button-text p-button-danger"
            onClick={toExclude}
          />
        </div>
      </div>
    );
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
              label="Novo visitante"
              icon="pi pi-user-plus"
              className="btn-primary"
              onClick={() => setEditIsVisible(true)}
            />
          </div>
        }
        center={<h2 className="text-2xl font-bold">Visitantes</h2>}
        start={
          <div className="flex items-center gap-4">
            <span>Total de Visitantes: {totalVisitor}</span>
          </div>
        }
      />

      <DataView
        value={visitors}
        itemTemplate={itemTemplate}
        layout="list"
        paginator={false}
      />

      <Paginator
        first={query.page}
        rows={query.limit}
        totalRecords={totalVisitor}
        rowsPerPageOptions={[10, 20, 30]}
        onPageChange={(e) =>
          setQuery((prev) => ({
            ...prev,
            page: e.page,
            limit: e.rows,
          }))
        }
      />
    </section>
  );
};

export default VisitorsView;
