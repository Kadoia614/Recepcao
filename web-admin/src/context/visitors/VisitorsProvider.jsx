import { useState } from "react";
import { VisitorsContext } from "./VisitorsContext"

export const VisitorProvider = ({ children }) => {
  const [visitors, setVisitors] = useState([]);
  const [totalVisitor, setTotalVisitor] = useState(0);
  const [visitorTarget, setVisitorTarget] = useState(null);

  const addVisitors = (newVisitor) => {
    setVisitors((prevVisitor) => [...prevVisitor, newVisitor]);
    setTotalVisitor(e => e + 1);
  };

  const removeVisitor = (visitorId) => {
    // Filter out the user with the specified ID
    setVisitors((prevVisitor) => 
      prevVisitor.filter(visitor => visitor.uuid != visitorId));

    setTotalVisitor(e => e - 1);
  };

  const updateVisitor = (updatedVisitor) => {
    setVisitors((prevVisitor) =>
      prevVisitor.map(visitor => visitor.uuid === updatedVisitor.uuid ? updatedVisitor : visitor)
    );
  };

  return (
    <VisitorsContext.Provider value={{ visitors, setVisitors, addVisitors, removeVisitor, updateVisitor, totalVisitor, setTotalVisitor, visitorTarget, setVisitorTarget }}>
      {children}
    </VisitorsContext.Provider>
  );
};
