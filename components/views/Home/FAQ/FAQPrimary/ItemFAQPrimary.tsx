import clsx from "clsx";
import { useState } from "react";
import { FiMinus, FiPlus } from "react-icons/fi";

interface Props {}

const ItemFAQPrimary = (props: Props) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      className={clsx(
        "border border-primaryLight w-full max-w-3xl p-6  flex cursor-pointer items-center   select-none justify-between",
        { "drop-shadow-panel": expanded },
        expanded ? "bg-primaryLight  " : "bg-foreground hover:bg-blackBg "
      )}
      onClick={() => setExpanded(!expanded)}
    >
      <div className="flex flex-col gap-2">
        <h4 className="text-xl font-medium">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. In,
          voluptate.
        </h4>
        {expanded && (
          <div>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio
            inventore beatae quia illo mollitia omnis explicabo placeat totam
            in, odit officiis aut assumenda neque eligendi, hic eos accusantium,
            vero deleniti!
          </div>
        )}
      </div>
      <div className="text-xl">{expanded ? <FiMinus /> : <FiPlus />}</div>
    </div>
  );
};

export default ItemFAQPrimary;
