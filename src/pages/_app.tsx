import GoogleAnalytics from '../components/GoogleAnalytics';
import { useEffect } from "react";
import type { AppProps } from "next/app";
import Head from "next/head";
import { useRouter } from "next/router";

import "styles/globals.css";
import "styles/theme.css";
import "styles/components.css";
import "remixicon/fonts/remixicon.css";

import {pageview } from "../helpers/gtag";

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = pageview;
    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        
      </Head>
      <GoogleAnalytics />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;

declare global {
  var gtag: (...args: any[]) => void;
}
