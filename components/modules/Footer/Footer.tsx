import Link from "next/link";
import SocialButton from "../SocialButton/SocialButton";
import { FaDiscord, FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
import theme from "theme";
import { logoSecondaryUrl } from "content/logo";
import Image from "next/image";

const Footer = () => {
  return (
    <div className=" px-8  xl:px-12 container mx-auto">
      <div className="w-full h-px bg-primaryLight"></div>
      <div className="flex flex-col md:flex-row py-8 justify-between gap-8">
        <div className="flex flex-col gap-4 items-center md:items-start">
          <Link href="/">
            <a>
              <div className="relative w-44 h-20 ">
                <Image
                  src={logoSecondaryUrl}
                  layout="fill"
                  objectFit="contain"
                />
              </div>
            </a>
          </Link>
          <div className="text-center md:text-left">
            Building real wealth with virtual assets.
          </div>
        </div>

        <div className="flex flex-col gap-4 justify-between items-center md:items-end ">
          <div className="flex gap-3 justify-end">
            <SocialButton href={theme.links.discord}>
              <FaDiscord className="text-xl" />
            </SocialButton>

            <SocialButton href={theme.links.twitter}>
              <FaTwitter className="text-xl" />
            </SocialButton>
          </div>
          <div>
            © {new Date().getFullYear()} Genesis Plots, All Rights Reserved
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
