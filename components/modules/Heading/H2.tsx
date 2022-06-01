import { ReactNode } from "react";

interface IH2 {
  children: ReactNode;
}

const H2 = ({ children }: IH2) => {
  return (
    <h2 className="text-3xl md:text-4xl lg:text-4xl font-normal  ">
      {children}
    </h2>
  );
};

export default H2;
