import { IFormValuesCollection } from "@/views/Admin/Create/ContainerCollectionForm";
import Image from "next/image";
import { BaseSyntheticEvent, useState } from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import { v4 } from "uuid";

interface Props {
  data: IFormValuesCollection;
}

const ItemsAccordian = ({ data: { nfts } }: Props) => {
  const [open, setOpen] = useState<boolean>(false);

  const handleChange = (e: BaseSyntheticEvent) => {
    e.preventDefault();
    setOpen(!open);
  };

  return (
    <div className="w-full flex flex-col gap-4">
      <button
        className="flex w-full justify-between text-xl  items-center p-2 hover:bg-white hover:bg-opacity-5 rounded-sm"
        onClick={handleChange}
      >
        <div className="font-medium">{!open ? "Show Items" : "Hide Items"}</div>
        <div className="">{!open ? <FiChevronDown /> : <FiChevronUp />}</div>
      </button>
      {open && (
        <div className="flex flex-col gap-4">
          {nfts.map((nft) => (
            <div
              className="w-full bg-white bg-opacity-[2%] p-4 flex gap-4 rounded-md h-full"
              key={v4()}
            >
              <div className="h-28 w-28 flex-shrink-0 bg-black rounded-md overflow-hidden relative">
                <Image
                  src={URL.createObjectURL(nft.image as Blob)}
                  blurDataURL={URL.createObjectURL(nft.image as Blob)}
                  objectFit="cover"
                  placeholder="blur"
                  layout="fill"
                />
              </div>

              <div className="flex gap-2 justify-between w-full">
                <div className="flex flex-col text-left gap-2 justify-between">
                  <div className="gap-2">
                    <div className="text-xl">{nft.title}</div>
                    <div className="text-left text-sm">
                      {String(nft.description).substring(0, 50)}
                    </div>
                  </div>

                  <div className="text-sm text-gray-400">
                    {nft.numberOfTokens} Editions
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ItemsAccordian;
