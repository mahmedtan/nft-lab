import { SessionContext } from "context/SessionWrapper";
import { useRouter } from "next/router";
import { useContext, useEffect } from "react";

const withAuth = (BaseComponent: any) => {
  return (props: any) => {
    const router = useRouter();
    const { session } = useContext(SessionContext);

    useEffect(() => {
      if (!session) router.push("/login");
    }, [session]);

    if (!session) return null;
    else return <BaseComponent {...props} />;
  };
};

export default withAuth;
