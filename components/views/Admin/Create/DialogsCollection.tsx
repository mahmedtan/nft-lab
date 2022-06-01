import ConfirmationDialog from "@/modules/Dialogs/ConfirmationDialog";
import ProcessDialog from "@/modules/Dialogs/ProcessDialog";
import SummaryDialog from "@/modules/Dialogs/SummaryDialog/SummaryDialog";
import { useRouter } from "next/router";
import { useState } from "react";
import { PROCESS_STATE } from "utils/types";
import { IFormValuesCollection } from "./ContainerCollectionForm";

interface Props {
  handleRemoveNFT: (index: number) => void;
  handleCloseDelete: () => void;
  handleCloseCancel: () => void;
  handleCloseSummary: () => void;
  deleteItemDialog: object | null;
  cancelFormDialog: boolean;
  summaryDialog: IFormValuesCollection | null;
  processDialog: IFormValuesCollection | null;
  handleSubmitForm: (data: IFormValuesCollection) => void;
  handleReset: () => void;
}

const DialogsCollection = ({
  handleRemoveNFT,
  handleCloseDelete,
  handleCloseCancel,
  handleCloseSummary,
  deleteItemDialog,
  processDialog,
  handleSubmitForm,
  cancelFormDialog,
  handleReset,
  summaryDialog,
}: Props) => {
  const router = useRouter();

  return (
    <>
      <ConfirmationDialog
        open={Boolean(deleteItemDialog)}
        data={deleteItemDialog}
        successLabel="Delete Item"
        cancelLabel="Nevermind"
        handleClose={() => {
          handleCloseDelete();
        }}
        handleSuccess={({ index }) => {
          handleRemoveNFT(index);
          handleCloseDelete();
        }}
        title="Delete item"
        description="Are you sure you want to delete the item?"
      />

      <ConfirmationDialog
        open={cancelFormDialog}
        data={cancelFormDialog}
        successLabel="Confirm"
        cancelLabel="Nevermind"
        handleClose={() => {
          handleCloseCancel();
        }}
        handleSuccess={() => {
          handleCloseCancel();
          router.push("/admin");
        }}
        title="Are you sure?"
        description="Are you sure you want to leave this page without publishing your collection"
      />

      <SummaryDialog
        open={Boolean(summaryDialog)}
        data={summaryDialog}
        handleClose={() => {
          handleCloseSummary();
        }}
        handleSuccess={(data) => {
          handleCloseSummary();
          handleSubmitForm(data);
        }}
      />

      <ProcessDialog
        open={Boolean(processDialog)}
        data={processDialog as IFormValuesCollection}
        handleReset={handleReset}
      />
    </>
  );
};

export default DialogsCollection;
