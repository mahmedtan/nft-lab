import { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type Props = {};

const NotFoundPage: NextPage = (props: Props) => {
  return (
    <div className="text-white px-16 h-screen justify-center flex flex-col items-center gap-16">
      <div className="relative w-full h-64">
        <Image
          src="https://genesis-plots.s3.amazonaws.com/error.svg"
          layout="fill"
        />
      </div>
      <Link href="/">
        <a>
          <button className="btn-outlined btn-large">Go To Home</button>
        </a>
      </Link>
    </div>
  );
};

export default NotFoundPage;
