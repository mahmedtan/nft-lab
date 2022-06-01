import { CollectionAdmin } from "@/views/Admin/CollectionAdmin/CollectionAdmin";
import EmptyAdmin from "@/views/Admin/EmptyAdmin";
import HeaderAdmin from "@/views/Admin/HeaderAdmin";
import withAuth from "components/hoc/withAuth";
import { SessionContext } from "context/SessionWrapper";
import { useContext, useEffect, useState } from "react";
import { FiLoader } from "react-icons/fi";
import { supabase } from "utils/supabaseClient";

const AdminPage = () => {
  const [data, setData] = useState<object | {} | undefined>(undefined);

  const { session } = useContext(SessionContext);

  useEffect(() => {
    let mounted = true;

    (async () => {
      try {
        if (session?.user) {
          const collectionResponse = await supabase
            .from("collection")
            .select("*")
            .eq("user_email", session.user.email);

          if (!collectionResponse?.data?.length) {
            mounted && setData({});
          } else {
            const nftResponse = await supabase
              .from("nft")
              .select("*")
              .eq("collection_id", collectionResponse.data?.[0]?.id);

            mounted &&
              setData(
                Boolean(collectionResponse.data?.length)
                  ? {
                      collection: collectionResponse.data?.[0],
                      nfts: nftResponse.data,
                    }
                  : {}
              );
          }
        }
      } catch (error) {
        console.log(error);
      }
    })();

    () => {
      mounted = false;
    };
  }, [session]);

  if (data === undefined)
    return (
      <div className="bg-background w-full h-screen text-font ">
        <HeaderAdmin />

        <div className="h-full flex  justify-center text-7xl p-32">
          <FiLoader className="text-primaryLight animate-spin" />
        </div>
      </div>
    );

  return (
    <div className="bg-background w-full min-h-screen text-font ">
      <HeaderAdmin />
      {Object.keys(data).length ? (
        <CollectionAdmin data={data} />
      ) : (
        <EmptyAdmin />
      )}
    </div>
  );
};

export default withAuth(AdminPage);
