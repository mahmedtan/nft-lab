import React from "react";
import clsx from "clsx";
import { motion } from "framer-motion";

interface IItemRoadmap {
  title: string;
  description: string;
  label: string;
}

const ItemRoadmapPrimary = ({ label, description, title }: IItemRoadmap) => {
  return (
    <>
      <motion.div
        className=" sm:col-span-1 text-xl sm:text-3xl   flex sm:justify-center  px-8 sm:px-0 sm:py-10  sm:pr-10  whitespace-nowrap border-l-2 sm:border-none border-primaryLight  font-medium uppercase sm:capitalize text-white/90"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1, transition: { duration: 1 } }}
        viewport={{ once: true, margin: "-100px" }}
      >
        {label}
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1, transition: { duration: 1 } }}
        viewport={{ once: true, margin: "-100px" }}
        className={
          "col-span-1 relative  sm:col-span-4 pl-8 pb-8   sm:pb-0   border-l-2 sm:border-l-2  border-primaryLight text-xl sm:px-14  pt-2 sm:pt-8 text-justify sm:text-left flex flex-col sm:gap-2 gap-4"
        }
      >
        <div className="absolute w-4 h-4 bg-indigo-400 -left-[9px] top-4 sm:top-10 shadow-xl rounded-sm "></div>

        <h3 className="text-2xl font-semibold text-indigo-400 sm:text-left ">
          {title}
        </h3>
        <div dangerouslySetInnerHTML={{ __html: description }}></div>
      </motion.div>
    </>
  );
};

export default ItemRoadmapPrimary;
