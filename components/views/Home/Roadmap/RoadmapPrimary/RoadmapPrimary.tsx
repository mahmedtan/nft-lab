import Container from "@/modules/Container/Container";
import H2 from "@/modules/Heading/H2";
import ItemRoadmapPrimary from "./ItemRoadmapPrimary";
import { v4 } from "uuid";
import roadmap from "content/roadmap";

const RoadmapPrimary = () => {
  return (
    <div className="bg-roadmapBg" id="roadmap">
      <Container>
        <div className="flex flex-col  py-10 md:py-16 lg:py-20 gap-8 md:gap-12 lg:gap-16 justify-center items-center text-faqFont">
          <H2>Roadmap</H2>

          <div className="grid grid-cols-1 sm:grid-cols-5 grid-flow-row w-full  ">
            {roadmap.map((item) => (
              <ItemRoadmapPrimary key={v4()} {...item} />
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default RoadmapPrimary;
