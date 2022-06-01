import { createContext, ReactNode, useState } from "react";
import { HashObject } from "utils/types";

export const HashContext = createContext<{
  hash: HashObject | null;
  setHash: (hash: HashObject) => void;
}>({ hash: null, setHash: () => {} });

interface Props {
  children: ReactNode;
}

const HashWrapper = ({ children }: Props) => {
  const [hash, setHash] = useState<HashObject | null>(null);

  return (
    <HashContext.Provider value={{ hash, setHash }}>
      {children}
    </HashContext.Provider>
  );
};

export default HashWrapper;
