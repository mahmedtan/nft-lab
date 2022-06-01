import React from "react";
import clsx from "clsx";

import { BsArrowDown } from "react-icons/bs";

interface IItemRoadmap {
  title: string;
  description: string;
  label: string;
  last?: boolean;
}

const ItemRoadmapSecondary = ({
  title,
  description,
  label,
  last,
}: IItemRoadmap) => {
  return (
    <>
      <div className=" col-span-1 w-28 self-center flex justify-center items-center  text-xl lg:text-xl aspect-square     bg-gradient-to-b from-primaryLight to-primaryDark rounded-full   mx-auto md:mx-0">
        {label}
      </div>
      <div
        className={
          "col-span-1 md:col-span-4   text-lg md:text-xl h-full  flex items-center text-center md:text-left"
        }
      >
        {description}
      </div>

      {!last && (
        <>
          <div className="col-span-1   flex items-center justify-center text-4xl sm:text-5xl h-auto w-24  md:h-28 md:w-28  opacity-60 md:mx-0 mx-auto">
            <BsArrowDown />
          </div>
          <div className="col-span-4 w-full   h-0.5 bg-primaryLight self-center md:block hidden"></div>
        </>
      )}
    </>
  );
};

export default ItemRoadmapSecondary;
