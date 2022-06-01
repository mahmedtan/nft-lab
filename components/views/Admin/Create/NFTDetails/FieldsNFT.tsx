import TextArea from "@/modules/Form/TextArea";
import TextField from "@/modules/Form/TextField";
import React from "react";
import {
  UseFormHandleSubmit,
  UseFormRegister,
  UseFormReset,
  UseFormStateReturn,
  UseFormWatch,
} from "react-hook-form";
import { IFormValuesCollection } from "../ContainerCollectionForm";
import AttributesNFT from "./AttributesNFT/AttributesNFT";

interface IFieldsNFT {
  register: UseFormRegister<IFormValuesCollection>;
  handleSubmit: UseFormHandleSubmit<IFormValuesCollection>;
  reset: UseFormReset<IFormValuesCollection>;
  watch: UseFormWatch<IFormValuesCollection>;
  index: number;
  formState: UseFormStateReturn<IFormValuesCollection>;
  handleAddNewAttribute: (index: number) => void;
  fields: IFormValuesCollection;
  handleRemoveAttribute: (attributeIndex: number, nftIndex: number) => void;
}

const FieldsNFT = ({
  register,
  watch,
  fields,
  index,
  handleAddNewAttribute,
  handleRemoveAttribute,
  formState,
}: IFieldsNFT) => {
  const { errors } = formState;
  const description = watch<any>(`nfts[${index}].description`);

  const nftErrors = Object.values(errors.nfts?.[index] || {}).reduce(
    (prev, curr, i) =>
      Array.isArray(curr)
        ? prev
        : {
            ...prev,
            [Object.keys(errors.nfts?.[index] || {})[i]]: curr.message,
          },
    {
      title: "",
      creator: "",
      price: "",
      description: "",
      numberOfTokens: "",
    }
  );

  return (
    <div className="w-full flex flex-col gap-8">
      <TextField
        name={`nfts[${index}].title`}
        label="NFT Title"
        error={nftErrors.title}
        placeholder="Enter NFT title"
        register={register}
      />

      <TextField
        name={`nfts[${index}].creator`}
        label="Creator"
        error={nftErrors.creator}
        placeholder="Enter creator's name"
        register={register}
      />

      {/* <TextField
        name={`nfts[${index}].price`}
        label="Price(ETH)"
        error={nftErrors.price}
        type="number"
        step="any"
        placeholder="Enter price in ETH"
        register={register}
      /> */}

      <TextArea
        name={`nfts[${index}].description`}
        label="Description"
        error={nftErrors.description}
        subtitle={`${description?.length}/400`}
        placeholder="Enter description"
        register={register}
      />

      <TextField
        name={`nfts[${index}].numberOfTokens`}
        label="Number of Tokens"
        error={nftErrors.numberOfTokens}
        sm
        type="number"
        placeholder="Enter number of Tokens"
        register={register}
      />

      <AttributesNFT
        nftIndex={index}
        register={register}
        formState={formState}
        handleAddNewAttribute={handleAddNewAttribute}
        handleRemoveAttribute={handleRemoveAttribute}
        fields={fields}
      />
    </div>
  );
};

export default FieldsNFT;
