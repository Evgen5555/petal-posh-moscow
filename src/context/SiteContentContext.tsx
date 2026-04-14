import React, { createContext, useContext } from "react";
import { useSiteContent } from "@/hooks/useSiteContent";

interface SiteContentContextType {
  get: (key: string) => string;
  loading: boolean;
}

const SiteContentContext = createContext<SiteContentContextType>({
  get: () => "",
  loading: true,
});

export const useSiteContentContext = () => useContext(SiteContentContext);

export const SiteContentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { get, loading } = useSiteContent();
  return (
    <SiteContentContext.Provider value={{ get, loading }}>
      {children}
    </SiteContentContext.Provider>
  );
};
