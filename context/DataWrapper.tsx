import { createContext, ReactNode, useState } from "react";
import { Data } from "utils/types";

export const DataContext = createContext<{
  data: Data | null;
  setData: (data: Data) => void;
}>({ data: null, setData: () => {} });

interface Props {
  children: ReactNode;
}

const DataWrapper = ({ children }: Props) => {
  const [data, setData] = useState<Data | null>(null);

  return (
    <DataContext.Provider value={{ data: data, setData: setData }}>
      {children}
    </DataContext.Provider>
  );
};

export default DataWrapper;
