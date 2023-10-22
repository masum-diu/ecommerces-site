import { useEffect } from "react";
import { createContext, useState } from "react";
import { useDispatch } from "react-redux";
import { clearCart } from "../src/features/cart/cartSlice";

const USER_CONTEXT = createContext();

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
    let updatedVersion = "v-1.0.1";
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
  // console.log('from root',)
  return (
    <USER_CONTEXT.Provider value={value}>{children}</USER_CONTEXT.Provider>
  );
}

export default USER_CONTEXT;
