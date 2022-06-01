import { IFormValuesCollection } from "@/views/Admin/Create/ContainerCollectionForm";
import { Dialog } from "@headlessui/react";
import { FiX } from "react-icons/fi";
import GradientButton from "../../Button/GradientButton";
import OutlinedButton from "../../Button/OutlinedButton";
import ItemsAccordian from "./ItemsAccordian";

interface ISummaryDialog {
  open: boolean;
  handleClose: () => void;
  handleSuccess: (data: any) => void;
  data: IFormValuesCollection | null;
}

const SummaryDialog = ({
  open,
  handleClose,
  handleSuccess,
  data,
}: ISummaryDialog) => {
  if (!data) return null;

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      className="fixed z-10 inset-0 overflow-y-auto flex items-center justify-center"
    >
      <Dialog.Overlay className="fixed inset-0  bg-black bg-opacity-60" />

      <div className="bg-foreground relative flex flex-col w-full max-w-xl max-h-[90vh] overflow-auto  text-white text-center rounded-md z-20 px-20 py-16 items-center gap-8 ">
        <button
          className="text-2xl absolute top-5 right-5 hover:bg-white hover:bg-opacity-25 p-1 rounded-full"
          onClick={handleClose}
        >
          <FiX />
        </button>
        <Dialog.Title className={"text-4xl"}>Collection Summary</Dialog.Title>

        <div className="w-full flex flex-col gap-2 text-lg p-2">
          <div className="flex justify-between ">
            <div className="">Collection Title </div>
            <div className="">{data.collection.title} </div>
          </div>
          <div className="flex justify-between">
            <div className="">Creator</div>
            <div className="">{data.collection.creator} </div>
          </div>
          {/* <div className="flex justify-between">
            <div className="">Contract Address</div>
            <div className="">{data.collection.contractAddress} </div>
          </div> */}
        </div>

        <ItemsAccordian data={data} />

        <div className="flex gap-4 items-center justify-center pt-4 w-full max-w-xs">
          <div className="flex-grow">
            <OutlinedButton sm onClick={handleClose}>
              Cancel
            </OutlinedButton>
          </div>
          <div className="flex-grow">
            <GradientButton
              sm
              onClick={() => {
                handleSuccess(data);
              }}
            >
              Confirm
            </GradientButton>
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default SummaryDialog;
