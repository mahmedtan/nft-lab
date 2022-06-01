import Container from "@/modules/Container/Container";
import H2 from "@/modules/Heading/H2";
import { DataContext } from "context/DataWrapper";
import Image from "next/image";
import { useContext } from "react";

const AboutPrimary = () => {
  const { data } = useContext(DataContext);

  if (!data) return null;

  const nfts = data?.nfts;

  return (
    <div className="bg-aboutBg" id="about">
      <Container>
        <div className="flex flex-col py-10 md:py-16 lg:py-20 lg:pb-28 justify-center items-center gap-8 md:gap-12 lg:gap-16 text-aboutFont">
          <H2>About</H2>

          <div className="w-full  flex flex-col lg:flex-row gap-8 md:gap-12 lg:gap-16  justify-around items-center">
            <div className="flex flex-col items-center justify-center max-w-xl order-2 lg:order-1">
              <div className="text-xl md:text-xl lg:text-2xl  text-justify lg:text-left font-light ">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Asperiores explicabo ipsa non rem tempore repellendus soluta
                quas ex, aliquid aspernatur, nemo doloremque? Delectus sit,
                voluptatum, molestias sapiente aliquid et consequuntur repellat
                natus doloremque magni hic ut ducimus, atque cumque voluptate
                aut voluptas maxime ex. Nisi consectetur cupiditate debitis
                autem quam?
              </div>
            </div>

            <div className="relative z-20  w-64 h-64 order-1 lg:order-2 md:w-80 md:h-80 xl:h-96 xl:w-96 rounded-lg overflow-hidden shadow-2xl">
              <Image
                layout="fill"
                placeholder="blur"
                blurDataURL={nfts[0].image}
                objectFit="cover"
                src={nfts[0].image}
              />
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default AboutPrimary;
