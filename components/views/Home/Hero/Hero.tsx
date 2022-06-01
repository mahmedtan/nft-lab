import Container from "@/modules/Container/Container";
import SocialButton from "@/modules/SocialButton/SocialButton";
import { motion, useTransform, useViewportScroll } from "framer-motion";
import { useEffect, useRef } from "react";
import { FaDiscord, FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
import { FiArrowRight } from "react-icons/fi";
import theme from "theme";

const Hero = () => {
  const videoRef: any = useRef(null);
  const { scrollYProgress, scrollY } = useViewportScroll();

  const opacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);

  useEffect(() => {
    setTimeout(() => {
      videoRef.current!.play();
    }, 2000);
  }, []);

  return (
    <motion.div
      className="bg-heroBg  relative sm:h-[90vh] py-4 sm:py-0 bg-welcome max-h-[50rem] "
      style={{ opacity: opacity }}
    >
      <div className="xl:flex flex-col gap-6  absolute right-6 h-full justify-center  hidden">
        <SocialButton href={theme.links.discord}>
          <FaDiscord className="text-xl" />
        </SocialButton>

        <SocialButton href={theme.links.twitter}>
          <FaTwitter className="text-xl" />
        </SocialButton>
      </div>

      <Container className="h-full ">
        <div className="py-10 md:py-16 lg:py-24 items-center gap-8 md:gap-12 flex lg:flex-row flex-col relative h-full">
          <motion.div
            className="sm:h-full sm:w-auto   w-full aspect-square relative order-2 lg:order-1  shadow-2xl border border-slate-200/20 rounded-3xl overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <video
              src="https://genesis-plots.s3.us-east-1.amazonaws.com/welcome-section/welcome-section-video.mp4"
              className="h-full w-full object-cover"
              ref={videoRef}
              muted
              playsInline={true}
            />
          </motion.div>
          <motion.div
            className="flex flex-col flex-grow  items-center justify-center order-2  lg:order-1 text-heroFont"
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
          >
            <div className="max-w-md flex flex-col gap-8 items-center lg:items-start">
              <h1 className="font-semibold uppercase text-4xl md:text-5xl  text-center lg:text-left">
                Genesis Plots{" "}
              </h1>
              <div className="text-xl lg:text-2xl text-center lg:text-left font-light">
                Building real wealth with virtual assets.
              </div>

              <a
                href="https://genesis-plots.s3.amazonaws.com/genesis-plots-whitepaper.pdf"
                target={"_blank"}
              >
                <button className="btn-contained text-xl flex items-center gap-2   pr-4 pl-6 py-3 w-max bg-gradient-to-r transition-all duration-350 ease-in-out from-primaryLight to-primaryDark rounded-sm hover:ring-2 ring-primaryLight ring-offset-4 ring-offset-heroBg">
                  Whitepaper <FiArrowRight />
                </button>
              </a>
            </div>
          </motion.div>
        </div>
      </Container>
    </motion.div>
  );
};

export default Hero;
