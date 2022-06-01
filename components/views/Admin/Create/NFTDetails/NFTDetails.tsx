import MediaUpload from "@/modules/MediaUpload/MediaUpload";
import { BaseSyntheticEvent } from "react";
import { UseFormStateReturn } from "react-hook-form";
import { FiTrash } from "react-icons/fi";
import { IFormValuesCollection } from "../ContainerCollectionForm";
import FieldsNFT from "./FieldsNFT";

const NFTDetails = (props: any) => {
  const formState =
    props.formState as UseFormStateReturn<IFormValuesCollection>;
  const index = props.index;

  const nftErrors = Object.values(formState.errors.nfts?.[index] || {}).reduce(
    (prev, curr, i) =>
      Array.isArray(curr)
        ? prev
        : {
            ...prev,
            [Object.keys(formState.errors.nfts?.[index] || {})[i]]:
              curr.message,
          },
    {
      title: "",
      creator: "",
      price: "",
      description: "",
      numberOfTokens: "",
      image: "",
    }
  );

  return (
    <div className="w-full  flex flex-col gap-12 p-8 border rounded-md border-dashed border-primaryLight bg-foreground">
      <div className="flex justify-between items-start">
        <div className="flex flex-col gap-2">
          <h2 className="text-3xl font-medium">NFT # {props.index + 1}</h2>
          <h2 className="text-lg font-normal">Add attributes to your NFT</h2>
        </div>

        {props.index !== 0 && (
          <button
            onClick={(e: BaseSyntheticEvent) => {
              e.preventDefault();
              props.handleRemoveNFT(props.index);
            }}
          >
            <FiTrash className="text-4xl hover:bg-gray-100 hover:bg-opacity-10 p-2 rounded-full" />
          </button>
        )}
      </div>

      <div className="grid grid-cols-2 gap-16">
        <FieldsNFT {...props} />
        <MediaUpload
          name={`nfts[${props.index}.image]`}
          label="NFT Media"
          error={nftErrors.image}
          {...props}
        />
      </div>
    </div>
  );
};

export default NFTDetails;
