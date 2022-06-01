import clsx from "clsx";
import { ChangeEventHandler, useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import Label from "./Label";

interface Props {
  name: string;
  label: string;
  type?:
    | "text"
    | "number"
    | "password"
    | "email"
    | "date"
    | "boost_percentage"
    | "default";
  placeholder?: string;
  password?: boolean;
  subtitle?: string;
  register: any;
  sm?: boolean;
  error?: string;
  max?: number;
  step?: string;
}

const TextField = ({
  name,
  label,
  type = "text",
  step,
  placeholder,
  sm,
  error,
  subtitle,
  register,
  max,
}: Props) => {
  const [hidden, setHidden] = useState(false);

  return (
    <div className={clsx("flex flex-col gap-1", sm ? "w-64" : "w-full")}>
      <div className="flex justify-between">
        <Label id={name}>{label}</Label>
        <p className="text-gray-400">{subtitle}</p>
      </div>
      <div className="relative">
        <input
          type={
            type === "password" && hidden
              ? "text"
              : type === "boost_percentage"
              ? "number"
              : type === "default"
              ? "text"
              : type
          }
          name={name}
          id={name}
          min={0}
          max={type === "boost_percentage" ? 100 : max || undefined}
          step={type === "boost_percentage" ? "any" : step}
          {...register(name)}
          placeholder={placeholder}
          className="bg-background border border-purple-400 border-opacity-20 w-full rounded-[5px] p-3 text-lg focus:border-transparent focus:ring-primaryLight focus:ring-2 focus:bg-black"
        />
        {type === "password" && (
          <div
            className="text-gray-400 absolute top-0 right-4 text-xl flex  items-center h-full cursor-pointer"
            onClick={() => {
              setHidden(!hidden);
            }}
          >
            {hidden ? <FiEyeOff /> : <FiEye />}
          </div>
        )}
        {type === "boost_percentage" && (
          <div className="text-gray-400 absolute top-0 right-4 text-xl flex  items-center h-full cursor-pointer">
            %
          </div>
        )}
      </div>
      {error && <div className="text-red-400 mt-1">{error}</div>}
    </div>
  );
};

export default TextField;
