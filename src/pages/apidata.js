import { createContext, useState } from "react";

export const datas = createContext();
export const Apidata = ({ children }) => {
  const [loginstatus, setLoginStatus] = useState(false);
  const [adminloginstatus, setAdminLoginStatus] = useState(false);
  const [cart, setCart] = useState(false);
  const [cartquantity, setCartquantity] = useState(0);

  return (
    <>
      <datas.Provider value={{ setLoginStatus, setCart, setCartquantity }}>
        {/* <h1>hello{children}</h1> */}
        {children}
      </datas.Provider>
    </>
  );
};
