import clsx from "clsx";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  className?: string;
}

const Container = ({ children, className }: Props) => {
  return (
    <div className={clsx("px-10 xl:px-12 container mx-auto ", className)}>
      {children}
    </div>
  );
};

export default Container;
