import { logoPrimaryUrl } from "content/logo";
import { AddressContext } from "context/AddressWrapper";
import Image from "next/image";
import Link from "next/link";
import { useContext } from "react";
import { WalletResponse } from "utils/types";
import { connectWallet } from "utils/web3Utils";
import StatusDot from "../StatusDot/StatusDot";
import Snackbar from "./Snackbar";

interface Props {
  setWalletInfo: (walletInfo: WalletResponse) => void;
}

const Header = ({ setWalletInfo }: Props) => {
  const menuItems = [
    {
      title: "About",
      href: "/#about",
    },
    {
      title: "Collection",
      href: "/#collection",
    },
    {
      title: "Roadmap",
      href: "/#roadmap",
    },
    {
      title: "FAQ",
      href: "/#faq",
    },
    {
      title: "Team",
      href: "/#team",
    },
  ];

  const { address, setAddress } = useContext(AddressContext);

  const handleConnectWallet = async () => {
    const response = await connectWallet();
    if (response.status === "success") {
      setAddress(response.address!);
    }
    setWalletInfo(response);
  };

  return (
    <div className="sticky top-0 left-0 z-50 header ">
      <nav className="container mx-auto py-4 px-8 xl:px-12 flex  justify-between items-center ">
        <Link href="/">
          <a>
            <div className="relative w-44 h-12 ">
              <Image src={logoPrimaryUrl} layout="fill" objectFit="contain" />
            </div>
          </a>
        </Link>

        <div className="hidden lg:flex gap-8 lg:gap-12 items-center text-lg  ">
          {menuItems.map((item) => (
            <Link key={item.href} href={item.href}>
              <a className="font-normal ">{item.title}</a>
            </Link>
          ))}
        </div>
        {address === null ? (
          <button className="btn-large btn-outlined hidden lg:block opacity-0">
            Connect Wallet
          </button>
        ) : !address ? (
          <button
            className="btn-large btn-outlined hidden lg:block"
            onClick={handleConnectWallet}
          >
            Connect Wallet
          </button>
        ) : (
          <div className="text-xl  items-center gap-3 hidden lg:flex">
            Connected
            <StatusDot status="success" />
          </div>
        )}
        <div className="lg:hidden">
          <Snackbar
            address={address}
            menuItems={menuItems}
            handleConnectWallet={handleConnectWallet}
          />
        </div>
      </nav>
    </div>
  );
};

export default Header;
