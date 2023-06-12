import React, { useState } from "react";
import PropTypes from "prop-types";
import Head from "next/head";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { CacheProvider } from "@emotion/react";
import theme from "../src/theme";
import createEmotionCache from "../src/createEmotionCache";
import NextNProgress from "nextjs-progressbar";
import { UserProvider } from "../components/userContext";
import { Provider } from "react-redux";
import { store } from "../src/app/store";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import { Toaster } from "react-hot-toast";
import "../styles/globals.css";
import Pixel from "../components/Pixel";
import { SessionProvider } from "next-auth/react";

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();
let persistor = persistStore(store);

export default function MyApp(props) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  return (
    <CacheProvider value={emotionCache}>
      <div>
        <React.Fragment>
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
        </React.Fragment>

        <Pixel name="FACEBOOK_PIXEL_1" />
      </div>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>

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
              {/* <SessionProvider session={pageProps.session}> */}
                <Component {...pageProps} />
              {/* </SessionProvider> */}
              
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
