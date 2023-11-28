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
import Pixel from "../components/Pixel";
import { SessionProvider } from "next-auth/react";
import { useRouter } from "next/router";
import { clearCart } from "../src/features/cart/cartSlice";

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();
let persistor = persistStore(store);

export default function MyApp(props) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  return (
    <CacheProvider value={emotionCache}>
      <Pixel name="FACEBOOK_PIXEL_1" />
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
