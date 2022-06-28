import { NextPageWithLayout } from "../app/types/next-page";
import Head from "next/head";
import LoginPage from "../app/components/templates/LoginPage/Veteran";

const Login: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title>Login - Veteran</title>
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <LoginPage />
    </>
  );
};

Login.layout = "auth";
Login.middleware = "guest";

export default Login;
