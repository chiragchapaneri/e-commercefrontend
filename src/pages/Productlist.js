import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { ProductCard } from "../components/ProductCard";
import { productapi } from "../services/Product";
import { Cartapi } from "../services/Cart";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

export function ProductList({ setCartquantity }) {
  const [productlist, setProductList] = useState([]);

  const { id } = useParams();

  const history = useHistory();

  // const addToCart = async (productid) => {
  //   try {
  //     const callapi = new Cartapi();
  //     const { data } = await callapi.addToCart(
  //       {
  //         productid: productid,
  //         userid: parseInt(window.localStorage.id),
  //         quantity: 1,
  //       },
  //       window.localStorage.token
  //     );
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

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
        setCartquantity(1);
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
  const handleChange = async (e) => {
    // e.preventDefault();
    const value = e.target.value;
    if (!value == "") {
      const apicall = new productapi();
      const { data } = await apicall.sortProduct({
        value: value,
        category: id,
      });
      if (data) {
        setProductList(data);
      }
    }
  };

  useEffect(async () => {
    try {
      const apicall = new productapi();
      const data = await apicall.getProductByCategory(id);
      if (data.status === 200) {
        setProductList(data.data.data);
      }
    } catch (er) {
      console.log(er);
    }
  }, [id, setProductList]);

  return (
    <>
      <div className="d-flex flex-wrap justify-content-start  filter-button-group bg-white mt-3 mb-1">
        <h6>
          <a className="heading" onClick={() => history.push("/")}>
            Home{`>`}
          </a>
          <a className="heading">product{`>${id}`}</a>
        </h6>
      </div>
      <section className="product_section  bg-light">
        <div className="container-fluid d-flex flex-wrap justify-content-end  pt-2 pr-2">
          <div className="form-outline mb-3">
            <div className="row">
              <div className="form-group">
                <select
                  className="form-select productlist-select"
                  placeholder="filter"
                  name="filter"
                  autoComplete="off"
                  onChange={handleChange}
                >
                  <option value="">Select </option>
                  <option value={"latest"}>Latest Product </option>

                  <option value={"high-low"}> High-low </option>
                  <option value={"low-high"}>Low-high </option>
                  {/* {uniquestate.map((data, index) => (
                    <option key={index}>{data} </option>
                  ))} */}
                </select>
              </div>
            </div>
          </div>
        </div>

        <div className="container">
          <div className="row">
            {productlist?.map((data, index) => {
              return (
                <ProductCard data={data} addToCart={addToCart} key={index} />
              );
            })}
          </div>
        </div>
      </section>

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
