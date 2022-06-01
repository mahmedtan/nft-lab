import { ReactNode } from "react";

interface Props {
  id: string;
  children: ReactNode;
}

const Label = ({ id, children }: Props) => {
  return (
    <label htmlFor={id} className="uppercase">
      {children}
    </label>
  );
};

export default Label;
