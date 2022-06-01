import { SessionContext } from "context/SessionWrapper";
import { useRouter } from "next/router";
import React, { useContext, useEffect } from "react";
import { getHashObject } from "utils/functions";
import { supabase } from "utils/supabaseClient";

type Props = {};

const RedirectPage = (props: Props) => {
  const router = useRouter();
  const { session } = useContext(SessionContext);

  useEffect(() => {
    (async () => {
      const hash = getHashObject(window.location.hash);

      console.log("hash", hash);

      if (hash?.type === "invite") {
        setTimeout(() => {
          router.push(`/confirm-signup?accessToken=${hash.access_token}`);
        }, 0);
      } else if (hash?.type === "recovery") {
        setTimeout(() => {
          router.push(`/reset-password?accessToken=${hash.access_token}`);
        }, 0);
      }
    })();
  }, []);

  return <div>Redirecting</div>;
};

export default RedirectPage;
