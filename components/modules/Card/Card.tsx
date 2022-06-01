import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const Card = ({ children }: Props) => {
  return (
    <div className="bg-foreground p-5 py-10 sm:p-20 w-full max-w-xl text-font flex flex-col items-center sm:gap-8 rounded-md">
      {children}
    </div>
  );
};

export default Card;
