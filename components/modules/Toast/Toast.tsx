import React from "react";
import { StatusWallet } from "utils/types";
import StatusDot from "../StatusDot/StatusDot";

type IToast = {
  status: StatusWallet;
  message: string;
};

const Toast = ({ message, status }: IToast) => {
  if (!message || !status) return null;

  return (
    <div className="w-full h-14 bg-foregroundLight rounded-full flex items-center p-6 gap-3 shadow-2xl">
      <StatusDot status={status} />
      <div className="text-xl font-medium">{message}</div>
    </div>
  );
};

export default Toast;
