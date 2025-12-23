import { useData } from "../services/useData";
import { createContext } from "react";

export const DataContext = createContext();

export default function DataProvider({ children }) {
  const data = useData();
  return <DataContext.Provider value={data}> {children} </DataContext.Provider>;
}
