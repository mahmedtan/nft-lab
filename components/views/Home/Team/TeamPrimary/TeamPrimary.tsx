import Container from "@/modules/Container/Container";
import H2 from "@/modules/Heading/H2";
import team from "content/team";
import ItemTeamPrimary from "./ItemTeamPrimary";
import SliderTeamPrimary from "./SliderTeamPrimary";

interface Props {}

const TeamPrimary = (props: Props) => {
  return (
    <div className="bg-teamBg" id="team">
      <Container>
        <div className="flex flex-col  py-10 md:py-16 lg:py-20 gap-8 md:gap-12 lg:gap-16 justify-center items-center text-teamFont">
          <H2>Team</H2>

          <div className="text-xl sm:text-xl text-left ">
            Since 2017 our team has been active in real estate and tech
            development, growing a large strategic partner network of tech
            developers, brand partners and investors. In 2017, we founded{" "}
            <a
              href="https://www.myride.city"
              className="text-primaryLight brightness-150"
              target="_blank"
            >
              {" "}
              MyRide
            </a>
            , a luxury on-demand chauffeur service for your car, operating via
            App in Vienna. <br /> <br /> In 2018, we founded our real estate
            agency{" "}
            <a
              href="https://www.boom-living.com"
              className="text-primaryLight brightness-150"
              target="_blank"
            >
              {" "}
              Boom Living{" "}
            </a>
            together with our investment partner{" "}
            <a
              href="https://www.pa-prinzhorn.com"
              className="text-primaryLight brightness-150"
              target="_blank"
            >
              {" "}
              P.A. Prinzhorn
            </a>
            .
            <br />
            <br />
            Since 2022, we have partnered with one of Austria’s largest real
            estate firms, and will be operating our brokerage services through
            their band{" "}
            <a
              href="https://www.immo-contract.com"
              className="text-primaryLight brightness-150"
              target="_blank"
            >
              {" "}
              IMMO-CONTRACT
            </a>
            . We are convinced that our experience in real estate, along with
            strong relationships with valuable partners such as large scale
            investors, visualization studios and architects enable us to
            capitalize successfully in the metaverse and together with you, our
            community, make strategic decisions which the project will benefit
            from.
          </div>

          <SliderTeamPrimary />

          <div className=" w-full grid-cols-1 md:grid-cols-2 lg:grid-cols-3  grid-flow-row gap-8 md:gap-12  max-w-3xl  hidden sm:grid">
            {team.map((member, index) => (
              <ItemTeamPrimary {...member} key={index} delay={index * 0.5} />
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default TeamPrimary;
