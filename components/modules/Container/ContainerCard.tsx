import { ReactNode } from "react";
import LogoButton from "../LogoButton/LogoButton";
import Container from "./Container";

const ContainerCard = ({
  children,
  href,
}: {
  children: ReactNode;
  href?: string;
}) => {
  return (
    <div className="bg-background w-full min-h-screen">
      <Container>
        <div className="w-full   py-4 flex flex-col justify-center items-center min-h-screen relative ">
          <div className="absolute top-10 left-0">
            <LogoButton href={href} />
          </div>
          {children}
        </div>
      </Container>
    </div>
  );
};

export default ContainerCard;
