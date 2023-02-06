import { createContext, useState } from "react";

const USER_CONTEXT = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState({});
  const [userdata, setUserData] = useState({});
  const value = { user, setUser,userdata, setUserData };
  return (
    <USER_CONTEXT.Provider value={value}>{children}</USER_CONTEXT.Provider>
  );
}

export default USER_CONTEXT;
