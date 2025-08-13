import { Tag } from "primereact/tag";

/**
 * Componente para exibir os detalhes de uma única visita.
 * @param {{ visit: object }} props - As propriedades do componente.
 * @param {object} props.visit - O objeto contendo os dados da visita.
 * @param {string} props.visit.subject - O assunto ou motivo da visita.
 * @param {string} props.visit.timestamp - A data e hora da visita (formato ISO string).
 * @param {string} props.visit.status - O status da visita (ex: 'Concluída', 'Agendada', 'Em Andamento').
 * @param {object} props.visit.visitor - O objeto com os dados do visitante.
 * @param {string} props.visit.visitor.name - O nome do visitante.
 * @param {object} props.visit.registeredBy - O objeto com os dados de quem registrou.
 * @param {string} props.visit.registeredBy.name - O nome de quem registrou.
 */
const VisitInfoCard = ({ visit }) => {
  // Função auxiliar para definir a cor da Tag de status
  const getStatusSeverity = (status) => {
    switch (status?.toLowerCase()) {
      case "concluída":
        return "success";
      case "em andamento":
        return "warning";
      case "agendada":
        return "info";
      case "cancelada":
        return "danger";
      default:
        return "secondary";
    }
  };

  // Formata a data para um padrão legível
  const formattedDate = new Date(visit.timestamp).toLocaleString("pt-BR", {
    dateStyle: "full",
    timeStyle: "short",
  });

  return (
    <div className="bg-white p-4 rounded-lg shadow-md border border-content flex flex-col gap-3">
      {/* Seção do Assunto e Status */}
      <header className="flex justify-between items-start pb-2 border-b border-content">
        <div>
          <h3 className="text-lg font-bold text-font-primary">
            {visit.subject}
          </h3>
          <p className="text-sm text-font-primary">
            Visitante:{" "}
            <span className="font-semibold">{visit.visitor.name}</span>
          </p>
        </div>
        <Tag value={visit.status} severity={getStatusSeverity(visit.status)} />
      </header>

      {/* Seção de Detalhes */}
      <div className="flex flex-col gap-2 text-sm">
        <div className="flex justify-between">
          <span className="text-font-primary">Registrado por:</span>
          <span className="font-medium text-font-primary">
            {visit.registeredBy.name}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-font-primary">Horário:</span>
          <span className="font-medium text-font-primary">{formattedDate}</span>
        </div>
      </div>
    </div>
  );
};

export default VisitInfoCard;
