import GradientButton from "@/modules/Button/GradientButton";
import Card from "@/modules/Card/Card";
import TextField from "@/modules/Form/TextField";
import { yupResolver } from "@hookform/resolvers/yup";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FiCheck } from "react-icons/fi";
import { supabase } from "utils/supabaseClient";
import { PROCESS_STATE } from "utils/types";
import * as yup from "yup";

const ForgotPassword = () => {
  const [processState, setProcessState] = useState<PROCESS_STATE>(
    PROCESS_STATE.IDLE
  );

  interface FormValues {
    email: string;
  }

  const schema = yup
    .object()
    .shape({
      email: yup.string().email("Email address is not valid").required(),
    })
    .required();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
  });

  const [requestError, setRequestError] = useState<string | null>(null);

  const handleForgotPassword = async ({ email }: FormValues) => {
    try {
      setProcessState(PROCESS_STATE.IN_PROGRESS);
      const response = await supabase.auth.api.resetPasswordForEmail(email);

      if (response.error) {
        setRequestError(response.error.message);
        setProcessState(PROCESS_STATE.IDLE);
        reset();
      } else {
        reset();

        setProcessState(PROCESS_STATE.SUCCESS);
      }
    } catch (error: any) {
      setProcessState(PROCESS_STATE.IDLE);
      setRequestError("Something went wrong!");
    }
  };

  const errorMessage = Object.values(errors).map(({ message }) => message)[0];

  return (
    <>
      {processState === PROCESS_STATE.SUCCESS ? (
        <Card>
          <FiCheck className="text-white text-7xl" />
          <h2 className="text-white text-4xl text-center">
            Please check your inbox for next steps
          </h2>
          <Link href={"/login"}>
            <a>
              <GradientButton>Back to Login</GradientButton>
            </a>
          </Link>
        </Card>
      ) : (
        <form
          onSubmit={handleSubmit(handleForgotPassword)}
          className="w-full flex flex-col items-center"
        >
          <Card>
            <div className="text-center flex flex-col gap-4">
              <h2 className="text-3xl sm:text-4xl font-medium">
                Forgot Password
              </h2>

              <h3>Please enter you email address to continue</h3>
            </div>
            <div className="w-full max-w-sm flex flex-col gap-4 sm:gap-8">
              <TextField
                name="email"
                label="Email"
                type="email"
                placeholder="Enter email"
                register={register}
              />

              <GradientButton
                disabled={processState === PROCESS_STATE.IN_PROGRESS}
              >
                Confirm
              </GradientButton>

              {(errorMessage || requestError) && (
                <h3 className="text-lg font-medium">
                  {errorMessage || requestError}
                </h3>
              )}
            </div>
          </Card>
        </form>
      )}
    </>
  );
};

export default ForgotPassword;
