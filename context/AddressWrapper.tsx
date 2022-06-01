import { createContext, ReactNode, useState } from "react";

export const AddressContext = createContext<{
  address: string | null;
  setAddress: (address: string) => void;
}>({ address: null, setAddress: () => {} });

interface Props {
  children: ReactNode;
}

const AddressWrapper = ({ children }: Props) => {
  const [address, setAddress] = useState<string | null>(null);

  return (
    <AddressContext.Provider value={{ address, setAddress }}>
      {children}
    </AddressContext.Provider>
  );
};

export default AddressWrapper;
