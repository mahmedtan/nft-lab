import Image from "next/image";
import { useEffect, useState } from "react";
import { supabase } from "utils/supabaseClient";

const ItemNFTAdmin = ({ image, title, price }: any) => {
  return (
    <div className="w-full  mx-auto  max-w-[17rem]  rounded-lg border-primaryLight border bg-foreground flex flex-col items-center p-3 gap-3">
      <div className="relative w-full h-56 rounded-lg overflow-hidden">
        <Image
          src={image}
          layout="fill"
          objectFit="cover"
          placeholder="blur"
          blurDataURL={image}
        />
      </div>
      <div className="flex  gap-1 justify-between w-full text-center">
        <h4 className="text-xl text-gray-100 ">{title}</h4>
        <h5 className="text-xl text-primaryLight">{price} ETH</h5>
      </div>
    </div>
  );
};

export default ItemNFTAdmin;
