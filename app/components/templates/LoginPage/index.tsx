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
import Link from "next/link";
import Checkbox from "../../common/Checkbox";
import Button from "../../common/Button";
import Alert from "../../common/Alert";

const schema = yup
  .object({
    email: yup.string().email("Must be a valid email").required(),
    password: yup.string().min(8).required(),
    remember: yup.boolean().required().default(false),
  })
  .required();

type FormValues = {
  email: string;
  password: string;
  remember: boolean;
};

const LoginPage: FC = () => {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | undefined>();
  const {
    register,
    handleSubmit,
    formState: { isValid },
  } = useForm<yup.InferType<typeof schema>>({
    resolver: yupResolver(schema),
    mode: "onChange",
  });
  const router = useRouter();
  const onSubmit: SubmitHandler<FormValues> = (data) => {
    setLoading(true);
    signIn<RedirectableProviderType>("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    }).then(async (response) => {
      setLoading(false);
      if (response?.ok && !response.error) {
        await router.replace("/verify");
      } else {
        setError("Login failed with error.");
      }
    });
  };
  return (
    <>
      <div className="px-3">
        <Card className="max-w-lg mx-auto mt-10 shadow-sm py-10">
          <div className="text-xl text-center font-medium opacity-60">
            Veteran Application
          </div>
          <div className="text-2xl text-center font-bold mt-3">
            Login
          </div>
          <form className="mt-9" onSubmit={handleSubmit(onSubmit)}>
            {error &&
              <Alert variant="error" className="mb-5">
                <div className="px-4 py-3">
                  {error}
                </div>
              </Alert>
            }
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" autoComplete="email" {...register("email")} />
            </div>
            <div className="mt-4">
              <div className="flex flex-row justify-between">
                <Label htmlFor="password">Password</Label>
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
            </div>
            <div className="mt-2">
              <Link href="/forgot-password">
                <a className="text-primary text-sm">Forgot Password?</a>
              </Link>
            </div>
            <div className="mt-5 flex flex-row items-center">
              <Checkbox id="remember" {...register("remember")} />
              <Label htmlFor="remember">
                <span className="ml-2">Remember me</span>
              </Label>
            </div>
            <div className="mt-8">
              <Button
                type="submit"
                variant="primary"
                className="w-full uppercase"
                disabled={!isValid}
                loading={loading}
              >
                Log in
              </Button>
            </div>
            <div className="text-center mt-5">
              <Link href="/signup">
                <a>
                  <Button
                    variant="text"
                    className="text-gray-700 underline font-medium"
                  >
                    Create Account
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

export default LoginPage;
