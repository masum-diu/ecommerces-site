import { useEffect } from "react";
import { createContext, useState } from "react";
import { useDispatch } from "react-redux";
import { clearCart } from "../src/features/cart/cartSlice";
import moment from "moment";
import { AES } from "crypto-js";
import CryptoJS from "crypto-js";

const USER_CONTEXT = createContext();
const secretKey =
  "eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6MTY5MDQ2MTg5OSwiaWF0IjoxNjkwNDYxODk5fQ.XpwsAA-b8YVaYW26LBUHLRXIzWU1wgTP6cIrLbs7qEw";

export function UserProvider({ children }) {
  const [user, setUser] = useState({});
  const [userdata, setUserData] = useState({});
  const [isGuestCheckout, setIsGuestCheckout] = useState(false);
  const [isProceedCheckout, setIsProceedCheckout] = useState(false);
  const [hasToken, setHasToken] = useState(false);
  const [isPlaceOrder, setIsPlaceOrder] = useState(false);
  const [keepShowing, setKeepShowing] = useState(false);
  const [selectItem, setSelectItem] = useState("terms-conditions");
  const [conversionRates, setConversionRates] = useState(null);
  const expiresInKey = "expiresIn";
  const value = {
    user,
    setUser,
    userdata,
    setUserData,
    isGuestCheckout,
    setIsGuestCheckout,
    hasToken,
    setHasToken,
    isPlaceOrder,
    setIsPlaceOrder,
    isProceedCheckout,
    setIsProceedCheckout,
    keepShowing,
    setKeepShowing,
    selectItem,
    setSelectItem,
  };
  const dispatch = useDispatch();
  const currentVersion = localStorage.getItem("version");
  useEffect(() => {
    let updatedVersion = "v-1.1.1";
    const currentVersion = localStorage.getItem("version");
    if (currentVersion) {
      if (currentVersion !== updatedVersion) {
        dispatch(clearCart("cart"));
        localStorage.setItem("version", updatedVersion);
      }
    } else {
      dispatch(clearCart("cart"));
      localStorage.setItem("version", updatedVersion);
    }
  }, [currentVersion]);

  const storedExpiresIn = localStorage.getItem(expiresInKey);
  const currency = localStorage.getItem("currency");
  useEffect(() => {
    // Check if expiresIn is present in localStorage

    if (storedExpiresIn) {
      const storedDate = moment(storedExpiresIn);
      const currentDate = moment();
      // Check if one day has passed
      if (currentDate.diff(storedDate, "days") >= 1) {
        async function fetchExchangeRates(baseCurrency) {
          const response = await fetch(
            `https://api.exchangerate-api.com/v4/latest/BDT`
          );
          const data = await response.json();
          return data.rates;
        }
        if (currency) {
          fetchExchangeRates(currency).then((rates) =>
            setConversionRates(rates)
          );
        }
        if (conversionRates) {
          const rawRate = conversionRates[currency].toString();
          const rate = AES.encrypt(rawRate, secretKey).toString();
          localStorage.setItem("rate", rate);
          const currentDateAndTime = moment().toISOString();
          localStorage.setItem(expiresInKey, currentDateAndTime);
          // localStorage.setItem("expiresIn", moment().toISOString());
        }
      }
    }
  }, [currentVersion, currency, storedExpiresIn, conversionRates]);
  return (
    <USER_CONTEXT.Provider value={value}>{children}</USER_CONTEXT.Provider>
  );
}

export default USER_CONTEXT;
