import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Head from "next/head";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { CacheProvider } from "@emotion/react";
import theme from "../src/theme";
import createEmotionCache from "../src/createEmotionCache";
import NextNProgress from "nextjs-progressbar";
import { UserProvider } from "../components/userContext";
import { Provider, useDispatch } from "react-redux";
import { store } from "../src/app/store";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import { Toaster } from "react-hot-toast";
import "../styles/globals.css";
import "../styles/custom.css";
import Script from "next/script";
import Pixel from "../components/Pixel";
import { SessionProvider } from "next-auth/react";
import { useRouter } from "next/router";
import { clearCart } from "../src/features/cart/cartSlice";
import * as fbq from "../lib/fpixel";

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();
let persistor = persistStore(store);

export default function MyApp(props) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  const router = useRouter();

  useEffect(() => {
    // This pageview only triggers the first time (it's important for Pixel to have real information)
    fbq.pageview();
    fbq.viewContent();

    const handleRouteChange = () => {
      fbq.pageview();
      fbq.viewContent();
    };

    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);
  /* useEffect(() => {
    const currency = localStorage.getItem("currency");
    if (!currency) {
      localStorage.setItem("currency", "BDT");
    }
  }, []); */
  return (
    <CacheProvider value={emotionCache}>
      <Script
        id="fb-pixel"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', ${fbq.FB_PIXEL_ID});
          `,
        }}
      />
      <script
        dangerouslySetInnerHTML={{
          __html: `window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'UA-105579019-2')`,
        }}
      />
      <script
        async
        src="https://www.googletagmanager.com/gtag/js?id=UA-105579019-2"
      />
      {/* Google tag manager */}
      <Script
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
                      (function(w,d,s,l,i){
                        w[l]=w[l]||[];
                        w[l].push({'gtm.start':
                        new Date().getTime(),event:'gtm.js'});
                        var f=d.getElementsByTagName(s)[0],
                        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';
                        j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;
                        f.parentNode.insertBefore(j,f);
                      })(window,document,'script','dataLayer','GTM-PZG4MP8');
                    `,
        }}
      />
      {/* <Pixel name="FACEBOOK_PIXEL_1" /> */}
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <NextNProgress
          color="#29D"
          startPosition={0.3}
          stopDelayMs={200}
          height={3}
          showOnShallow={true}
        />
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <UserProvider>
              <Component {...pageProps} />
              <Toaster />
            </UserProvider>
          </PersistGate>
        </Provider>
      </ThemeProvider>
    </CacheProvider>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  emotionCache: PropTypes.object,
  pageProps: PropTypes.object.isRequired,
};
