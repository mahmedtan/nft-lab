import Container from "@/modules/Container/Container";
import H2 from "@/modules/Heading/H2";
import faq from "content/faq";
import { LayoutGroup } from "framer-motion";
import ItemFAQSecondary from "./ItemFAQSecondary";

interface Props {}

const FAQSecondary = (props: Props) => {
  return (
    <div className="bg-faqBg" id="faq">
      <Container>
        <div className="flex flex-col  py-10 md:py-16 lg:py-20 gap-8 md:gap-12 lg:gap-16 justify-center items-center text-faqFont">
          <H2>FAQ</H2>

          <div className="grid lg:grid-cols-2 gap-4 w-full max-w-3xl ">
            {faq.map((item, i) => (
              <ItemFAQSecondary key={i} {...item} />
            ))}
          </div>

          {/* <H2>Steps to Mint an NFT</H2>

          <ol className="text-xl  flex-col gap-4 list-decimal max-w-3xl  px-6 hidden">
            <li>
              Ensure you have enough ETH. Not only for the token, but also for
              the gas fees. Gas fees are like transaction costs, and can
              fluctuate depending on the traffic on the ETH network.
            </li>
            <li>
              Make sure you have a web 3.0. Wallet. We do recommend Metamask.
              Little pro-tipp: DON’T ever forget, or share you seed phrase. Also
              you should use Google Chrome if using a laptop, or the Metamask
              app, if using your mobile device.
            </li>
            <li>
              You need to have your ETH on your Metamask, and not just you
              wallet. You will be paying, and holding the NFT in your Metamask.
            </li>
            <li>
              On minting day (stay tuned on Twitter, and Discord for the exact
              date and time) you will need to connect your Metamask to our
              website.
            </li>
            <li>
              Select the token you want (landlord, investor, or tycoon), and
              just click mint. A window will pop up in Metamask, where you need
              to accept the transaction.
            </li>
            <li>
              Done! You are a G now. Welcome to the club! (For further
              instructions follow this link to watch a video)
            </li>
          </ol> */}
        </div>
      </Container>
    </div>
  );
};

export default FAQSecondary;
