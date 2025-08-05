import { useState } from "react";
import { LoadingContext } from "./LoadingContext"

export const LoadingProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);

  const attLoading = (value)=>{
    setLoading(value)
  }

  return (
    <LoadingContext.Provider value={{ loading, attLoading }}>
      {children}
    </LoadingContext.Provider>
  );
};
