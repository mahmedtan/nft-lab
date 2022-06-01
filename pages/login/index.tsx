import ContainerCard from "@/modules/Container/ContainerCard";
import Login from "@/views/Login/Login";
import { SessionContext } from "context/SessionWrapper";
import { useRouter } from "next/router";
import { useContext } from "react";

const LoginPage = () => {
  const router = useRouter();

  const { session } = useContext(SessionContext);

  if (session) router.push("/admin");

  return (
    <ContainerCard>
      <Login />
    </ContainerCard>
  );
};

export default LoginPage;
