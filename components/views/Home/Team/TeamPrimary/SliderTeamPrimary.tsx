import team from "content/team";
import { useRef, useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import ItemTeamPrimary from "./ItemTeamPrimary";

const SliderTeamPrimary = () => {
  return (
    <div className="w-full relative sm:hidden">
      <div className="w-full flex overflow-scroll gap-4 relative">
        {team.map((member, index) => (
          <div className="w-full min-w-full" key={index}>
            <ItemTeamPrimary {...member} delay={index * 0.5} />
          </div>
        ))}
      </div>
      <div className="absolute top-[30%] right-0     flex items-center justify-end  ">
        <div className="p-1 rounded-full animate-pulse">
          <FiChevronRight className="text-4xl" />
        </div>
      </div>
      <div className="absolute top-[30%] left-0     flex items-center justify-end  ">
        <div className="p-1  rounded-full animate-pulse">
          <FiChevronLeft className="text-4xl" />
        </div>
      </div>
    </div>
  );
};

export default SliderTeamPrimary;
