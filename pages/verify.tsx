import { NextPageWithLayout } from "../app/types/next-page";
import Head from "next/head";
import VerifyPage from "../app/components/templates/VerifyPage";

const Verify: NextPageWithLayout = () => {
  return (
    <div>
      <Head>
        <title>Verify - Veteran</title>
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <VerifyPage />
    </div>
  );
};

Verify.layout = "auth";
Verify.middleware = "auth";

export default Verify;
