import Container from "@/modules/Container";
import Image from "next/image";
import { aboutImageUrls } from "content/about";
import InputCTA from "./InputCTA";
import MailchimpSubscribe from "react-mailchimp-subscribe";

const CTA = () => {
  const url =
    "https://genesisplots.us8.list-manage.com/subscribe/post?u=aaf61a8533542b45a019e981d&id=46b743ce55";

  return (
    <div className="mb-20">
      <Container>
        <div className="flex flex-col lg:flex-row  max-w-5xl mx-auto  rounded-2xl bg-gradient-to-br from-background to-[#563d5955] overflow-hidden">
          <div className="w-full h-36 lg:h-auto lg:w-1/2 relative">
            <Image src={aboutImageUrls[2]} layout="fill" objectFit="cover" />
          </div>
          <div className="w-full lg:w-1/2 px-6 py-8 sm:p-12 flex flex-col gap-8">
            <h2 className="text-2xl sm:text-3xl font-semibold">
              Sign Up for Latest Updates
            </h2>

            <MailchimpSubscribe
              url={url}
              render={({ subscribe, status, message }) => (
                <form
                  className="flex flex-col gap-8 "
                  onSubmit={(e: any) => {
                    e.preventDefault();

                    e.target.emailAddress.value &&
                      e.target.firstName.value &&
                      e.target.lastName.value &&
                      (subscribe as any)({
                        EMAIL: e.target.emailAddress.value,
                        MERGE1: e.target.firstName.value,
                        MERGE2: e.target.lastName.value,
                      });

                    (e.target as HTMLFormElement).reset();
                  }}
                >
                  <InputCTA
                    name="firstName"
                    label="First Name"
                    type="text"
                    placeholder=""
                  />
                  <InputCTA
                    name="lastName"
                    label="Last Name"
                    type="text"
                    placeholder=""
                  />
                  <InputCTA
                    name="emailAddress"
                    label="Email Address"
                    type="email"
                    placeholder=""
                  />
                  <button
                    className="py-2.5 bg-primaryLight rounded-lg hover:brightness-90 text-xl  flex justify-center"
                    type="submit"
                  >
                    Subscribe
                  </button>
                  <div className="text-2xl capitalize">{status}</div>
                  {status === "error" && (message as string).substring(4)}
                </form>
              )}
            />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default CTA;
