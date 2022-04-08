import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { ProductDetailsCard } from "../components/ProductDetailsCard";
import { productapi } from "../services/Product";
import { Cartapi } from "../services/Cart";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import "../style/productdetail.css";
export function ProductDetails({ setCartquantity }) {
  const history = useHistory();
  const [apidata, setApiData] = useState([]);

  const { id } = useParams();

  const addToCart = async (productid, price, productname, image, e) => {
    if (!localStorage.token) {
      if (localStorage.productid) {
        const oldPrductId = localStorage.getItem("productid");
        toast.success("product is add to cart");
        const productidAvalible = oldPrductId.includes(productid);
        if (!productidAvalible) {
          const retrievedData = JSON.parse(localStorage.getItem("productid"));
          retrievedData.push({
            productid: productid,
            quantity: 1,
            index: retrievedData.length,
            price: price,
            image1: image,
            productname: productname,
          });
          localStorage.setItem("productid", JSON.stringify(retrievedData));
          localStorage.setItem(
            "total",
            JSON.stringify(JSON.parse(localStorage.getItem("total")) + price)
          );
          const length = retrievedData.length;
          setCartquantity(length);
          // setCart(true);
        } else {
          const retrievedData = JSON.parse(localStorage.getItem("productid"));
          const find = retrievedData.filter((data) => {
            if (data.productid === productid) {
              return data;
            }
          });

          retrievedData[find[0].index].quantity =
            retrievedData[find[0].index].quantity + 1;

          localStorage.removeItem("productid");
          localStorage.setItem("productid", JSON.stringify(retrievedData));
          localStorage.setItem(
            "total",
            JSON.stringify(JSON.parse(localStorage.getItem("total")) + price)
          );
        }
      } else {
        let arr = [
          {
            productid: productid,
            quantity: 1,
            index: 0,
            price: price,
            productname: productname,
            image1: image,
          },
        ];
        localStorage.setItem("productid", JSON.stringify(arr));
        localStorage.setItem("total", JSON.stringify(price));

        setCart(true);
        toast.success("product is add to cart");
      }
    } else {
      try {
        const callapi = new Cartapi();
        const { data } = await callapi.addToCart(
          {
            productid: productid,
            userid: parseInt(window.localStorage.id),
            quantity: 1,
          },
          window.localStorage.token
        );
        if (data) {
          setCartquantity(data.cartlength);

          toast.success("product is add to cart");
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  useEffect(async () => {
    try {
      const apicall = new productapi();
      const { data } = await apicall.getProductById(id ? id : productid.id);
      if (data) {
        setApiData(data.data);
      }
    } catch (err) {
      console.log(err);
    }
  }, []);

  return (
    <>
      <div className="d-flex flex-wrap justify-content-start  filter-button-group bg-white mt-2 mb-1 header">
        <h6>
          <a className="heading" onClick={() => history.push("/")}>
            Home{`>`}
          </a>
          <a className="heading">productdetails</a>
        </h6>
      </div>

      <div className="bg-light">
        <div className="container  mb-5">
          <div className="row d-flex justify-content-center">
            <div className="col-md-12">
              {apidata && (
                <ProductDetailsCard
                  data={apidata}
                  keys={apidata._id}
                  addToCart={addToCart}
                />
              )}
            </div>
          </div>
        </div>
      </div>

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
