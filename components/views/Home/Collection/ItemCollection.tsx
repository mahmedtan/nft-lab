import clsx from "clsx";
import { isAfter, isBefore } from "date-fns";
import { motion, MotionValue } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Data, NFT } from "utils/types";
import { getNFTDetails, web3 } from "utils/web3Utils";

interface Props {
  saleDateTime: Date;
  nft: NFT;
  index: number;
}

const ItemCollection = ({ nft, saleDateTime, index }: Props) => {
  const saleTimeReached = true || isBefore(new Date(saleDateTime), new Date());

  const [nftDetails, setNftDetails] = useState<any | null>(null);

  useEffect(() => {
    (async () => {
      setNftDetails(await getNFTDetails(nft.title));
    })();
  }, []);

  return (
    <Link href={`/${nft.id}`}>
      <a className={clsx("hover:z-30", index === 1 ? "z-20 " : "z-10")}>
        <motion.div
          className="group flex-col overflow-hidden hidden lg:flex rounded-2xl gap-2  shadow-2xl shadow-black hover:shadow-foregroundLight p-2 bg-[#1c1425] transition-all duration-300 border-4 border-transparent   hover:border-[#362747]"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.05 }}
          initial={{
            x: index === 0 ? 400 : index == 2 ? -400 : 0,
          }}
          whileInView={{
            x: 0,

            transition: {
              duration: 1,
              ease: "easeIn",
            },
          }}
          viewport={{ once: true }}
        >
          <div className="w-full aspect-square max-w-sm md:max-w-md relative cursor-pointer mx-auto  ">
            <Image
              src={nft.image}
              layout="fill"
              placeholder="empty"
              objectFit="contain"
              className="scale-[1.2]"
            />
          </div>

          <div className="w-full h-full flex flex-col items-center p-4 text-3xl justify-center gap-2">
            <div className="text-3xl font-normal"> {nft.title}</div>
            {nftDetails && (
              <div className="font-light text-lg">
                Starting from {+web3.utils.fromWei(nftDetails?.price)} ETH
              </div>
            )}
          </div>
        </motion.div>
        <motion.div
          className=" group flex-col overflow-hidden flex lg:hidden  rounded-2xl gap-2  shadow-2xl shadow-black hover:shadow-foregroundLight p-2 bg-[#1c1425] transition-all duration-300 border-4 border-transparent   hover:border-[#362747]"
          transition={{ duration: 0.5 }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ margin: "-150px", once: true }}
        >
          <div className="w-full aspect-square max-w-sm md:max-w-md relative cursor-pointer mx-auto">
            <Image
              src={nft.image}
              layout="fill"
              placeholder="empty"
              objectFit="contain"
              className="scale-[1.2]"
            />
          </div>

          <div className="w-full h-full flex flex-col items-center p-4 text-3xl justify-center gap-2">
            <div className="text-3xl font-normal"> {nft.title}</div>
            {nftDetails && (
              <div className="font-light text-lg">
                Starting from {+web3.utils.fromWei(nftDetails?.price)} ETH
              </div>
            )}
          </div>
        </motion.div>
      </a>
    </Link>
  );
};

export default ItemCollection;
