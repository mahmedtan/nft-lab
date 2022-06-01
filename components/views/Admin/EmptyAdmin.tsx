import GradientButton from "@/modules/Button/GradientButton";
import Container from "@/modules/Container/Container";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface Props {}

const EmptyAdmin = (props: Props) => {
  return (
    <Container>
      <div className="pt-12 pb-20 flex flex-col items-center justify-center">
        <div className="relative w-48 h-48 sm:w-60 sm:h-60">
          <Image
            layout="fill"
            objectFit="contain"
            src={"/assets/images/collection.svg"}
          />
        </div>

        <div className="flex flex-col gap-4 items-center">
          <h2 className="text-4xl font-semibold">Welcome</h2>
          <h3 className="text-xl text-center">
            Create a collection and add your nfts for sale
          </h3>
          <p className="max-w-md text-center text-gray-400">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. A ut
            suscipit minus officia, alias minima est qui natus. Distinctio harum
            sint omnis voluptates commodi id impedit quibusdam tenetur odio
            autem.
          </p>
          <div className="py-2">
            <Link href="/admin/create">
              <a>
                <GradientButton>Create Collection</GradientButton>
              </a>
            </Link>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default EmptyAdmin;
