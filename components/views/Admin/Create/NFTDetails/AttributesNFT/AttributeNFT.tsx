import Label from "@/modules/Form/Label";
import TextField from "@/modules/Form/TextField";
import React, { BaseSyntheticEvent } from "react";
import { UseFormStateReturn } from "react-hook-form";
import { FiTrash } from "react-icons/fi";
import { DisplayType } from "utils/types";
import { IFormValuesCollection } from "../../ContainerCollectionForm";

interface Props {
  register: any;
  attributeIndex: number;
  nftIndex: number;
  displayType: DisplayType;
  handleRemoveAttribute: (attributeIndex: number, nftIndex: number) => void;
  formState: UseFormStateReturn<IFormValuesCollection>;
  maxValue?: number;
}

const AttributeNFT = ({
  register,
  attributeIndex,
  nftIndex,
  displayType,
  formState,
  maxValue,
  handleRemoveAttribute,
}: Props) => {
  const attribute = `nfts[${nftIndex}].attributes[${attributeIndex}]`;
  const { errors } = formState;

  const attributeErrors = Object.values(
    errors.nfts?.[nftIndex]?.attributes?.[attributeIndex] || {}
  ).reduce(
    (prev, curr, i) => ({
      ...prev,
      [Object.keys(errors.nfts?.[nftIndex].attributes?.[attributeIndex] || {})[
        i
      ]]: curr.message,
    }),
    { displayType: "", traitType: "", value: "", maxValue: "" }
  );

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between">
        <h4 className="text-2xl uppercase">Attribute {attributeIndex + 1}</h4>

        <button
          onClick={(e: BaseSyntheticEvent) => {
            e.preventDefault();
            handleRemoveAttribute(attributeIndex, nftIndex);
          }}
        >
          <FiTrash className="text-4xl hover:bg-gray-100 hover:bg-opacity-10 p-2 rounded-full" />
        </button>
      </div>

      <div className="flex flex-col gap-2">
        <Label id={`${attribute}.displayType`}>Display Type</Label>

        <select
          {...register(`${attribute}.displayType`)}
          defaultValue="default"
          className="bg-background border border-purple-400 border-opacity-20 w-full rounded-[5px] p-3 text-lg focus:border-transparent focus:ring-primaryLight focus:ring-2 focus:bg-black"
        >
          <option value="default">Default</option>
          <option value="boost_percentage">Boost Percentage</option>
          <option value="boost_number">Boost Number</option>
          <option value="number">Number</option>
          <option value="date">Date</option>
        </select>
      </div>

      <TextField
        name={`${attribute}.traitType`}
        register={register}
        label="Trait Type"
        error={attributeErrors.traitType}
      />

      {!(displayType === "boost_number") ? (
        <TextField
          name={`${attribute}.value`}
          register={register}
          type={displayType}
          label="Value"
          error={attributeErrors.value}
        />
      ) : (
        <div className="flex gap-4">
          <TextField
            name={`${attribute}.value`}
            register={register}
            type={"number"}
            max={maxValue}
            label="Value"
            error={attributeErrors.value}
          />

          <TextField
            name={`${attribute}.maxValue`}
            register={register}
            type={"number"}
            label="Maximum"
            error={attributeErrors.maxValue}
          />
        </div>
      )}
    </div>
  );
};

export default AttributeNFT;
