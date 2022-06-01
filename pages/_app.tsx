import "styles/globals.css";
import type { AppProps } from "next/app";
import { useEffect, useRef, useState } from "react";
import { supabase } from "utils/supabaseClient";
import SessionWrapper from "context/SessionWrapper";
import { Session } from "@supabase/supabase-js";
import DataWrapper from "context/DataWrapper";
import AddressWrapper from "context/AddressWrapper";
import WalletInfoWrapper from "context/WalletInfoWrapper";

function MyApp({ Component, pageProps }: AppProps & { Component: any }) {
  const [session, setSession] = useState<Session | null | undefined>(undefined);

  useEffect(() => {
    (async () => {
      const urlSession = await supabase.auth.getSessionFromUrl({
        storeSession: false,
      });
      if (!urlSession.data) {
        setSession(supabase.auth.session());
      }
    })();
  }, []);

  return (
    <SessionWrapper sessionHook={{ session, setSession }}>
      <DataWrapper>
        <AddressWrapper>
          <WalletInfoWrapper>
            <Component {...pageProps} />
          </WalletInfoWrapper>
        </AddressWrapper>
      </DataWrapper>
    </SessionWrapper>
  );
}

export default MyApp;
