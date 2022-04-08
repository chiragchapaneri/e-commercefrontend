import { useContext, useEffect, useState } from "react";
import { Route, Switch, useLocation } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { AddCategory } from "./pages/addcategory";
import { AddProduct } from "./pages/Addproduct";
import { AdminHome } from "./pages/AdminHome";
import { ProductList } from "./pages/Productlist";
import { Footer } from "./components/Footer";

import { Cart } from "./pages/cart";
import { Home } from "./pages/Home";
import { Login } from "./pages/login";
import { Order } from "./pages/order";
import { OrderList } from "./pages/orderlist";
import { ProductDetails } from "./pages/Productdetails";
import { Profile } from "./pages/profile";
import { Search } from "./pages/Search";
import { Signup } from "./pages/signup";
import { AdminLogin } from "./pages/AdminLogin";
import { UpdateProduct } from "./pages/UpdateProduct";
import jwt_decode from "jwt-decode";
import { AdminOrderList } from "./pages/Adminorderlist";
import { AddCategoryList } from "./pages/Admincategorylist";
import { data } from "../src/index";

function App() {
  const [loginstatus, setLoginStatus] = useState(false);
  const [adminloginstatus, setAdminLoginStatus] = useState(false);
  const [cart, setCart] = useState(false);
  const [cartquantity, setCartquantity] = useState(0);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = jwt_decode(token);
      if (decoded.role === "user") {
        setLoginStatus(true);
        setCart(true);
      }
      // localStorage?.productid && setCart(true);
      // localStorage?.productid &&
      //   setCartquantity(JSON.parse(localStorage.getItem("productid")).length);
    } else {
    }
  }, []);
  return (
    <>
      <Navbar
        {...{
          loginstatus,
          setLoginStatus,
          setAdminLoginStatus,
          cart,
          setCart,
          cartquantity,
          setCartquantity,
        }}
      />

      <Switch>
        <Route exact path="/">
          <Home
            setCart={setCart}
            setCartquantity={setCartquantity}
            {...{ loginstatus }}
          />
        </Route>

        <Route exact path="/login">
          <Login
            setLoginStatus={setLoginStatus}
            loginstatus={loginstatus}
            setCartquantity={setCartquantity}
          />
        </Route>

        <Route exact path="/signup" component={Signup} />

        <Route exact path="/search" component={Search} />
        <Route exact path="/admin/search" component={Search} />

        <Route exact path="/cart">
          <Cart
            loginstatus={loginstatus}
            setCartquantity={setCartquantity}
            cartquantity={cartquantity}
            setCart={setCart}
            setLoginStatus={setLoginStatus}
          />
        </Route>

        <Route exact path="/order">
          <Order
            loginstatus={loginstatus}
            setLoginStatus={setLoginStatus}
            setCartquantity={setCartquantity}
          />
        </Route>

        <Route exact path="/order/:id">
          <Order loginstatus={loginstatus} setCartquantity={setCartquantity} />
        </Route>
        <Route exact path="/productdetails/:id">
          <ProductDetails setCart={setCart} setCartquantity={setCartquantity} />
        </Route>

        <Route exact path="/product/:id">
          <ProductList setCart={setCart} setCartquantity={setCartquantity} />
        </Route>

        <Route exact path="/profile/:id" component={Profile} />

        <Route exact path="/orderlist" component={OrderList} />
        <Route exact path="/admin/login">
          <AdminLogin
            setAdminLoginStatus={setAdminLoginStatus}
            loginstatus={adminloginstatus}
          />
        </Route>

        <Route exact path="/admin">
          <AdminHome adminloginstatus={adminloginstatus} />
        </Route>

        <Route exact path="/admin/addproduct" component={AddProduct} />

        <Route
          exact
          path="/admin/product/update/:id"
          component={UpdateProduct}
        />

        <Route exact path="/admin/addcategory" component={AddCategory} />
        <Route exact path="/admin/categorylist" component={AddCategoryList} />
        <Route exact path="/admin/orderlist" component={AdminOrderList} />
      </Switch>
      <Footer />
    </>
  );
}

export default App;
