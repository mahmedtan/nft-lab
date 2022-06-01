import Container from "@/modules/Container/Container";
import Layout from "@/modules/Layout/Layout";
import { PostgrestResponse } from "@supabase/supabase-js";
import clsx from "clsx";
import { AddressContext } from "context/AddressWrapper";
import { WalletInfoContext } from "context/WalletInfoWrapper";
import { GetStaticPaths, GetStaticProps } from "next";
import Image from "next/image";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { BsChevronLeft } from "react-icons/bs";
import { supabase } from "utils/supabaseClient";
import { NFT, WalletResponse } from "utils/types";
import { getNFTDetails, mintNFT, web3 } from "utils/web3Utils";

const ItemPage = ({ nft }: { nft: NFT }) => {
  const { address } = useContext(AddressContext);
  const [price, setPrice] = useState<number | null>(null);
  const { setWalletInfo } = useContext(WalletInfoContext);
  const [txProcessing, setTxProcessing] = useState(false);
  const [soldOut, setSoldOut] = useState<boolean | undefined>(undefined);
  const [transactionInfo, setTransactionInfo] = useState<
    (WalletResponse & { rawMessage?: string }) | null
  >(null);

  const handleMintNFT = async () => {
    if (address) {
      const { rawMessage, ...response } = await mintNFT(nft, price!);
      setWalletInfo(response);
      setTransactionInfo({ rawMessage, ...response });
    } else
      setWalletInfo({
        status: "info",
        message: "Please connect to MetaMask",
        address: "",
      });
  };

  useEffect(() => {
    (async () => {
      const { finalToken, initialToken, tokensMinted, price }: any =
        await getNFTDetails(nft.title);
      setSoldOut(!(finalToken - (tokensMinted + initialToken) + 1));
      setPrice(+web3.utils.fromWei(price));
    })();
  }, [nft, txProcessing]);

  return (
    <Layout>
      <Container>
        <div className="pb-10 md:pb-16 lg:pb-18 pt-4 md:pt-6 lg:pt-8 flex flex-col gap-4">
          <Link href="/">
            <a className="w-max">
              <button className="text-2xl flex items-center gap-2 hover:bg-foreground  p-2 rounded-md">
                <BsChevronLeft className="text-primaryLight" /> Go Back
              </button>
            </a>
          </Link>
          <div className="items-center lg:items-start   w-full  gap-8 md:gap-12 lg:gap-16 flex lg:flex-row flex-col">
            <div className="w-72 h-72 md:w-80 md:h-80 lg:h-96 lg:w-96 xl:h-[30rem] xl:w-[30rem] border border-primaryLight  relative ">
              <Image
                layout="fill"
                placeholder="blur"
                blurDataURL={nft.image}
                objectFit="cover"
                src={nft.image}
              />
            </div>

            <div className="flex flex-col flex-grow   items-start  gap-4 sm:gap-8  w-72  md:w-80  lg:w-96 xl:min-h-[30rem] xl:w-[30rem] ">
              <h1 className="font-semibold  text-4xl md:text-5xl   lg:text-left">
                {nft.title}
              </h1>
              <div className="text-xl text-justify   lg:text-left whitespace-pre-line ">
                {nft.description}
              </div>

              <div className="flex gap-3 font-medium text-lg">
                {nft.attributes.map((attr, index) => (
                  <div
                    className="p-2 bg-gradient-to-br ring-2 ring-primaryDark from-primaryLight to-primaryDark rounded-xl items-center justify-center flex min-w-[4rem]"
                    key={index}
                  >
                    {attr.display_type === "date"
                      ? new Date(attr.value).toLocaleDateString()
                      : attr.display_type === "boost_percentage"
                      ? `${attr.value}%`
                      : attr.display_type === "boost_number"
                      ? `${attr.value}⬆️`
                      : attr.value}
                  </div>
                ))}
              </div>

              <div className="flex lg:flex-col gap-8 justify-between   w-full ">
                {
                  <div
                    className={clsx(
                      "flex flex-col",
                      price ? "visible" : "invisible"
                    )}
                  >
                    <div className="uppercase text-gray-300">Starting from</div>
                    <div className="text-3xl font-medium">{price} ETH</div>
                  </div>
                }

                <button
                  className="btn-contained text-xl  px-8 py-3 w-max bg-gradient-to-r transition-all duration-350 ease-in-out from-primaryLight to-primaryDark rounded-sm hover:ring-2 ring-purple-500 ring-offset-4 ring-offset-background disabled:cursor-not-allowed disabled:hover:ring-0 disabled:opacity-70"
                  disabled={txProcessing || !price}
                  onClick={async () => {
                    if (!txProcessing) {
                      setTxProcessing(true);
                      await handleMintNFT();
                      setTxProcessing(false);
                    }
                  }}
                >
                  {soldOut ? "Sold Out" : txProcessing ? "Processing" : "Mint"}
                </button>
              </div>

              {transactionInfo && (
                <div
                  className={clsx(
                    "text-lg",
                    transactionInfo.status === "info"
                      ? "text-white"
                      : "text-red-400"
                  )}
                >
                  {transactionInfo.status === "info" ? (
                    <div className="text-xl">
                      Check out your transaction on Etherscan:{"  "}
                      <a
                        className="font-semibold hover:underline cursor-pointer"
                        href={`https://ropsten.etherscan.io/tx/${transactionInfo.rawMessage}`}
                        target={"_blank"}
                      >
                        {transactionInfo.rawMessage?.substring(0, 5)}...
                        {transactionInfo.rawMessage?.substring(
                          transactionInfo.rawMessage.length - 5
                        )}
                      </a>
                    </div>
                  ) : (
                    transactionInfo.rawMessage
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </Container>
    </Layout>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const nftResponse: PostgrestResponse<any> = await supabase
    .from("nft")
    .select("*");

  return {
    fallback: "blocking",
    paths: nftResponse?.data?.map((nft) => ({ params: { id: nft.id } })) || [],
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const nftResponse: PostgrestResponse<any> = await supabase
    .from("nft")
    .select("*")
    .eq("id", params?.id);

  if (!nftResponse.data?.[0] || nftResponse.error) return { notFound: true };

  return {
    props: { nft: nftResponse.data[0] },
    revalidate: 10,
  };
};

export default ItemPage;
