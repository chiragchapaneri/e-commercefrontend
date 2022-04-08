import React, { useContext, useReducer, useState } from "react";
import { Userapi } from "../services/User";
import { useHistory, useLocation } from "react-router-dom";
import { Cartapi } from "../services/Cart";

export function Login({ setLoginStatus, setCartquantity }) {
  const history = useHistory();

  const [useremail, setuseremail] = useState("");
  const [password, setpassword] = useState("");
  const [err, seterr] = useState("");
  const [validemail, setvalidemail] = useState("");
  const [validpassword, setvalidpassword] = useState("");
  const format = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  const onsubmit = async (e) => {
    e.preventDefault();

    if (
      useremail === "" ||
      password === "" ||
      !useremail.match(format) ||
      password.length < 8
    ) {
      seterr("");
      !useremail && setvalidemail("enter email");
      useremail &&
        !useremail.match(format) &&
        setvalidemail("enter valid  email");
      password
        ? setvalidpassword("passeod length must be 8 charcter long")
        : setvalidpassword("enter pasword");
    } else {
      const apidata = { email: useremail, password: password };
      setvalidemail("");
      setvalidpassword("");
      try {
        const api = new Userapi();

        const { data } = await api.login(apidata);
        if (data) {
          window.localStorage.setItem("token", data.token);
          window.localStorage.setItem("id", data.id);

          if (localStorage.productid) {
            const callapi = new Cartapi();
            const cartdata = JSON.parse(localStorage.productid);
            cartdata.map(async (data, index) => {
              const savecart = await callapi.addToCart(
                {
                  productid: data.productid,
                  userid: parseInt(window.localStorage.id),
                  quantity: 1,
                },
                window.localStorage.token
              );

              if (savecart) {
                if (index + 1 == cartdata.length) {
                  setCartquantity(savecart.data.cartlength);
                }
                localStorage.removeItem("productid");
              }
            });
          } else {
            setCartquantity(data.cart);
          }
          setLoginStatus(true);
        }
        if (data.token) {
          history.push("/");
        }
      } catch (error) {
        seterr("Invalid email or password");
      }
    }
  };

  return (
    <>
      <section className="bg-white">
        <div className="container-fluid vh-100-signin mt-5">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-md-9 col-lg-6 col-xl-5">
              <img
                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                className="img-fluid"
                alt="Sample image"
              />
            </div>
            <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
              <form>
                <div className="d-flex flex-row align-items-center justify-content-center ">
                  <p className="lead fw-normal mb-0 me-3">Login</p>
                </div>
                <div className="divider d-flex align-items-center my-4"></div>
                {err && (
                  <div className="form-outline mb-3">
                    <p className="lead fw-normal mb-0 me-3 text-danger">
                      {err}
                    </p>
                  </div>
                )}
                <div className="form-outline mb-3">
                  <input
                    type="email"
                    name="email"
                    className="form-control form-control-md"
                    placeholder="Enter email"
                    value={useremail}
                    // autoComplete="off"
                    onChange={(e) => {
                      setvalidemail("");
                      setuseremail(e.target.value);
                    }}
                    required
                  />
                </div>

                {validpassword && <p className="text-danger">{validemail}</p>}
                <div className="form-outline mb-3">
                  <input
                    type="password"
                    name="password"
                    className="form-control form-control-md"
                    placeholder="Enter password"
                    value={password}
                    required
                    autoComplete="off"
                    onChange={(e) => {
                      setvalidpassword("");
                      setpassword(e.target.value);
                    }}
                  />
                </div>
                {validpassword && (
                  <p className=" text-danger">{validpassword}</p>
                )}
                <div className="d-flex justify-content-between align-items-center"></div>
                <div className="text-center text-lg-start mt-4 pt-2">
                  <button
                    type="button"
                    className="btn btn-dark btn-lg"
                    style={{ paddingLeft: "2.5rem", paddingRight: "2.5rem" }}
                    onClick={(e) => onsubmit(e)}
                  >
                    Login
                  </button>
                  <p className="small fw-bold mt-2 pt-1 mb-0">
                    Don't have an account?{" "}
                    <a
                      onClick={() => history.push("/login")}
                      className="link-danger"
                    >
                      Register
                    </a>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

// https://bootstrap-ecommerce.com/bootstrap-ecommerce-html/page-listing-grid.html#
