import GradientButton from "@/modules/Button/GradientButton";
import TextField from "@/modules/Form/TextField";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { supabase } from "utils/supabaseClient";
import * as yup from "yup";
import YupPassword from "yup-password";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/router";
import { PROCESS_STATE } from "utils/types";
import { FiCheck } from "react-icons/fi";
import Link from "next/link";
import ContainerCard from "@/modules/Container/ContainerCard";
import Card from "@/modules/Card/Card";

YupPassword(yup);

interface Props {}

const ConfirmSignupPage = (props: Props) => {
  interface FormValues {
    newPassword: string;
    confirmPassword: string;
  }
  const schema = yup.object().shape({
    newPassword: yup
      .string()
      .password()
      .min(8, "Password must be at least 8 characters long")
      .minLowercase(0)
      .minSymbols(1, "Password must contain at least one symbol")
      .minUppercase(1, "Password must contain one Uppercase letter")
      .minNumbers(1, "Password must contain one lowercase letter"),
  });
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
  });

  const router = useRouter();
  const [processState, setProcessState] = useState<PROCESS_STATE>(
    PROCESS_STATE.IDLE
  );

  const handleNewPassword = async ({
    newPassword,
    confirmPassword,
  }: FormValues) => {
    try {
      if (newPassword !== confirmPassword)
        setError(
          "newPassword",
          {
            type: "pattern",
            message: "Passwords don't match",
          },
          { shouldFocus: true }
        );
      else {
        setProcessState(PROCESS_STATE.IN_PROGRESS);
        console.log(
          await supabase.auth.api.updateUser(
            router.query.accessToken as string,
            {
              password: newPassword,
            }
          )
        );
        setProcessState(PROCESS_STATE.SUCCESS);
      }
    } catch (error) {
      console.log(error);
      setProcessState(PROCESS_STATE.ERROR);
    }
  };

  const errorMessage = Object.values(errors).map(({ message }) => message)[0];

  useEffect(() => {
    if (!router.query.accessToken) router.push("/login");
  }, [router]);

  if (router.query.accessToken)
    return (
      <ContainerCard>
        {processState === PROCESS_STATE.SUCCESS ? (
          <Card>
            <FiCheck className="text-white text-7xl" />
            <h2 className="text-white text-4xl text-center">
              Account creation successful
            </h2>
            <Link href={"/login"}>
              <a>
                <GradientButton>Go to Login</GradientButton>
              </a>
            </Link>
          </Card>
        ) : (
          <form
            className="w-full flex flex-col items-center"
            onSubmit={handleSubmit(handleNewPassword)}
          >
            <Card>
              <h2 className="text-3xl sm:text-4xl font-medium text-center">
                Enter new password
              </h2>
              <div className="w-full max-w-sm flex flex-col gap-4 sm:gap-8  items-center">
                <TextField
                  name="newPassword"
                  label="New Password"
                  type="password"
                  placeholder="New Password"
                  register={register}
                />

                <TextField
                  name="confirmPassword"
                  label="Confirm Password"
                  type="password"
                  placeholder="Confirm Password"
                  register={register}
                />

                <GradientButton
                  type="submit"
                  disabled={processState === PROCESS_STATE.IN_PROGRESS}
                >
                  Confirm
                </GradientButton>
                {errorMessage && (
                  <h3 className="text-lg font-medium">{errorMessage}</h3>
                )}
              </div>
            </Card>
          </form>
        )}
      </ContainerCard>
    );

  return null;
};

export default ConfirmSignupPage;
