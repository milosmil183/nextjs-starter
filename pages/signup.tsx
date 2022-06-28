import { NextPageWithLayout } from "../app/types/next-page";
import Head from "next/head";
import SignupPage from "../app/components/templates/SignupPage";

const Signup: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title>Signup - Veteran</title>
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <SignupPage />
    </>
  );
};

Signup.layout = "auth";
Signup.middleware = "guest";

export default Signup;
