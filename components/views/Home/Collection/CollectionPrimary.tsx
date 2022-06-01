import Container from "@/modules/Container/Container";
import H2 from "@/modules/Heading/H2";
import { DataContext } from "context/DataWrapper";
import { motion, useTransform, useViewportScroll } from "framer-motion";
import useElementOffset from "hooks/useElementOffset";
import { RefObject, useContext, useEffect, useRef, useState } from "react";
import { getNFTDetails, getSaleDateTime } from "utils/web3Utils";
import CountdownCollection from "./CountdownCollection/CountdownCollection";
import ItemCollection from "./ItemCollection";

interface Props {}

const CollectionPrimary = (props: Props) => {
  const { data } = useContext(DataContext);
  const [soldOut, setSoldOut] = useState<boolean | null>(null);
  const [saleDateTime, setSaleDateTime] = useState<any>(null);
  const ref: RefObject<HTMLDivElement> = useRef(null);

  useEffect(() => {
    (async () => {
      if (data?.nfts)
        setSoldOut(
          await (
            await Promise.all(data.nfts.map((nft) => getNFTDetails(nft.title)))
          ).every(
            ({ initialToken, finalToken, tokensMinted }) =>
              !(finalToken - initialToken + tokensMinted + 1)
          )
        );
    })();
  }, [data?.nfts]);

  useEffect(() => {
    (async () => {
      setSaleDateTime(new Date((await getSaleDateTime()) * 1000));
    })();
  }, [data?.nfts]);

  if (!data) return null;

  const nfts = data?.nfts.sort((a, b) => {
    return +new Date(a.created_at) - +new Date(b.created_at);
  });

  return (
    <motion.div className="bg-collectionBg" id="collection" ref={ref}>
      <Container>
        <motion.div className="flex  flex-col  py-10 md:py-16  lg:py-20 gap-16 md:gap-12 lg:gap-16 justify-center items-center text-white">
          <H2>Collection: GENESIS I</H2>

          {saleDateTime && <CountdownCollection saleDateTime={saleDateTime} />}
          <motion.div className="grid w-full grid-cols-1 md:grid-cols-2 lg:grid-cols-3  grid-flow-row lg:gap-4 gap-6 max-w-sm   md:max-w-7xl bg-background">
            {nfts.map((nft, index) => (
              <ItemCollection
                key={nft.id}
                nft={nft}
                index={index}
                saleDateTime={saleDateTime}
              />
            ))}
          </motion.div>
          {soldOut && (
            <button className="btn-contained text-xl  px-6 py-3 w-max bg-gradient-to-r transition-all duration-350 ease-in-out from-primaryLight to-primaryDark rounded-sm hover:ring-2 ring-purple-500 ring-offset-4 ring-offset-collectionBg">
              View on OpenSea
            </button>
          )}
        </motion.div>
      </Container>
    </motion.div>
  );
};

export default CollectionPrimary;
