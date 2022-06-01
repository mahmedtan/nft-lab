import GradientButton from "@/modules/Button/GradientButton";
import LogoButton from "@/modules/LogoButton/LogoButton";
import { SessionContext } from "context/SessionWrapper";
import { useContext } from "react";
import { supabase } from "utils/supabaseClient";

const HeaderAdmin = () => {
  const { setSession } = useContext(SessionContext);

  return (
    <div className="shadow-2xl w-full">
      <nav className="container mx-auto py-4 px-8 xl:px-12 flex justify-between items-center">
        <LogoButton />

        <div>
          <GradientButton
            onClick={async () => {
              await supabase.auth.signOut();
              setSession(null);
            }}
          >
            Log out
          </GradientButton>
        </div>
      </nav>
    </div>
  );
};

export default HeaderAdmin;
