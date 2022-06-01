import { createContext, ReactNode, useState } from "react";
import { WalletResponse } from "utils/types";

export const WalletInfoContext = createContext<{
  walletInfo: WalletResponse | null;
  setWalletInfo: (walletInfo: WalletResponse | null) => void;
}>({ walletInfo: null, setWalletInfo: () => {} });

interface Props {
  children: ReactNode;
}

const WalletInfoWrapper = ({ children }: Props) => {
  const [walletInfo, setWalletInfo] = useState<WalletResponse | null>(null);

  return (
    <WalletInfoContext.Provider value={{ walletInfo, setWalletInfo }}>
      {children}
    </WalletInfoContext.Provider>
  );
};

export default WalletInfoWrapper;
