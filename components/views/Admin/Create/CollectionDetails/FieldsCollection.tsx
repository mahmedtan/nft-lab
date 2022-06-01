import DateInput from "@/modules/Form/DateInput";
import TextArea from "@/modules/Form/TextArea";
import TextField from "@/modules/Form/TextField";
import React from "react";
import {
  UseFormHandleSubmit,
  UseFormRegister,
  UseFormReset,
  UseFormStateProps,
  UseFormStateReturn,
  UseFormWatch,
} from "react-hook-form";
import { IFormValuesCollection } from "../ContainerCollectionForm";

interface IFieldsCollection {
  register: UseFormRegister<IFormValuesCollection>;
  handleSubmit: UseFormHandleSubmit<IFormValuesCollection>;
  reset: UseFormReset<IFormValuesCollection>;
  formState: UseFormStateReturn<IFormValuesCollection>;
  watch: UseFormWatch<IFormValuesCollection>;
}

const FieldsCollection = ({
  register,
  watch,
  formState: { errors },
}: IFieldsCollection) => {
  const description = watch("collection.description");

  const collectionErrors = Object.values(errors.collection || {}).reduce(
    (prev, curr, index) => ({
      ...prev,
      [Object.keys(errors.collection || {})[index]]: curr.message,
    }),
    {
      title: "",
      creator: "",
      contractAddress: "",
      description: "",
      initialToken: "",
      saleDateTime: "",
    }
  );

  return (
    <div className="w-full flex flex-col gap-8">
      <TextField
        name="collection.title"
        label="Collection Title"
        placeholder="Enter collection title"
        error={collectionErrors.title}
        register={register}
      />
      <TextField
        name="collection.creator"
        label="Creator"
        error={collectionErrors.creator}
        placeholder="Enter creator's name"
        register={register}
      />
      {/* <TextField
        name="collection.contractAddress"
        label="Contract Address"
        error={collectionErrors.contractAddress}
        placeholder="Enter contract address"
        register={register}
      /> */}
      <TextArea
        name="collection.description"
        label="Description"
        error={collectionErrors.description}
        subtitle={`${description?.length}/400`}
        placeholder="Enter description"
        register={register}
      />
      <TextField
        name="collection.initialToken"
        label="Initial Token"
        error={collectionErrors.initialToken}
        type="number"
        subtitle="Default = 1"
        placeholder="Enter initial token"
        register={register}
      />
      {/* <DateInput
        name="collection.saleDateTime"
        label="Sale Date & Time"
        error={collectionErrors.saleDateTime}
        register={register}
      /> */}
    </div>
  );
};

export default FieldsCollection;
