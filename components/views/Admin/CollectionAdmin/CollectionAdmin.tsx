import Container from "@/modules/Container/Container";
import Image from "next/image";
import NFTsAdmin from "./NFTsAdmin/NFTsAdmin";

export const CollectionAdmin = ({
  data: {
    collection: { title, description, image },
    ...data
  },
}: any) => {
  return (
    <div className="py-8 sm:pt-16 pb-20">
      <Container>
        <div className="w-full bg-foreground  py-12 sm:py-16 px-6 sm:px-16 flex flex-col gap-10 sm:gap-12  rounded-md items-center">
          <div className="relative h-32 w-32 rounded-full overflow-hidden border border-primaryLight">
            <Image
              src={image}
              layout="fill"
              objectFit="cover"
              placeholder="blur"
              blurDataURL={image}
            />
          </div>

          <div className="flex flex-col gap-4 text-center">
            <h2 className="text-3xl sm:text-4xl xl:5xl  2xl:text-6xl font-semibold ">
              {title}
            </h2>
            <h2 className="text-lg  sm:text-xl opacity-70 ">{description}</h2>
          </div>

          <NFTsAdmin data={data} />
        </div>
      </Container>
    </div>
  );
};
