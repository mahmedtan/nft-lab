import React from "react";
import { FieldError, UseFormStateReturn } from "react-hook-form";
import { BsPlus } from "react-icons/bs";
import { DisplayType } from "utils/types";
import { IFormValuesCollection } from "../../ContainerCollectionForm";
import AttributeNFT from "./AttributeNFT";

interface Props {
  register: any;
  handleAddNewAttribute: (index: number) => void;
  nftIndex: number;
  fields: IFormValuesCollection;
  formState: UseFormStateReturn<IFormValuesCollection>;
  handleRemoveAttribute: (attributeIndex: number, nftIndex: number) => void;
}

const AttributesNFT = ({
  register,
  handleAddNewAttribute,
  handleRemoveAttribute,
  fields,
  nftIndex,
  formState,
}: Props) => {
  const attributes = fields.nfts[nftIndex].attributes;

  return (
    <>
      <div className="flex flex-col gap-2 pt-2">
        <h2 className="text-2xl font-medium ">
          Metadata Atrributes <span className="opacity-60">(optional)</span>
        </h2>
        <h3>Add attributes to metadata</h3>
      </div>

      {attributes?.map((item, index) => (
        <AttributeNFT
          register={register}
          key={index}
          formState={formState}
          attributeIndex={index}
          handleRemoveAttribute={handleRemoveAttribute}
          nftIndex={nftIndex}
          displayType={item.displayType as DisplayType}
          maxValue={item.maxValue}
        />
      ))}

      <button
        className="text-primaryLight flex gap-1 text-lg items-center justify-start hover:bg-background p-2 w-max rounded-md font-medium"
        onClick={(e: React.MouseEvent<HTMLElement>) => {
          e.preventDefault();
          handleAddNewAttribute(nftIndex);
        }}
      >
        <BsPlus className="text-2xl" />{" "}
        {!attributes?.length ? "Add an attribute" : "Add more"}
      </button>
    </>
  );
};

export default AttributesNFT;
