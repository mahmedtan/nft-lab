import clsx from "clsx";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import { useState } from "react";
import { FiMinus, FiMoreHorizontal, FiPlus } from "react-icons/fi";

interface IItemFAQSecondaryProps {
  question: string;
  answer: string[];
}

const ItemFAQSecondary = ({ question, answer }: IItemFAQSecondaryProps) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      initial={{ x: -100, opacity: 0 }}
      whileInView={{
        x: 0,
        opacity: 1,
        transition: { duration: 0.5, delay: 0.5 },
      }}
      className={clsx(
        "col-span-2  p-6 rounded-md flex cursor-pointer  select-none justify-between h-min transition-all duration-500",
        expanded ? "bg-primaryLight" : "bg-foreground"
      )}
      onClick={() => setExpanded(!expanded)}
      viewport={{ once: true }}
    >
      <motion.div className="flex flex-col gap-2">
        <motion.div className="w-full">
          <motion.h4 className="text-xl sm:text-2xl font-light">
            {question}
          </motion.h4>
        </motion.div>

        <AnimatePresence exitBeforeEnter>
          {expanded && (
            <motion.ul
              className="text-lg list-disc list-inside"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0, transition: { duration: 0.5 } }}
              exit={{ opacity: 0, y: -10, transition: { duration: 0.3 } }}
            >
              {answer.map((txt, i) => (
                <motion.li key={i} dangerouslySetInnerHTML={{ __html: txt }} />
              ))}
            </motion.ul>
          )}
        </AnimatePresence>
      </motion.div>

      <motion.div className="text-xl text-primaryLight self-center">
        {expanded ? <FiMinus className="text-white" /> : <FiPlus />}
      </motion.div>
    </motion.div>
  );
};

export default ItemFAQSecondary;
