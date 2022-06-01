import Image from "next/image";

interface Props {}

const ItemTeamSecondary = (props: Props) => {
  return (
    <div className="w-full  max-w-sm mx-auto  rounded-lg  bg-foreground flex flex-col items-center p-5 gap-4">
      <div className="relative w-full h-72 rounded-lg overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1639158389106-ca1496a75d02?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80"
          blurDataURL="https://images.unsplash.com/photo-1639158389106-ca1496a75d02?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80"
          layout="fill"
          placeholder="blur"
          objectFit="cover"
        />
      </div>
      <div className="text-center flex flex-col gap-1">
        <h4 className="text-2xl text-gray-100">@github-username</h4>
        <h5 className="text-2xl text-primaryLight">POSITION</h5>
      </div>
    </div>
  );
};

export default ItemTeamSecondary;
