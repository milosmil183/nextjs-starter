import "../app/styles/app.scss";
import type { AppProps } from "next/app";
import RootLayout from "../app/components/layouts/index";
import { ThemeProvider } from "next-themes";
import { SessionProvider } from "next-auth/react";
import { NextPageWithLayout } from "../app/types/next-page";

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}: AppPropsWithLayout) {
  return (
    <SessionProvider session={session}>
      <ThemeProvider>
        <RootLayout
          middleware={Component.middleware}
          layout={Component.layout}
        >
          <Component {...pageProps} />
        </RootLayout>
      </ThemeProvider>
    </SessionProvider>
  );
}

export default MyApp;
