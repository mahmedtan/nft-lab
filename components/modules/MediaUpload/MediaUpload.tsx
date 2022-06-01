import Label from "@/modules/Form/Label";
import { IFormValuesCollection } from "@/views/Admin/Create/ContainerCollectionForm";
import clsx from "clsx";
import Image from "next/image";
import { BaseSyntheticEvent, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import {
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";
import { FaUpload } from "react-icons/fa";
import { FiUpload, FiX } from "react-icons/fi";

interface Props {
  name: string;
  label: string;
  setValue: UseFormSetValue<IFormValuesCollection>;
  watch: UseFormWatch<IFormValuesCollection>;
  error?: boolean;
}

const MediaUpload = ({ name, label, setValue, watch, error }: Props) => {
  const [hover, setHover] = useState<boolean>(false);
  const file = watch(name as any);

  const onDrop = (acceptedFiles: any) => {
    if (acceptedFiles.length)
      setValue(
        name as any,
        Object.assign(acceptedFiles[0], {
          preview: URL.createObjectURL(acceptedFiles[0]),
        })
      );
  };

  useEffect(
    () => () => {
      URL.revokeObjectURL(file?.preview);
    },
    [file]
  );

  const handleOpenDialog = (e: BaseSyntheticEvent) => {
    e.preventDefault();
    open();
  };

  const { getRootProps, getInputProps, isDragActive, open, fileRejections } =
    useDropzone({
      accept: "image/*",
      maxFiles: 1,
      noClick: true,
      onDrop,
    });

  const rejectionError = fileRejections?.[0]?.errors?.[0].message;

  return (
    <div className="w-full flex flex-col gap-0.5 select-none">
      <Label id={name}>{label}</Label>
      <div
        {...getRootProps()}
        className={clsx(
          "w-full h-[33.6rem] p-8 xl:p-12 text-center bg-background border rounded-md border-purple-400  flex flex-col gap-4 items-center justify-center",
          isDragActive ? "border-opacity-100" : "border-opacity-20",
          { "ring-red-500 ring-1": error && !file }
        )}
      >
        {file ? (
          <div
            className="relative w-64 h-64 xl:w-80 xl:h-80 rounded-lg overflow-hidden shadow-xl"
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
          >
            <input {...getInputProps()} />
            <Image src={file.preview} layout="fill" objectFit="cover" />
            <div className="absolute w-full h-full hover:bg-black   z-10   hover:backdrop-blur-md hover:bg-opacity-10 transition-all duration-300 flex items-center justify-center">
              {hover && (
                <div className="flex gap-4 items-center justify-center text-4xl transition-all duration-200">
                  <button
                    className="p-2 bg-white bg-opacity-30 backdrop-blur-md rounded-full hover:bg-primaryLight hover:shadow-xl"
                    onClick={handleOpenDialog}
                  >
                    <FiUpload />
                  </button>
                  <button
                    className="p-2 bg-white bg-opacity-30 backdrop-blur-md rounded-full hover:bg-red-500 hover:shadow-xl"
                    onClick={(e: BaseSyntheticEvent) => {
                      e.preventDefault();
                      setValue(name as any, null);
                    }}
                  >
                    <FiX />
                  </button>
                </div>
              )}
            </div>
          </div>
        ) : (
          <>
            <input {...getInputProps()} />
            <div className="relative w-36 h-36 select-none ">
              <Image src="/assets/images/upload-image.svg" layout="fill" />
            </div>

            <div>
              {isDragActive ? (
                <div className="font-medium">Drop images here</div>
              ) : (
                <>
                  Drag and drop an image, or{" "}
                  <a
                    className="text-primaryLight font-medium hover:underline cursor-pointer"
                    onClick={handleOpenDialog}
                  >
                    Browse
                  </a>
                </>
              )}
            </div>
            <div className="text-sm text-gray-400">
              1200x1200 or higher recommended, Max 10 Mb each
            </div>
            <div className="text-red-400 font-medium">{rejectionError}</div>
          </>
        )}
      </div>
    </div>
  );
};

export default MediaUpload;
