import ItemNFTAdmin from "./ItemNFTAdmin";

import { v4 } from "uuid";

const NFTsAdmin = ({ data }: any) => {
  return (
    <div className="grid w-full  grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4  grid-flow-row gap-6  sm:gap-8 md:gap-8 ">
      {data.nfts.map((nft: any) => (
        <ItemNFTAdmin {...nft} key={v4()} />
      ))}
    </div>
  );
};

export default NFTsAdmin;
