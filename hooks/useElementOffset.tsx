import { useTransform, useViewportScroll } from "framer-motion";
import { RefObject } from "react";

type Props = RefObject<HTMLDivElement>;

const useElementOffset = (ref: Props) => {
  const { scrollY } = useViewportScroll();

  const elementOffset = useTransform(scrollY, (y) => {
    if (ref.current) {
      const offset = ref.current.offsetTop - y;

      console.log(ref.current.offsetHeight, y);

      return offset;
    }
  });

  return elementOffset;
};

export default useElementOffset;
