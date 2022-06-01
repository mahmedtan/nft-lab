import clsx from "clsx";
import React from "react";
import { StatusWallet } from "utils/types";

type IStatusDot = {
  status: StatusWallet;
};

const StatusDot = ({ status }: IStatusDot) => {
  return (
    <div
      className={clsx(
        "w-4 h-4  rounded-full",
        status === "success"
          ? "bg-green-400 drop-shadow-success"
          : status === "failure"
          ? "bg-red-400 drop-shadow-failure"
          : "bg-yellow-100 drop-shadow-info"
      )}
    ></div>
  );
};

export default StatusDot;
