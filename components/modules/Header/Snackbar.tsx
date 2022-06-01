import Link from "next/link";
import { useState } from "react";

import { FiMenu, FiX } from "react-icons/fi";
import { isMobileDevice } from "utils/functions";
import StatusDot from "../StatusDot/StatusDot";
interface Props {
  menuItems: Array<MenuItem>;
  handleConnectWallet: () => void;
  address: string | null;
}

interface MenuItem {
  title: string;
  href: string;
}

const Snackbar = ({ menuItems, handleConnectWallet, address }: Props) => {
  const [open, setOpen] = useState(false);

  const handleChange = () => {
    setOpen(!open);
  };

  return (
    <div>
      {open ? (
        <div>
          <div
            className="absolute top-0 left-0 w-full h-full  z-10"
            onClick={handleChange}
          ></div>
          <div className="absolute top-0 left-0 p-8  bg-background z-50 shadow-lg w-full  flex flex-col gap-8 lg:gap-12 items-center text-xl text-white">
            <FiX
              className="self-end absolute top-6 right-7.5 sm:top-8 sm:right-8  cursor-pointer"
              onClick={handleChange}
            />
            {menuItems.map((item) => (
              <Link key={item.href} href={item.href}>
                <a onClick={handleChange}>{item.title}</a>
              </Link>
            ))}
            {address === null ? (
              <button className="btn-large btn-outlined opacity-0">
                Connect Wallet
              </button>
            ) : !address ? (
              isMobileDevice() ? (
                <a href={`https://metamask.app.link/dapp/nft-lab.vercel.app`}>
                  <button className="btn-large btn-outlined">
                    Connect Wallet
                  </button>
                </a>
              ) : (
                <button
                  className="btn-large btn-outlined"
                  onClick={handleConnectWallet}
                >
                  Connect Wallet
                </button>
              )
            ) : (
              <div className="text-xl  items-center gap-3 flex">
                Connected
                <StatusDot status="success" />
              </div>
            )}
          </div>
        </div>
      ) : (
        <FiMenu
          className="text-xl cursor-pointer"
          onClick={() => setOpen(!open)}
        />
      )}
    </div>
  );
};

export default Snackbar;
