import Layout from "@/modules/Layout/Layout";
import AboutPrimary from "@/views/Home/About/AboutPrimary";
import AboutSecondary from "@/views/Home/About/AboutSecondary";
import CollectionPrimary from "@/views/Home/Collection/CollectionPrimary";
import CTA from "@/views/Home/CTA/CTA";
import FAQPrimary from "@/views/Home/FAQ/FAQPrimary/FAQPrimary";
import FAQSecondary from "@/views/Home/FAQ/FAQSecondary/FAQSecondary";
import Hero from "@/views/Home/Hero/Hero";
import RoadmapPrimary from "@/views/Home/Roadmap/RoadmapPrimary/RoadmapPrimary";
import RoadmapSecondary from "@/views/Home/Roadmap/RoadmapSecondary/RoadmapSecondary";
import TeamPrimary from "@/views/Home/Team/TeamPrimary/TeamPrimary";
import TeamSecondary from "@/views/Home/Team/TeamSecondary/TeamSecondary";
import { PostgrestResponse } from "@supabase/supabase-js";
import { DataContext } from "context/DataWrapper";
import { GetStaticProps } from "next";
import Head from "next/head";
import { useContext, useEffect } from "react";
import theme from "theme";
import { supabase } from "utils/supabaseClient";
import { Data, Variant } from "utils/types";
declare let window: any;

const HomePage = (data: Data) => {
  const { setData } = useContext(DataContext);

  useEffect(() => {
    data && setData(data);
  }, [data]);

  if (!data) return null;

  return (
    <div>
      <Head>
        <title>Genesis Plots</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        {theme.variants.hero === Variant.PRIMARY ? <Hero /> : ""}

        {theme.variants.about === Variant.PRIMARY ? (
          <AboutPrimary />
        ) : (
          <AboutSecondary />
        )}

        {theme.variants.collection === Variant.PRIMARY ? (
          <CollectionPrimary />
        ) : (
          ""
        )}

        {theme.variants.roadmap === Variant.PRIMARY ? (
          <RoadmapPrimary />
        ) : (
          <RoadmapSecondary />
        )}

        {theme.variants.faq === Variant.PRIMARY ? (
          <FAQPrimary />
        ) : (
          <FAQSecondary />
        )}

        {theme.variants.team === Variant.PRIMARY ? (
          <TeamPrimary />
        ) : (
          <TeamSecondary />
        )}

        <CTA />
      </Layout>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const collectionResponse: PostgrestResponse<any> = await supabase

    .from("collection")
    .select("*");

  if (collectionResponse.error) {
    return {
      redirect: {
        destination: "/internal-server-error",
        permanent: false,
      },
    };
  }

  if (!collectionResponse.data?.[0])
    return {
      redirect: { destination: "/admin", permanent: false },
    };

  const nftResponse = await supabase
    .from("nft")
    .select("*")
    .eq("collection_id", collectionResponse.data?.[0].id);

  if (nftResponse.error) {
    return {
      redirect: {
        destination: "/internal-server-error",
        permanent: false,
      },
    };
  }

  if (!nftResponse.data?.[0])
    return {
      redirect: { destination: "/admin", permanent: false },
    };

  return {
    props: { collection: collectionResponse.data?.[0], nfts: nftResponse.data },
    revalidate: 10,
  };
};
export default HomePage;
