import { Dialog } from "@headlessui/react";
import { FiX } from "react-icons/fi";
import GradientButton from "../Button/GradientButton";
import OutlinedButton from "../Button/OutlinedButton";

interface IConfirmationDialog {
  open: boolean;
  handleClose: () => void;
  handleSuccess: (data: any) => void;
  successLabel: string;
  cancelLabel: string;
  title: string;
  description: string;
  data: any;
}

const ConfirmationDialog = ({
  open,
  handleClose,
  handleSuccess,
  title,
  description,
  successLabel,
  cancelLabel,
  data,
}: IConfirmationDialog) => {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      className="fixed z-10 inset-0 overflow-y-auto flex items-center justify-center"
    >
      <Dialog.Overlay className="fixed inset-0  bg-black bg-opacity-60" />

      <div className="bg-foreground relative flex flex-col w-full max-w-lg  text-white text-center rounded-md z-20 p-12 items-center gap-4 ">
        <button
          className="text-2xl absolute top-5 right-5 hover:bg-white hover:bg-opacity-25 p-1 rounded-full"
          onClick={handleClose}
        >
          <FiX />
        </button>
        <Dialog.Title className={"text-4xl"}>{title}</Dialog.Title>
        <Dialog.Description className={"text-xl"}>
          {description}
        </Dialog.Description>

        <div className="flex gap-4 items-center justify-center pt-4 w-full max-w-sm">
          <div className="flex-grow">
            <OutlinedButton sm onClick={handleClose}>
              {cancelLabel}
            </OutlinedButton>
          </div>
          <div className="flex-grow">
            <GradientButton
              sm
              onClick={() => {
                handleSuccess(data);
              }}
            >
              {successLabel}
            </GradientButton>
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default ConfirmationDialog;
