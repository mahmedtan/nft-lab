import GradientButton from "@/modules/Button/GradientButton";
import TextField from "@/modules/Form/TextField";
import { useForm } from "react-hook-form";
import { PROCESS_STATE } from "utils/types";
import * as yup from "yup";
import YupPassword from "yup-password";
import { yupResolver } from "@hookform/resolvers/yup";
import { useContext, useState } from "react";
import { supabase } from "utils/supabaseClient";
import { useRouter } from "next/router";
import Link from "next/link";
import Card from "@/modules/Card/Card";
import { SessionContext } from "context/SessionWrapper";
YupPassword(yup);

interface Props {}

const Login = (props: Props) => {
  const [processState, setProcessState] = useState<PROCESS_STATE>(
    PROCESS_STATE.IDLE
  );

  const { setSession } = useContext(SessionContext);
  interface FormValues {
    password: string;
    email: string;
  }

  const schema = yup
    .object()
    .shape({
      email: yup.string().email("Email address is not valid").required(),
      password: yup
        .string()
        .min(8, "Password must be at least 8 characters long")
        .required(),
    })
    .required();
  const [loginError, setLoginError] = useState<string | null>(null);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
  });

  const handleLogin = async ({ email, password }: FormValues) => {
    try {
      setProcessState(PROCESS_STATE.IN_PROGRESS);
      const response = await supabase.auth.signIn({ email, password });

      setProcessState(PROCESS_STATE.IDLE);
      if (response.error) {
        setLoginError(response.error.message);

        reset();
      } else {
        setSession(response.session);
        router.push("/admin");
      }
    } catch (error: any) {
      setProcessState(PROCESS_STATE.IDLE);
      setLoginError("Something went wrong!");
    }
  };

  const errorMessage = Object.values(errors).map(({ message }) => message)[0];

  return (
    <form
      onSubmit={handleSubmit(handleLogin)}
      className="w-full flex flex-col items-center"
    >
      <Card>
        <h2 className="text-3xl sm:text-4xl font-medium">Login</h2>
        <div className="w-full max-w-sm flex flex-col gap-4 sm:gap-8">
          <TextField
            name="email"
            label="Email"
            type="email"
            placeholder="Enter email"
            register={register}
          />

          <div className="flex flex-col gap-2">
            <TextField
              name="password"
              label="Password"
              type="password"
              placeholder="Enter Password"
              register={register}
            />
            <div className="self-end">
              <Link href="/login/forgot-password">
                <a className="text-primaryLight font-medium">Forgot Password</a>
              </Link>
            </div>
          </div>

          <GradientButton disabled={processState === PROCESS_STATE.IN_PROGRESS}>
            Login
          </GradientButton>

          {(errorMessage || loginError) && (
            <h3 className="text-lg font-medium">
              {errorMessage || loginError}
            </h3>
          )}
        </div>
      </Card>
    </form>
  );
};

export default Login;
