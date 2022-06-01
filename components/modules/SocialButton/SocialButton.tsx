import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  href: string;
}

const SocialButton = ({ children, href }: Props) => {
  return (
    <a href={href} target="_blank">
      <div className="bg-primaryLight p-2 rounded-full hover:bg-primaryDark cursor-pointer transition-all duration-200">
        {children}
      </div>
    </a>
  );
};

export default SocialButton;
