import axios from "axios";
import React, { useContext, useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import { Cartapi } from "../services/Cart";

import { productapi } from "../services/Product";

import { ToastContainer, toast } from "react-toastify";
import jwt_decode from "jwt-decode";

import "react-toastify/dist/ReactToastify.css";
import { datas } from "./apidata";
// import data from "../";
// import "../style/login.css";

export function Cart({
  loginstatus,
  setLoginStatus,
  setCartquantity,
  cartquantity,
  setCart,
}) {
  const history = useHistory();
  const [apidata, setApiData] = useState([]);
  const [update, setUpdate] = useState();
  const [total, setTotal] = useState(0);
  const name = useRef();

  const addToCart = async (id) => {
    if (loginstatus) {
      try {
        const callapi = new Cartapi();
        const { data } = await callapi.addToCart(
          {
            productid: id,
            userid: parseInt(window.localStorage.id),
            quantity: 1,
          },
          window.localStorage.token
        );

        if (data) {
          setCartquantity(data.cartlength);
          setUpdate(data);
        }
      } catch (err) {
        console.log(err);
      }
    } else {
      const retrievedData = JSON.parse(localStorage.getItem("productid"));
      const data = retrievedData.filter((data) => {
        if (data.productid == id) {
          data.quantity += 1;
        }
        return data;
      });

      const find = retrievedData.filter((data) => {
        if (data.productid === id) {
          return data;
        }
      });

      localStorage.removeItem("productid");
      localStorage.setItem("productid", JSON.stringify(data));
      localStorage.setItem(
        "total",
        JSON.stringify(
          JSON.parse(localStorage.getItem("total")) + find[0].price
        )
      );

      setUpdate(data);
    }
  };

  const removeCart = async (id) => {
    if (loginstatus) {
      try {
        const callapi = new Cartapi();
        const { data } = await callapi.removeCart(
          {
            productid: id,
            userid: parseInt(window.localStorage.id),
          },
          window.localStorage.token
        );
        if (data) {
          setCartquantity(data.cartlength);
          setUpdate(id);
        }
      } catch (err) {
        console.log(err);
      }
    } else {
      const retrievedData = JSON.parse(localStorage.getItem("productid"));

      const data = retrievedData.filter((data) => {
        if (data.productid !== id) {
          return data;
        }
      });

      const find = retrievedData.filter((data) => {
        if (data.productid === id) {
          return data;
        }
      });

      localStorage.removeItem("productid");
      localStorage.setItem("productid", JSON.stringify(data));
      localStorage.setItem(
        "total",
        JSON.stringify(
          JSON.parse(localStorage.getItem("total")) -
            find[0].price * find[0].quantity
        )
      );

      setCartquantity(data.length);
      setUpdate(data);
    }
  };

  const decreaseQuantity = async (id, quantity) => {
    if (loginstatus) {
      try {
        if (quantity > 1) {
          const callapi = new Cartapi();
          const { data } = await callapi.decreaseQuantity(
            {
              productid: id,
              userid: parseInt(window.localStorage.id),
              quantity: 1,
            },
            window.localStorage.token
          );
          setUpdate(data);
        }
      } catch (err) {
        console.log(err);
      }
    } else {
      if (quantity > 1) {
        const retrievedData = JSON.parse(localStorage.getItem("productid"));
        const data = retrievedData.filter((data) => {
          if (data.productid == id) {
            data.quantity -= 1;
          }
          return data;
        });

        const find = retrievedData.filter((data) => {
          if (data.productid === id) {
            return data;
          }
        });

        localStorage.removeItem("productid");
        localStorage.setItem("productid", JSON.stringify(data));

        localStorage.setItem(
          "total",
          JSON.stringify(
            JSON.parse(localStorage.getItem("total")) - find[0].price
          )
        );

        setUpdate(data);
      }
    }
  };
  useEffect(async () => {
    const token = localStorage.getItem("token");
    if (localStorage.token) {
      const decoded = jwt_decode(token);
      if (decoded.role === "user") {
        setLoginStatus(true);

        try {
          const apicall = new Cartapi();
          const { data } = await apicall.userCart(
            localStorage.getItem("id"),

            localStorage.getItem("token")
          );
          if (data) {
            console.log(apidata.length);
            setApiData(data.data);

            setTotal(data.subtotal);
          }
        } catch (err) {
          console.log(err);
        }
      }
    } else {
      if (localStorage.productid) {
        const datas = JSON.parse(localStorage.getItem("productid"));

        setApiData(datas);
      }
    }
  }, [update, setLoginStatus, setUpdate]);

  return (
    <>
      <section className="h-100 gradient-custom">
        <div className="container py-5">
          <div className="row d-flex justify-content-center my-4">
            <div className="col-md-8">
              <div className="card mb-4">
                <div className="card-header py-3">
                  <h5 className="mb-0">Cart items</h5>
                </div>
                <div className="card-body">
                  {/* <input type="text" ref={name} /> */}
                  {apidata?.map((data, index) => (
                    <div className="row mt-2" key={(data._id, index)}>
                      <div className="col-lg-3 col-md-12 mb-4 mb-lg-0 ">
                        <div
                          className="bg-image hover-overlay hover-zoom ripple rounded"
                          data-mdb-ripple-color="light"
                        >
                          <img
                            src={
                              loginstatus ? data.products.image1 : data.image1
                            }
                            className="w-100"
                          />
                          <a href="#!">
                            <div
                              className="mask"
                              // style="background-color: rgba(251, 251, 251, 0.2)"
                            ></div>
                          </a>
                        </div>
                      </div>

                      <div className="col-lg-5 col-md-6 mb-4 mb-lg-0">
                        <p>
                          <strong>
                            {loginstatus
                              ? data.products.productname
                              : data.productname}
                          </strong>
                        </p>
                        {/* <p>
                          <strong>
                            {loginstatus
                              ? data.products.productname
                              : data.quantity}
                          </strong>
                        </p> */}
                        <p>
                          <strong>
                            ₹{loginstatus ? data.products.price : data.price}
                          </strong>
                        </p>
                        <button
                          type="button"
                          className="btn btn-primary btn-sm me-1 mb-2"
                          data-mdb-toggle="tooltip"
                          title="Remove item"
                          onClick={() => {
                            if (loginstatus) {
                              removeCart(data.products._id);
                            } else {
                              removeCart(data.productid);
                            }
                          }}
                        >
                          <i className="fas fa-trash"></i>
                        </button>{" "}
                        <strong style={{ color: "red" }}>
                          {data.err && data.err}
                        </strong>
                      </div>

                      <div className="col-lg-4 col-md-6 mb-4 mb-lg-0">
                        <div className="d-flex mb-4">
                          <p className="err"></p>
                          <button
                            className="cart-button"
                            onClick={() =>
                              loginstatus
                                ? decreaseQuantity(
                                    data.products._id,
                                    data.quantity
                                  )
                                : decreaseQuantity(
                                    data.productid,
                                    data.quantity
                                  )
                            }
                          >
                            <i className="fas fa-minus"></i>
                          </button>

                          <div className="form-outline mx-2">
                            <input
                              id="form1"
                              min="0"
                              name="quantity"
                              placeholder={
                                loginstatus ? data.quantity : data.quantity
                              }
                              // value={
                              //   loginstatus ? data.quantity : data.quantity
                              // }
                              // type="text"
                              className="form-control text-center "
                            />
                            <label className="form-label">Quantity</label>
                          </div>

                          <button
                            className="cart-button"
                            onClick={() => {
                              loginstatus
                                ? addToCart(data.products._id, data.quantity)
                                : addToCart(data.productid);
                            }}
                          >
                            <i className="fas fa-plus"></i>
                          </button>
                        </div>

                        {/* <p className="text-start text-md-center">
                          <strong>₹{data.price}</strong>
                        </p> */}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card mb-4">
                <div className="card-header py-3">
                  <h5 className="mb-0">Summary</h5>
                </div>
                <div className="card-body">
                  <ul className="list-group list-group-flush">
                    {/* <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                      Products
                      <span>{apidata && apidata.length}</span>
                    </li> */}
                    <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                      total
                      <span>
                        ₹
                        {loginstatus
                          ? total && total
                          : localStorage.getItem("total")}
                      </span>
                    </li>
                  </ul>

                  <button
                    type="button"
                    className="btn btn-primary btn-lg btn-block "
                    onClick={() =>
                      apidata.length !== 0 && history.push("order")
                    }
                  >
                    Go to checkout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>{" "}
      <ToastContainer
        position="top-right"
        autoClose={1800}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
}
