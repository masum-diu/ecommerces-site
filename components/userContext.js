import { createContext, useState } from "react";

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
  return (
    <USER_CONTEXT.Provider value={value}>{children}</USER_CONTEXT.Provider>
  );
}

export default USER_CONTEXT;
