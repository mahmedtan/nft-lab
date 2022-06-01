import { AddressContext } from "context/AddressWrapper";
import { WalletInfoContext } from "context/WalletInfoWrapper";
import { ReactNode, useContext, useEffect, useState } from "react";
import { WalletResponse } from "utils/types";
import { getCurrentWalletConnected } from "utils/web3Utils";
import Footer from "../Footer";
import Header from "../Header";
import Toast from "../Toast";
declare let window: any;

interface Props {
  children: ReactNode;
}

const Layout = ({ children }: Props) => {
  const { setAddress } = useContext(AddressContext);
  const { walletInfo, setWalletInfo } = useContext(WalletInfoContext);

  useEffect(() => {
    (async () => {
      const response = await getCurrentWalletConnected();
      setAddress(response.address || "");
    })();
  }, []);

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", (accounts: any[]) => {
        if (accounts.length) {
          {
            setAddress(accounts[0]);
            setWalletInfo({
              address: accounts[0],
              status: "info",
              message: "Account Changed",
            });
          }
        } else {
          setAddress("");
          setWalletInfo({
            status: "failure",
            message: "Disconnected",
            address: "",
          });
        }
      });
    } else {
      setAddress("");
      setWalletInfo({
        status: "failure",
        address: "",
        message: "Wallet not installed",
      });
    }
  }, []);

  useEffect(() => {
    if (walletInfo)
      setTimeout(() => {
        setWalletInfo(null);
      }, 5000);
  }, [walletInfo]);

  return (
    <div className="bg-background min-h-screen text-font">
      <div className="bg-background relative">
        <Header setWalletInfo={setWalletInfo} />
        <div className=" fixed bottom-0 right-0 z-50 p-4 sm:p-8">
          {walletInfo && (
            <Toast message={walletInfo?.message} status={walletInfo?.status} />
          )}
        </div>
        {children}
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
