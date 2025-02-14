import { createContext, useState } from "react";

export const UserContext = createContext();

export default function UserContextProvider({ children }) {
  const [userLogin, setuserLogin] = useState(
    localStorage.getItem("userToken") ? localStorage.getItem("userToken") : null
  );

  return (
    <UserContext.Provider value={{ userLogin, setuserLogin }}>
      {children}
    </UserContext.Provider>
  );
}
