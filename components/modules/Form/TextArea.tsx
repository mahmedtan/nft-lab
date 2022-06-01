import { ChangeEventHandler, useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import Label from "./Label";

interface Props {
  name: string;
  label: string;
  type?: "text" | "number" | "email";
  placeholder?: string;
  password?: boolean;

  register: any;
  subtitle?: string;
  error?: string;
}

const TextArea = ({
  name,
  label,
  type = "text",
  placeholder,
  register,
  subtitle,
  error,
}: Props) => {
  return (
    <div className="flex flex-col gap-1 w-full">
      <div className="flex justify-between">
        <Label id={name}>{label}</Label>
        <p className="opacity-60">{subtitle}</p>
      </div>
      <div className="relative">
        <textarea
          rows={6}
          type={type}
          name={name}
          id={name}
          {...register(name)}
          placeholder={placeholder}
          className="bg-background border border-purple-400 border-opacity-20 rounded-[5px] w-full p-3 text-lg focus:border-transparent focus:ring-primaryLight focus:ring-2 focus:bg-black"
        />
      </div>
      {error && <div className="text-red-400 mt-1">{error}</div>}
    </div>
  );
};

export default TextArea;
