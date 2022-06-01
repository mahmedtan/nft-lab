import Link from "next/link";

interface Props {
  href?: string;
}

const LogoButton = ({ href }: Props) => {
  return href ? (
    <Link href={href}>
      <a>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl text-red-400 font-semibold">
          Project Name
        </h2>
      </a>
    </Link>
  ) : (
    <h2 className="text-3xl sm:text-4xl lg:text-5xl text-red-400 font-semibold">
      Project Name
    </h2>
  );
};

export default LogoButton;
