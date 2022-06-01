import Container from "@/modules/Container/Container";
import H2 from "@/modules/Heading/H2";
import { aboutImageUrls } from "content/about";
import { DataContext } from "context/DataWrapper";
import { motion, useTransform, useViewportScroll } from "framer-motion";
import Image from "next/image";
import { useContext, useRef } from "react";
import { logoSecondaryUrl } from "content/logo";

const AboutSecondary = () => {
  const { data } = useContext(DataContext);
  const ref: any = useRef(null);
  const { scrollY } = useViewportScroll();
  const elementOffset = useTransform(scrollY, (y) => {
    const offset = y / ref.current?.offsetTop;

    return offset >= 1 ? 1 : offset;
  });

  const approachingDistance = useTransform(elementOffset, (offset) => {
    return -(1 - offset) * 20;
  });

  if (!data) return null;

  return (
    <motion.div
      className="bg-about"
      ref={ref}
      id="about"
      initial={{ opacity: 0 }}
      style={{ opacity: elementOffset }}
      transition={{ duration: 2 }}
    >
      <Container>
        <div className="flex flex-col py-10 md:py-16 lg:py-20 lg:pb-10 justify-center items-center gap-8 md:gap-12 lg:gap-16 text-aboutFont">
          <H2>About</H2>

          <div className="w-full  flex flex-col  xl:flex-row gap-8 md:gap-12 lg:gap-16  justify-around items-center">
            <motion.div
              className="flex flex-col items-center justify-center w-full order-2 xl:order-1"
              style={{ x: approachingDistance, opacity: elementOffset }}
              transition={{ duration: 2 }}
              viewport={{ once: true }}
            >
              <div className="text-lg lg:text-2xl font-light text-left">
                The metaverse is the successor of the internet, otherwise known
                as web 3.0. It's where we will work, play, connect, learn, and
                more. It marks the transition from the World Wide Web, to an
                Inclusive Social Web enabled by blockchain technology. <br />
                <br /> One can imagine it as a virtual universe, home to many
                different worlds, most notably Sandbox, Decentraland, Somnium
                Space and many more. With the constant advancement of blockchain
                technology and user experience we will be able to embrace the
                full potential and immerse ourselves into all the possibilities
                that come with the metaverse. What already seems to be clear,
                however, is that real estate, like in the real world, will be
                one of the prime industries in the metaverse, enabling wealth
                creation. <br /> <br /> The question is, where to invest?
              </div>
            </motion.div>

            <div className="grid grid-cols-12 grid-rows-6 w-full gap-5 sm:gap-8 order-1 xl:order-2 h-[27rem] sm:h-[35rem] max-w-sm sm:max-w-lg relative">
              <motion.div className="flip-card col-span-6 row-span-3 row-start-1 w-full mx-auto">
                <motion.div
                  className="flip-card-inner"
                  whileInView={{
                    transform: "rotateY(180deg)",
                    transition: { delay: 0.2 },
                  }}
                  viewport={{ margin: "-300px 0px 0px 0px" }}
                >
                  <motion.div
                    className="w-full  mx-auto  rounded-lg  bg-foreground flex flex-col items-center gap-3 sm:gap-4 flip-card-back drop-shadow-about"
                    style={{ opacity: elementOffset }}
                  >
                    <div className="relative w-full h-full rounded-lg overflow-hidden">
                      <Image
                        placeholder="blur"
                        src={aboutImageUrls[0]}
                        blurDataURL={aboutImageUrls[0]}
                        layout="fill"
                        objectFit="cover"
                      />
                    </div>
                  </motion.div>
                  <motion.div className="w-full  mx-auto  rounded-lg  bg-gradient-to-br from-foreground to-foregroundLight flex flex-col items-center gap-3 p-6 sm:gap-4 flip-card-front    shadow-2xl shadow-violet-200/5 ">
                    <div className="relative w-full h-full rounded-lg overflow-hidden ">
                      <Image
                        placeholder="blur"
                        src={logoSecondaryUrl}
                        blurDataURL={logoSecondaryUrl}
                        layout="fill"
                        objectFit="contain"
                      />
                    </div>
                  </motion.div>
                </motion.div>
              </motion.div>

              {aboutImageUrls && (
                <div className="flip-card col-span-6 row-span-3 row-start-2 w-full mx-auto  ">
                  <motion.div
                    className="flip-card-inner"
                    whileInView={{
                      transform: "rotateY(180deg)",
                      transition: { delay: 0.4 },
                    }}
                    viewport={{ margin: "-300px 0px 0px 0px" }}
                  >
                    <div className=" w-full rounded-lg  bg-foreground flex flex-col items-center gap-3 sm:gap-4 flip-card-back  drop-shadow-about">
                      <div className="relative w-full h-full rounded-lg overflow-hidden ">
                        <Image
                          placeholder="blur"
                          src={aboutImageUrls[1]}
                          blurDataURL={aboutImageUrls[1]}
                          layout="fill"
                          objectFit="cover"
                        />
                      </div>
                    </div>
                    <motion.div className="w-full  mx-auto  rounded-lg  bg-gradient-to-br from-foreground to-foregroundLight flex flex-col items-center gap-3 p-6 sm:gap-4 flip-card-front    shadow-2xl shadow-violet-200/5 ">
                      <div className="relative w-full h-full rounded-lg overflow-hidden ">
                        <Image
                          placeholder="blur"
                          src={logoSecondaryUrl}
                          blurDataURL={logoSecondaryUrl}
                          layout="fill"
                          objectFit="contain"
                        />
                      </div>
                    </motion.div>
                  </motion.div>
                </div>
              )}

              {aboutImageUrls && (
                <div className="flip-card col-span-6 row-span-3  w-full mx-auto  ">
                  <motion.div
                    className="flip-card-inner"
                    whileInView={{
                      transform: "rotateY(180deg)",
                      transition: { delay: 0.8 },
                    }}
                    viewport={{ margin: "-300px 0px 0px 0px" }}
                  >
                    <motion.div className="w-full  mx-auto  rounded-lg   flex flex-col items-center gap-3 sm:gap-4 flip-card-back drop-shadow-about">
                      <div className="relative w-full h-full  rounded-lg overflow-hidden">
                        <Image
                          placeholder="blur"
                          src={aboutImageUrls[2]}
                          blurDataURL={aboutImageUrls[2]}
                          layout="fill"
                          objectFit="cover"
                        />
                      </div>
                    </motion.div>
                    <motion.div className="w-full  mx-auto  rounded-lg  bg-gradient-to-br from-foreground to-foregroundLight flex flex-col items-center gap-3 p-6 sm:gap-4 flip-card-front    shadow-2xl shadow-violet-200/5 ">
                      <div className="relative w-full h-full rounded-lg overflow-hidden ">
                        <Image
                          placeholder="blur"
                          src={logoSecondaryUrl}
                          blurDataURL={logoSecondaryUrl}
                          layout="fill"
                          objectFit="contain"
                        />
                      </div>
                    </motion.div>
                  </motion.div>
                </div>
              )}
            </div>
          </div>

          <div className="w-full  flex flex-col  xl:flex-row gap-8 md:gap-12 lg:gap-16  justify-around ">
            <div className="grid grid-cols-12  w-full gap-5 sm:gap-10 order-2 xl:order-1  max-w-sm sm:max-w-xl relative">
              <h2 className="text-2xl lg:text-3xl col-span-full text-indigo-400 uppercase">
                Supported MetaVerse Platforms
              </h2>

              <div className="col-span-6 relative h-28">
                <Image
                  src={
                    "https://genesis-plots.s3.amazonaws.com/platform-logos/platform-1.jpeg"
                  }
                  layout="fill"
                  objectFit="contain"
                />
              </div>

              <div className="col-span-6 relative h-28 ">
                <Image
                  src={
                    "https://genesis-plots.s3.amazonaws.com/platform-logos/platform-2.png"
                  }
                  layout="fill"
                  objectFit="contain"
                />
              </div>

              <div className="col-span-6 relative h-28">
                <Image
                  src={
                    "https://genesis-plots.s3.amazonaws.com/platform-logos/platform-3.png"
                  }
                  layout="fill"
                  objectFit="contain"
                />
              </div>

              <div className="col-span-6 relative h-28 ">
                <Image
                  src={
                    "https://genesis-plots.s3.amazonaws.com/platform-logos/platform-5.png"
                  }
                  layout="fill"
                  objectFit="contain"
                />
              </div>

              <div className="col-span-6 relative h-28">
                <Image
                  src={
                    "https://genesis-plots.s3.amazonaws.com/platform-logos/platform-6.png"
                  }
                  layout="fill"
                  objectFit="contain"
                />
              </div>
              <div className="col-span-6 relative h-28">
                <Image
                  src={
                    "https://genesis-plots.s3.amazonaws.com/platform-logos/platform-4.png"
                  }
                  layout="fill"
                  objectFit="contain"
                />
              </div>
            </div>

            <motion.div
              className="flex flex-col items-center justify-center w-full order-1 xl:order-2 h-full"
              style={{ x: approachingDistance, opacity: elementOffset }}
              transition={{ duration: 2 }}
              viewport={{ once: true }}
            >
              <div className="text-lg lg:text-2xl font-light  text-left flex flex-col gap-6">
                We make it simple for you. We carefully invest across various
                metaverse worlds after thorough analyses with regards to
                location and business model, such as value gain, development,
                rental income. This enables us to establish a diversified
                digital real estate portfolio while generating sustainable
                yields.
                <h2 className="text-2xl text-indigo-400 font-medium ">
                  Genesis Benefits
                </h2>
                <ul className="list-disc list-inside">
                  <li>
                    Diversified metaverse real estate portfolio § Quarterly
                    dividends
                  </li>
                  <li>DAO voting</li>
                  <li>Private ownership: Metaverse residential unit</li>
                  <li>Community events</li>
                  <li>Community giveaways</li>
                </ul>
                Together we are building real wealth with virtual assets. Join
                us now!
              </div>
            </motion.div>
          </div>
        </div>
      </Container>
    </motion.div>
  );
};

export default AboutSecondary;
