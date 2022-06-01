import { IFormValuesCollection } from "@/views/Admin/Create/ContainerCollectionForm";
import { Dialog } from "@headlessui/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaHourglass } from "react-icons/fa";
import { FiCheck, FiX } from "react-icons/fi";
import { S3_BUCKET_URL } from "utils/constants";
import { supabase } from "utils/supabaseClient";
import { PROCESS_STATE } from "utils/types";
import { uploadToS3 } from "utils/uploadToS3";
import { v4 } from "uuid";
import GradientButton from "../Button/GradientButton";

interface IConfirmationDialog {
  open: boolean;
  data: IFormValuesCollection;
  handleReset: () => void;
}

const ProcessDialog = ({ open, data, handleReset }: IConfirmationDialog) => {
  const handleClose = () => {};
  const [mode, setMode] = useState<PROCESS_STATE>(PROCESS_STATE.IDLE);

  useEffect(() => {
    if (data && (mode === PROCESS_STATE.IDLE || mode === PROCESS_STATE.ERROR))
      (async () => {
        try {
          setMode(PROCESS_STATE.IN_PROGRESS);
          const { collection, nfts } = data;

          const collectionImagePath = (await uploadToS3(
            collection.image!,
            `collections/${v4()}-${collection.image?.name}`
          )) as string;

          const nftImagesPath = (await Promise.all(
            nfts.map((nft) =>
              uploadToS3(nft.image!, `nfts/${v4()}-${nft.image?.name}`)
            )
          )) as string[];

          const collectionResponse = await supabase.from("collection").insert([
            {
              id: v4(),
              title: collection.title,
              description: collection.description,
              creator: collection.creator,
              // contract_address: collection.contractAddress,
              initial_token: collection.initialToken,
              // sale_datetime: new Date(collection.saleDateTime).toUTCString(),
              image: `${S3_BUCKET_URL}/${collectionImagePath}`,
              user_email: supabase.auth.user()?.email,
            },
          ]);

          const collection_id = collectionResponse?.data?.[0].id;

          const nftsTemp = nfts.reduce((prev: any, curr, index) => {
            const initialToken =
              index === 0
                ? collection.initialToken
                : prev[index - 1].finalToken + 1;

            return prev.concat({
              ...curr,
              initialToken,
              finalToken: initialToken + curr.numberOfTokens - 1,
            });
          }, []);

          const nftResponse = await supabase.from("nft").insert(
            nftsTemp.map((nft: any, index: number) => ({
              title: nft.title,
              description: nft.description,
              creator: nft.creator,
              attributes: nft.attributes?.map((attr: any) => ({
                display_type: attr.displayType,
                trait_type: attr.traitType,
                value:
                  attr.displayType === "date"
                    ? +new Date(attr.value)
                    : attr.value,
                max_value: attr.maxValue,
              })),
              collection_id,
              initial_token: nft.initialToken,

              final_token: nft.finalToken,
              image: `${S3_BUCKET_URL}/${nftImagesPath[index]}`,
            }))
          );

          setMode(
            collectionResponse.error || nftResponse.error
              ? PROCESS_STATE.ERROR
              : PROCESS_STATE.SUCCESS
          );

          handleReset();
        } catch (error) {
          setMode(PROCESS_STATE.ERROR);
        }
      })();
  }, [data]);

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      className="fixed z-10 inset-0 overflow-y-auto flex items-center justify-center"
    >
      <Dialog.Overlay className="fixed inset-0  bg-background" />

      <div className="bg-foreground relative flex flex-col w-full max-w-lg   text-white text-center rounded-md z-20 p-16 items-center gap-8 ">
        {mode === PROCESS_STATE.IN_PROGRESS || mode === PROCESS_STATE.IDLE ? (
          <>
            <FaHourglass className="animate-spin text-6xl" />
            <Dialog.Title className={"text-4xl"}>Processing</Dialog.Title>
            <Dialog.Description className={"text-xl"}>
              Please wait while your request is being processed
            </Dialog.Description>
          </>
        ) : mode === PROCESS_STATE.SUCCESS ? (
          <>
            <FiCheck className="animate-pulse text-6xl" />
            <Dialog.Title className={"text-4xl"}>
              Collection Created!
            </Dialog.Title>
            <Dialog.Description className={"text-xl"}>
              You just created a collection successfully
            </Dialog.Description>
            <div className="mt-2">
              <Link href={"/admin"}>
                <a>
                  <GradientButton sm>View Collection</GradientButton>
                </a>
              </Link>
            </div>
          </>
        ) : (
          <>
            <FiX className="animate-pulse text-6xl" />
            <Dialog.Title className={"text-4xl"}>Error</Dialog.Title>
            <Dialog.Description className={"text-xl"}>
              Something went wrong
            </Dialog.Description>
          </>
        )}
      </div>
    </Dialog>
  );
};

export default ProcessDialog;
