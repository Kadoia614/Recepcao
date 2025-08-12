import VisitorsTable from "./table/VisitorsTable";

import VisitorsModal from "./modal/VisitorsModal";
import VisitorsDeleteModal from "./modal/VisitorsDeleteModal";

import { VisitorProvider } from "@Context/visitors/VisitorsProvider";
import { useState } from "react";

import VisitorDetailsModal from "./modal/VisitsDetailsModal";

const Visitors = () => {
  // VisitorsModal
  const [isEditVisible, setIsEditVisible] = useState(false);
  const [isExcludeVisible, setIsExcludeVisible] = useState(false);

  // 2. Crie o estado para o novo modal de detalhes
  const [isDetailsVisible, setIsDetailsVisible] = useState(false);

  return (
    <VisitorProvider>
      <VisitorsModal
        visible={isEditVisible}
        onHide={() => setIsEditVisible(false)}
      />
      <VisitorsDeleteModal
        visible={isExcludeVisible}
        onHide={() => setIsExcludeVisible(false)}
      />

      {/* 4. Renderize o novo modal */}
      <VisitorDetailsModal
        visible={isDetailsVisible}
        setVisible={setIsDetailsVisible}
      />

      <VisitorsTable
        setEditIsVisible={setIsEditVisible}
        setExcludeIsVisible={setIsExcludeVisible}
        // 5. Passe o controle do modal para a tabela
        setDetailsIsVisible={setIsDetailsVisible}
      />
    </VisitorProvider>
  );
};

export default Visitors;
