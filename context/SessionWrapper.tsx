import { Session } from "@supabase/supabase-js";
import { createContext, ReactNode } from "react";

export const SessionContext = createContext<{
  session: Session | null | undefined;
  setSession: (session: Session | null | undefined) => void;
}>({ session: undefined, setSession: () => {} });

interface Props {
  children: ReactNode;
  sessionHook: {
    session: Session | null | undefined;
    setSession: (session: Session | null | undefined) => void;
  };
}

const SessionWrapper = ({ children, sessionHook }: Props) => {
  return (
    <SessionContext.Provider value={sessionHook}>
      {children}
    </SessionContext.Provider>
  );
};

export default SessionWrapper;
