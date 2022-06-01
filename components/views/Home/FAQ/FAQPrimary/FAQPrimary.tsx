import Container from "@/modules/Container/Container";
import H2 from "@/modules/Heading/H2";
import ItemFAQPrimary from "./ItemFAQPrimary";

interface Props {}

const FAQPrimary = (props: Props) => {
  return (
    <div className="bg-faqBg" id="faq">
      <Container>
        <div className="flex flex-col  py-10 md:py-16 lg:py-20 gap-8 md:gap-12 lg:gap-16 justify-center items-center text-faqFont">
          <H2>FAQ</H2>

          <div className="flex flex-col gap-8 w-full items-center">
            <ItemFAQPrimary />
            <ItemFAQPrimary />
            <ItemFAQPrimary />
            <ItemFAQPrimary />
            <ItemFAQPrimary />
            <ItemFAQPrimary />
            <ItemFAQPrimary />
            <ItemFAQPrimary />
            <ItemFAQPrimary />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default FAQPrimary;
