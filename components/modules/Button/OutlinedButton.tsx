import clsx from "clsx";
import React, { BaseSyntheticEvent, ReactNode } from "react";

interface Props {
  children: ReactNode;
  disabled?: boolean;
  onClick?: (e: BaseSyntheticEvent) => void;
  type?: "button" | "submit" | "reset" | undefined;
  sm?: boolean;
}

const OutlinedButton = ({ children, onClick, disabled, type, sm }: Props) => {
  return (
    <button
      className={clsx(
        "btn-outlined   transition-all duration-350 ease-in-out rounded-sm hover:ring-2 ring-purple-500 ring-offset-4 ring-offset-heroBg w-full disabled:opacity-70 disabled:ring-0 disabled:ring-offset-0 disabled:cursor-not-allowed",

        sm ? "text-lg py-[0.4rem] px-4" : "px-6 py-2 sm:px-8 sm:py-2.5 text-xl"
      )}
      onClick={onClick}
      disabled={disabled}
      type={type}
    >
      {children}
    </button>
  );
};

export default OutlinedButton;
