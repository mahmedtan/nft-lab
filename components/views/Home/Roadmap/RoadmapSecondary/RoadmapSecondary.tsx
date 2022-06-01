import Container from "@/modules/Container/Container";
import H2 from "@/modules/Heading/H2";
import ItemRoadmapSecondary from "./ItemRoadmapSecondary";
import { v4 } from "uuid";
import roadmap from "content/roadmap";

const RoadmapSecondary = () => {
  return (
    <div className="bg-roadmapBg" id="roadmap">
      <Container>
        <div className="flex flex-col  py-10 md:py-16 lg:py-20 gap-8 md:gap-12 lg:gap-16 justify-center items-center text-faqFont">
          <H2>Roadmap</H2>

          <div className="grid grid-cols-1 md:grid-cols-5 grid-flow-row w-full  max-w-3xl gap-x-2 gap-y-8 md:gap-y-0">
            {roadmap.map((item, i) => (
              <ItemRoadmapSecondary
                key={v4()}
                {...item}
                last={i === roadmap.length - 1}
              />
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default RoadmapSecondary;
