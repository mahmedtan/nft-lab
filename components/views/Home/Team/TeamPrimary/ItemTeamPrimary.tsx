import { motion } from "framer-motion";
import Image from "next/image";

interface IItemTeamPrimaryProps {
  name: string;
  position: string;
  imageUrl: string;
  fullName: string;
  delay: number;
}

const ItemTeamPrimary = ({
  name,
  fullName,
  position,
  imageUrl,
  delay,
}: IItemTeamPrimaryProps) => {
  return (
    <motion.div
      className="w-full  max-w-sm mx-auto  rounded-lg border-primaryLight    flex flex-col items-center "
      initial={{
        opacity: 0,
        x: -50,
      }}
      whileInView={{ opacity: 1, x: 0, transition: { delay, duration: 0.5 } }}
      viewport={{ once: true }}
    >
      <div className="relative w-48 aspect-square rounded-full overflow-hidden ">
        <Image
          src={imageUrl}
          layout="fill"
          placeholder="empty"
          objectFit="contain"
        />
      </div>
      <div className="text-center flex flex-col gap-1">
        <h4 className="text-2xl text-gray-100">{name}</h4>
        <h4 className="text-lg opacity-80 ">{fullName}</h4>
        <h5 className="text-xl text-primaryLight brightness-150">{position}</h5>
      </div>
    </motion.div>
  );
};

export default ItemTeamPrimary;
