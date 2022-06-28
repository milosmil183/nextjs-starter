import { FC, useState } from "react";
import Card from "../../common/Card";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { RedirectableProviderType } from "next-auth/providers";
import { signIn } from "next-auth/react";
import Input from "../../common/Input";
import Label from "../../common/Label";
import Button from "../../common/Button";
import Field from "../../common/Field";
import ErrorMessage from "../../common/ErrorMessage";
import Alert from "../../common/Alert";
import Axios from "../../../lib/axios";
import Link from "next/link";

const schema = yup
  .object({
    firstName: yup.string().required("First name required"),
    lastName: yup.string().required("Last name required"),
    email: yup.string().email("Must be a valid email").required(),
    password: yup.string().min(8).required(),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password")], "Confirm password mismatch")
      .required()
  })
  .required();

type FormValues = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

const SignupPage: FC = () => {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState<string | undefined>();
  const {
    register,
    handleSubmit,
    formState
  } = useForm<yup.InferType<typeof schema>>({
    resolver: yupResolver(schema),
    mode: "onChange"
  });
  const { isValid, errors } = formState;
  const router = useRouter();
  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    setLoading(true);
    const response = await Axios.post("/auth/register", data);
    if (response.data.success) {
      signIn<RedirectableProviderType>("credentials", {
        email: data.email,
        password: data.password,
        redirect: false
      }).then(async (response) => {
        setLoading(false);
        if (response?.ok && !response.error) {
          await router.replace("/verify?email=1");
        } else {
          setError("Login failed with error.");
        }
      });
    } else {
      setLoading(false);
      setError(response.data.message);
    }
  };
  return (
    <>
      <div className="px-3">
        <Card className="max-w-lg mx-auto mt-10 shadow-sm py-10">
          <div className="text-xl text-center font-medium opacity-60">
            Veteran Application
          </div>
          <div className="text-2xl text-center font-bold mt-3">
            Create Account
          </div>
          <form className="mt-9" onSubmit={handleSubmit(onSubmit)}>
            {error &&
              <Alert variant="error" className="mb-5">
                <div className="px-4 py-3">
                  {error}
                </div>
              </Alert>
            }
            <Field
              register={register}
              state={formState}
              name="firstName"
              label="First Name"
              autoComplete="firstName"
            />
            <Field
              register={register}
              state={formState}
              name="lastName"
              label="Last Name"
              autoComplete="lastName"
            />
            <Field
              register={register}
              state={formState}
              name="email"
              label="Email"
              autoComplete="email"
            />
            <div className="mt-4">
              <div className="flex flex-row justify-between">
                <Label htmlFor="password" name="password" errors={errors}>
                  Password
                </Label>
                <a
                  className="text-sm text-primary cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? "Hide" : "Show"}
                </a>
              </div>
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                {...register("password")}
              />
              <ErrorMessage name="password" errors={errors} />
            </div>
            <div className="mt-4">
              <div className="flex flex-row justify-between">
                <Label
                  htmlFor="confirm_password"
                  name="confirmPassword"
                  errors={errors}
                >
                  Confirm Password
                </Label>
                <a
                  className="text-sm text-primary cursor-pointer"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? "Hide" : "Show"}
                </a>
              </div>
              <Input
                id="confirm-password"
                type={showConfirmPassword ? "text" : "password"}
                autoComplete="confirm-password"
                {...register("confirmPassword")}
              />
              <ErrorMessage name="confirmPassword" errors={errors} />
            </div>
            <div className="mt-7">
              <Button
                type="submit"
                variant="primary"
                className="w-full uppercase leading-6"
                disabled={!isValid}
                loading={loading}
              >
                Sign Up
              </Button>
            </div>
            <div className="text-center mt-5">
              <Link href="/login">
                <a>
                  <Button
                    variant="text"
                    className="text-gray-700 underline font-medium"
                  >
                    Login
                  </Button>
                </a>
              </Link>
            </div>
          </form>
        </Card>
      </div>
    </>
  );
};

export default SignupPage;
