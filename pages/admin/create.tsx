import Container from "@/modules/Container/Container";
import ContainerCollectionForm from "@/views/Admin/Create/ContainerCollectionForm";
import HeaderAdmin from "@/views/Admin/HeaderAdmin";
import withAuth from "components/hoc/withAuth";
import { FiInfo } from "react-icons/fi";

const CreatePage = () => {
  return (
    <div className="bg-background w-full  text-font min-h-screen ">
      <HeaderAdmin />

      <div className="hidden lg:block">
        <ContainerCollectionForm />
      </div>
      <div className="lg:hidden">
        <Container>
          <div className=" h-full w-full text-2xl sm:text-3xl flex  flex-col items-center text-center gap-8 py-32">
            <FiInfo className="text-6xl" />
            <div className="">
              This form requires a larger viewport to work properly, Please
              access on laptop or a desktop device
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default withAuth(CreatePage);
