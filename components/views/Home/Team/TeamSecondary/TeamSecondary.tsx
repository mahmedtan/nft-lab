import Container from "@/modules/Container/Container";
import H2 from "@/modules/Heading/H2";
import ItemTeamSecondary from "./ItemTeamSecondary";

interface Props {}

const TeamSecondary = (props: Props) => {
  return (
    <div className="bg-teamBg" id="team">
      <Container>
        <div className="flex flex-col  py-10 md:py-16 lg:py-20 gap-8 md:gap-12 lg:gap-16 justify-center items-center text-teamFont">
          <H2>Team</H2>

          <div className="grid w-full grid-cols-1 md:grid-cols-2 lg:grid-cols-3  grid-flow-row gap-8 md:gap-16  max-w-7xl ">
            <ItemTeamSecondary />
            <ItemTeamSecondary />
            <ItemTeamSecondary />
            <ItemTeamSecondary />
            <ItemTeamSecondary />
            <ItemTeamSecondary />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default TeamSecondary;
