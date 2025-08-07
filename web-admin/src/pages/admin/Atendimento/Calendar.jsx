import { useEffect, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { Tag } from "primereact/tag";

// Simulação de dados
const mockVisitors = [
  { id: 1, name: "João Silva", cpf: "123.456.789-00", createdAt: "2024-07-24" },
  { id: 2, name: "Maria Souza", cpf: "987.654.321-00", createdAt: "2024-07-23" },
];

const waitingVisitors = [
  { id: 1, name: "João Silva", cpf: "123.456.789-00", arrival: "08:30" },
  { id: 2, name: "Maria Souza", cpf: "987.654.321-00", arrival: "08:45" },
];

const inAttendance = [
  { id: 3, name: "Carlos Lima", cpf: "111.222.333-44", attendant: "Ana Paula", start: "09:00" },
];

const loggedUsers = [
  { id: 1, name: "Ana Paula", role: "Recepcionista", status: "Disponível" },
  { id: 2, name: "Pedro Rocha", role: "Recepcionista", status: "Em atendimento" },
];

export default function VisitorManager() {
  const [visitors, setVisitors] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedVisitor, setSelectedVisitor] = useState(null);
  const [showDialog, setShowDialog] = useState(false);
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);

  // Simule fetch
  useEffect(() => {
    setVisitors(
      mockVisitors.filter(
        (v) =>
          v.name.toLowerCase().includes(search.toLowerCase()) ||
          v.cpf.includes(search)
      )
    );
  }, [search]);

  const handleEdit = (visitor) => {
    setSelectedVisitor(visitor);
    setShowDialog(true);
  };

  const handleDelete = (visitor) => {
    setVisitors((prev) => prev.filter((v) => v.id !== visitor.id));
  };

  const footer = (
    <div>
      <Button
        label="Salvar"
        icon="pi pi-check"
        onClick={() => setShowDialog(false)}
        className="p-button-success"
      />
      <Button
        label="Cancelar"
        icon="pi pi-times"
        onClick={() => setShowDialog(false)}
        className="p-button-text"
      />
    </div>
  );

  // Renderiza status do usuário
  const statusBody = (row) => (
    <Tag value={row.status} severity={row.status === "Disponível" ? "success" : "warning"} />
  );

  // Renderiza ações para visitantes aguardando
  const waitingActions = (row) => (
    <Button
      label="Chamar"
      icon="pi pi-user-plus"
      className="p-button-sm p-button-success"
      onClick={() => {/* lógica para chamar visitante */}}
    />
  );

  // Renderiza ações para visitantes em atendimento
  const inAttendanceActions = (row) => (
    <Button
      label="Finalizar"
      icon="pi pi-check"
      className="p-button-sm p-button-primary"
      onClick={() => {/* lógica para finalizar atendimento */}}
    />
  );

  return (
    <section>
      <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-4">
        <h2 className="text-2xl font-bold">Gerenciar Visitantes</h2>
        <div className="flex gap-2">
          <span className="p-input-icon-left">
            <i className="pi pi-search" />
            <InputText
              placeholder="Buscar por nome ou CPF"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </span>
          <Button
            label="Novo Visitante"
            icon="pi pi-user-plus"
            className="p-button-primary"
            onClick={() => {
              setSelectedVisitor(null);
              setShowDialog(true);
            }}
          />
        </div>
      </header>

      {/* Visitantes aguardando */}
      <div>
        <h3 className="text-xl font-semibold mb-2">Fila de Espera</h3>
        <DataTable value={waitingVisitors} emptyMessage="Nenhum visitante aguardando.">
          <Column field="name" header="Nome" />
          <Column field="cpf" header="CPF" />
          <Column field="arrival" header="Chegada" />
          <Column header="Ações" body={waitingActions} />
        </DataTable>
      </div>

      {/* Visitantes em atendimento */}
      <div>
        <h3 className="text-xl font-semibold mb-2">Em Atendimento</h3>
        <DataTable value={inAttendance} emptyMessage="Nenhum atendimento em andamento.">
          <Column field="name" header="Nome" />
          <Column field="cpf" header="CPF" />
          <Column field="attendant" header="Atendente" />
          <Column field="start" header="Início" />
          <Column header="Ações" body={inAttendanceActions} />
        </DataTable>
      </div>

      {/* Usuários logados */}
      <div>
        <h3 className="text-xl font-semibold mb-2">Recepcionistas Online</h3>
        <DataTable value={loggedUsers} emptyMessage="Nenhum usuário logado.">
          <Column field="name" header="Nome" />
          <Column field="role" header="Função" />
          <Column field="status" header="Status" body={statusBody} />
        </DataTable>
      </div>

      <Dialog
        header={selectedVisitor ? "Editar Visitante" : "Novo Visitante"}
        visible={showDialog}
        style={{ width: "400px" }}
        footer={footer}
        onHide={() => setShowDialog(false)}
        modal
      >
        {/* Formulário de visitante (exemplo simples) */}
        <div className="p-fluid">
          <div className="p-field">
            <label htmlFor="name">Nome</label>
            <InputText
              id="name"
              value={selectedVisitor?.name || ""}
              onChange={() => {}}
              disabled
            />
          </div>
          <div className="p-field">
            <label htmlFor="cpf">CPF</label>
            <InputText
              id="cpf"
              value={selectedVisitor?.cpf || ""}
              onChange={() => {}}
              disabled
            />
          </div>
        </div>
      </Dialog>
    </section>
  );
}
