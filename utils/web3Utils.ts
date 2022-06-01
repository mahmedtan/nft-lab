import { NFT, WalletResponse } from "./types";
declare let window: any;

import { createAlchemyWeb3 } from "@alch/alchemy-web3";

//update this according to the new contract ABI
import Contract from "../web3/artifacts/contracts/Collection.sol/Collection.json";

export const web3 = createAlchemyWeb3(process.env.NEXT_PUBLIC_ALCHEMY_API_URL!);

export const getCurrentWalletConnected = async (): Promise<WalletResponse> => {
  if (window.ethereum) {
    try {
      const addresses = await window.ethereum.request({
        method: "eth_accounts",
      });
      if (addresses.length) {
        return {
          status: "success",
          message: "Connected",
          address: addresses[0] as string,
        };
      } else
        return {
          status: "info",
          message: "Please connect to metamask",
          address: "",
        };
    } catch (error: any) {
      return {
        address: "",
        status: "failure",
        message: error.message as string,
      };
    }
  } else
    return {
      status: "failure",
      address: "",
      message: "Wallet not installed",
    };
};

export const connectWallet = async (): Promise<WalletResponse> => {
  if (window.ethereum) {
    try {
      const addresses = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      return {
        status: "success",
        message: "Connected",
        address: addresses[0] as string,
      };
    } catch (error: any) {
      return {
        address: "",
        status: "failure",
        message: error.message as string,
      };
    }
  } else
    return {
      status: "failure",
      address: "",
      message: "Wallet not installed",
    };
};

const contract = new web3.eth.Contract(
  Contract.abi as any,
  process.env.NEXT_PUBLIC_CONTRACT_ADDRESS
);

export const getNFTDetails = async (title: string) => {
  return await contract.methods.NFTs(title).call();
};

export const getSaleDateTime = async () => {
  return await contract.methods.saleDateTime().call();
};

export const mintNFT = async (
  nft: NFT,
  price: number
): Promise<WalletResponse & { rawMessage?: string }> => {
  window.contract = new web3.eth.Contract(
    Contract.abi as any,
    process.env.NEXT_PUBLIC_CONTRACT_ADDRESS
  );

  try {
    const transactionParameters = {
      to: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS, // Required except during contract publications.
      from: window.ethereum.selectedAddress, // must match user's active address.
      data: window.contract.methods
        .safeMint(window.ethereum.selectedAddress, nft.title)
        .encodeABI(),
      value: web3.utils.toHex(web3.utils.toWei(price.toString())), //make call to NFT smart contract
    };

    const txHash = await window.ethereum.request({
      method: "eth_sendTransaction",
      params: [transactionParameters],
    });

    return {
      status: "info",
      message: `Transaction Successful`,
      rawMessage: txHash,
    };
  } catch (error: any) {
    return {
      status: "failure",
      message: "Transaction Failed",
      rawMessage: error?.response?.data?.message || error.message,
    };
  }
};
