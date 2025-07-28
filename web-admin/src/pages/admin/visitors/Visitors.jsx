import VisitorsTable from "./table/VisitorsTable";

import VisitorsModal from "./modal/VisitorsModal";
import VisitorsDeleteModal from "./modal/VisitorsDeleteModal";

import { VisitorProvider } from "@Context/visitors/VisitorsProvider";
import { useState } from "react";

const Visitors = () => {
  // VisitorsModal
  const [isEditVisible, setIsEditVisible] = useState(false);
  const [isExcludeVisible, setIsExcludeVisible] = useState(false);
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
      <VisitorsTable
        setEditIsVisible={setIsEditVisible}
        setExcludeIsVisible={setIsExcludeVisible}
      />
    </VisitorProvider>
  );
};

export default Visitors;
