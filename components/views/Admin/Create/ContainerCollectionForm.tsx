import Container from "@/modules/Container/Container";
import React, { BaseSyntheticEvent, useState } from "react";
import CollectionDetails from "./CollectionDetails/CollectionDetails";
import NFTDetails from "./NFTDetails/NFTDetails";
import { FiPlus } from "react-icons/fi";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import GradientButton from "@/modules/Button/GradientButton";
import OutlinedButton from "@/modules/Button/OutlinedButton";
import ConfirmationDialog from "@/modules/Dialogs/ConfirmationDialog";
import { Router, useRouter } from "next/router";
import DialogsCollection from "./DialogsCollection";
import { DisplayType } from "utils/types";

export interface IFormValuesCollection {
  collection: {
    title: string;
    creator: string;
    description: string;
    initialToken: number;
    image: File | null;
    // contractAddress: string;
    // saleDateTime: Date;
  };

  nfts: {
    title: string;
    creator: string;
    // price: number;
    description: string;
    numberOfTokens: number;
    attributes?: {
      displayType?: DisplayType;
      traitType: string;
      value: string | number | Date;
      maxValue?: number;
    }[];
    image: File | null;
  }[];
}

const ContainerCollectionForm = () => {
  const [deleteItemDialog, setDeleteItemDialog] = useState<object | null>(null);
  const [cancelFormDialog, setCancelFormDialog] = useState<boolean>(false);
  const [summaryDialog, setSummaryDialog] =
    useState<IFormValuesCollection | null>(null);
  const [processDialog, setProcessDialog] =
    useState<IFormValuesCollection | null>(null);

  const handleCloseDelete = () => {
    setDeleteItemDialog(null);
  };
  const handleCloseCancel = () => {
    setCancelFormDialog(false);
  };
  const handleCloseSummary = () => {
    setSummaryDialog(null);
  };

  const handleOpenDelete = (data: any) => {
    setDeleteItemDialog(data);
  };

  const handleOpenCancel = () => {
    setCancelFormDialog(true);
  };

  const schema = yup
    .object({
      collection: yup.object({
        title: yup.string().min(5, "Too short").required("Required!"),
        creator: yup.string().min(1, "Too short").required("Required!"),
        // contractAddress: yup
        //   .string()
        //   .min(10, "Too short")
        //   .required("Required!"),
        description: yup
          .string()
          .min(10, "Too short")
          .max(400, "Too long")
          .required("Required!"),
        // saleDateTime: yup.lazy((value) =>
        //   value === ""
        //     ? yup.string().required("Required!")
        //     : yup
        //         .date()
        //         .min(new Date(), "Sale needs to be in the future")
        //         .required("Required")
        // ),
        initialToken: yup.lazy((value) =>
          value === ""
            ? yup.string().required("Required!")
            : yup.number().min(1, "Must be positive").required("Required!")
        ),
        image: yup.mixed().required("Required!"),
      }),

      nfts: yup
        .array(
          yup
            .object({
              title: yup.string().min(5, "Too short").required("Required!"),
              creator: yup.string().min(1, "Too short").required("Required!"),
              // price: yup.lazy((value) =>
              //   value === ""
              //     ? yup.string().required("Required!")
              //     : yup
              //         .number()
              //         .min(0, "Must be non negative")
              //         .required("Required!")
              // ),
              description: yup
                .string()
                .min(10, "Too short")
                .max(500, "Too long")
                .required("Required!"),
              numberOfTokens: yup.lazy((value) =>
                value === ""
                  ? yup.string().required("Required!")
                  : yup
                      .number()
                      .min(1, "Must be positive")
                      .required("Required!")
              ),

              attributes: yup.array(
                yup.object({
                  displayType: yup.string().required("Required!"),
                  traitType: yup.string().required("Required!"),
                  value: yup.string().required("Required!"),
                  maxValue: yup.string(),
                })
              ),
              image: yup.mixed().required("Required!"),
            })
            .required()
        )
        .required(),
    })
    .required();

  const formUtils = useForm<IFormValuesCollection>({
    resolver: yupResolver(schema),
    defaultValues: {
      collection: {
        title: "My Collection",
        description: "This is my collection, Sweet sweet",
        // contractAddress: "0x343545452v232452659",
        creator: "John Doe",
        initialToken: 1,
      },

      nfts: [
        {
          title: "My NFT #1",
          description: "This my first NFT",
          // price: 10,
          creator: "Jane Doe",
          numberOfTokens: 10,
          image: null,
          attributes: [],
        },
      ],
    },
  });

  const fields = formUtils.watch();
  const handleAddNFT = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();

    formUtils.setValue(
      "nfts",
      fields.nfts.concat({
        title: "",
        description: "",
        // price: 0,
        creator: "",
        numberOfTokens: 1,
        image: null,
        attributes: [],
      })
    );
  };

  const handleAddNewAttribute = (nftIndex: number) => {
    formUtils.setValue(
      "nfts",
      fields.nfts.map((nft, index) =>
        index !== nftIndex
          ? nft
          : {
              ...nft,
              attributes: nft.attributes?.concat({
                displayType: "default",
                value: "",
                traitType: "",
              }),
            }
      )
    );
  };

  const handleRemoveAttribute = (attributeIndex: number, nftIndex: number) => {
    formUtils.setValue(
      "nfts",
      fields.nfts.map((nft, index) =>
        index !== nftIndex
          ? nft
          : {
              ...nft,
              attributes: nft.attributes?.filter(
                (_, index) => index !== attributeIndex
              ),
            }
      )
    );
  };

  const handleRemoveNFT = (index: number) =>
    formUtils.setValue(
      "nfts",
      fields.nfts.filter((_, i) => i !== index)
    );

  return (
    <div className="relative">
      <DialogsCollection
        handleReset={() => formUtils.reset()}
        handleRemoveNFT={handleRemoveNFT}
        handleCloseDelete={handleCloseDelete}
        handleCloseCancel={handleCloseCancel}
        deleteItemDialog={deleteItemDialog}
        cancelFormDialog={cancelFormDialog}
        summaryDialog={summaryDialog}
        processDialog={processDialog}
        handleCloseSummary={handleCloseSummary}
        handleSubmitForm={(data: IFormValuesCollection) =>
          setProcessDialog(data)
        }
      />
      <form
        className="py-20"
        onSubmit={formUtils.handleSubmit((values) => {
          setSummaryDialog(values);
        })}
      >
        <Container>
          <div className="flex flex-col gap-12">
            <div className="w-full  bg-foreground  p-16 flex flex-col gap-16 rounded-md">
              <CollectionDetails {...formUtils} />
              <div className="p-8 border border-primaryLight rounded-md border-dashed flex flex-col items-center gap-8 bg-foregroundLight bg-opacity-5">
                {Array(fields.nfts.length)
                  .fill({})
                  .map((_, index) => (
                    <NFTDetails
                      key={index}
                      index={index}
                      fields={fields}
                      {...formUtils}
                      handleRemoveNFT={() => {
                        handleOpenDelete({ index });
                      }}
                      handleAddNewAttribute={handleAddNewAttribute}
                      handleRemoveAttribute={handleRemoveAttribute}
                    />
                  ))}
                <button
                  className="uppercase text-red-400 font-medium flex  items-center justify-center gap-2 self-start rounded-md p-3 hover:bg-red-100 hover:bg-opacity-10 text-xl"
                  onClick={handleAddNFT}
                >
                  <FiPlus />
                  <p className="mt-0.5">Add Another NFT</p>
                </button>
              </div>
            </div>
            <div className="h-20 w-full flex justify-end gap-4">
              <div className="">
                <OutlinedButton
                  onClick={(e: BaseSyntheticEvent) => {
                    e.preventDefault();
                    handleOpenCancel();
                  }}
                >
                  Cancel
                </OutlinedButton>
              </div>
              <div className="">
                <GradientButton type="submit">Submit</GradientButton>
              </div>
            </div>
          </div>
        </Container>
      </form>
    </div>
  );
};

export default ContainerCollectionForm;
