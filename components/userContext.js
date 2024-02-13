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

  const storedExpiresIn = localStorage.getItem("expiresIn");
  useEffect(() => {
    const currency = localStorage.getItem("currency");
    const checkExpiration = async () => {
      if (storedExpiresIn) {
        const now = moment().unix();
        if (now > storedExpiresIn) {
          async function fetchExchangeRates(baseCurrency) {
            const response = await fetch(
              `https://api.exchangerate-api.com/v4/latest/BDT`
            );
            const data = await response.json();
            return data.rates;
          }
          const newRates = await fetchExchangeRates(currency);
          const storedRate = localStorage.getItem("rate");

          if (newRates && storedRate) {
            const rawRate = newRates[currency].toString();
            const newRate = AES.encrypt(rawRate, secretKey).toString();

            if (storedRate !== newRate) {
              // Update the rate and reset expiresIn to one day
              localStorage.setItem("rate", newRate);
              const expiresIn = moment().add(1, "day").unix();
              localStorage.setItem("expiresIn", expiresIn);
            }
          }
        }
      }
    };

    // Check expiration on component mount
    checkExpiration();

    // Set up interval to check expiration every hour (you can adjust the interval)
    const interval = setInterval(async () => {
      await checkExpiration();
    }, 24 * 60 * 60 * 1000);

    // Clear interval on component unmount
    return () => clearInterval(interval);
  }, [storedExpiresIn]);
  // console.log('from root',)
  return (
    <USER_CONTEXT.Provider value={value}>{children}</USER_CONTEXT.Provider>
  );
}

export default USER_CONTEXT;
