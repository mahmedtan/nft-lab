import Label from "@/modules/Form/Label";
import clsx from "clsx";
import React from "react";

interface Props {
  placeholder: string;
  name: string;
  type: string;
  label: string;
}

const InputCTA = ({ placeholder, name, type, label }: Props) => {
  return (
    <div className={clsx("flex flex-col gap-1 w-full")}>
      <div className="flex justify-between">
        <Label id={name}>{label}</Label>
      </div>
      <div className="relative">
        <input
          type={type}
          name={name}
          id={name}
          placeholder={placeholder}
          className="bg-background border border-purple-400 border-opacity-20 w-full rounded-[10px] p-3 text-lg focus:border-transparent focus:ring-primaryLight focus:ring-2 focus:bg-black"
        />
      </div>
    </div>
  );
};

export default InputCTA;
