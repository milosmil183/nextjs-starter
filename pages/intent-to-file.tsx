import Head from "next/head";
import { NextPageWithLayout } from "../app/types/next-page";
import IntentToFilePage from "../app/components/templates/Claims/IntentToFilePage";

const IntentToFile: NextPageWithLayout = () => {
  return (
    <div>
      <Head>
        <title>Intent to File - Veteran</title>
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <IntentToFilePage />
    </div>
  );
};

IntentToFile.layout = "main";
IntentToFile.middleware = "auth";

export default IntentToFile;
