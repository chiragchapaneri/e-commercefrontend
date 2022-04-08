import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { ProductCard } from "../components/ProductCard";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Cartapi } from "../services/Cart";
import { productapi } from "../services/Product";

export function Home({ setCart, setCartquantity, loginstatus }) {
  const history = useHistory();
  const [apidata, setApiData] = useState([]);
  const [filterdata, setFilterdata] = useState([]);

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
          setCart(true);
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
        setCartquantity(1);
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
          setCart(true);
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
      const { data } = await apicall.getProduct();

      if (data) {
        setApiData(data.data);
        setFilterdata(data.data);
      }
    } catch (err) {
      console.log(err);
    }
  }, [setApiData, setFilterdata]);

  return (
    <>
      <div
        id="carouselExampleInterval"
        className="carousel slide"
        data-bs-ride="carousel"
      >
        <div className="carousel-inner">
          <div className="carousel-item active" data-bs-interval="3000">
            <img
              src="https://i02.appmifile.com/188_operator_in/15/02/2022/957d575e2788759ede8204966f1a5b28.jpg"
              className="d-block w-100"
              onClick={() =>
                history.push("/productdetails/62152bb9e56d84effa5cb38a")
              }
              alt="..."
            />
          </div>
          <div className="carousel-item" data-bs-interval="2000">
            <img
              src="https://i02.appmifile.com/696_operator_in/16/02/2022/1624c0cb6a91201cf3eb79bec36d9eea.jpg"
              className="d-block w-100"
              alt="..."
            />
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleInterval"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleInterval"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>

      <div className="container mt-3 ml-3">
        <div className="row">
          <div className="col-md-4 ">
            <div className="card">
              <img
                src="https://res.cloudinary.com/chirag12/image/upload/v1645809281/9e0d4997a7b600d145b28a94b2b45bf7_av7kwc.jpg"
                style={{ cursor: "pointer" }}
                onClick={() => history.push("/product/mobile")}
                className="banner"
              ></img>
            </div>
          </div>{" "}
          <div className="col-md-4 ">
            <div className="card">
              <img
                src="https://res.cloudinary.com/chirag12/image/upload/v1645809364/ec6cffc39a759c50da2c593c6d66aca3_houtdz.jpg"
                className="banner"
              ></img>
            </div>
          </div>{" "}
          <div className="col-md-4 ">
            <div className="card">
              <img
                src="https://res.cloudinary.com/chirag12/image/upload/v1645809424/7ea9c434196f0781473ad19e1354ac47_y68xd1.jpg"
                onClick={() => history.push("/product/tv")}
                style={{ cursor: "pointer" }}
                className="banner"
              ></img>
            </div>
          </div>{" "}
        </div>
      </div>

      <div>
        <h2 className="dash-line mt-5">
          <span className="dash-line-word">STAR PRODUCTS</span>
        </h2>
      </div>

      <div className="container d-flex pt-5 ">
        <div className="row">
          <div className="col-md-6">
            <img
              src="https://res.cloudinary.com/chirag12/image/upload/v1645444401/mi1_iywv3n.jpg"
              className="image1"
              width={560}
              height={528}
            ></img>
          </div>
          <div className="col-md-6">
            <div className="row">
              <div className="col-md-6">
                {" "}
                <img
                  src="https://res.cloudinary.com/chirag12/image/upload/v1645444504/mi2_ldkq54.jpg"
                  className="image2"
                  width={270}
                ></img>
              </div>
              <div className="col-md-6">
                <img
                  src="https://res.cloudinary.com/chirag12/image/upload/v1645444607/mi3_g8zaqa.jpg"
                  className="image2"
                  width={265}
                ></img>
              </div>
              <div className="row">
                <div className="col-md-12 pt-1">
                  <img
                    src="https://res.cloudinary.com/chirag12/image/upload/v1645455816/810d96c40f1de2bc4f0a8f35bae9fc54_ve7o62.jpg"
                    className="image3"
                    width={560}
                  ></img>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <h2 className="dash-line mt-5">
          <span className="dash-line-word"> PRODUCTS</span>
        </h2>
      </div>
      <section className="product_section layout_padding mt-4 bg-light">
        <div className="container">
          <div className="d-flex flex-wrap justify-content-center  filter-button-group ">
            <button
              type="button"
              className="btn m-2  active-filter-btn"
              data-filter="*"
              style={{ backgroundColor: "white" }}
              onClick={() => {
                setFilterdata(apidata);
              }}
              onMouseEnter={() => setFilterdata(apidata)}
            >
              All
            </button>
            <button
              type="button"
              className="btn m-2  home-btn"
              data-filter=".best"
              style={{ backgroundColor: "white" }}
              onClick={() => {
                const data = apidata.filter((data, index) => {
                  return data.category.categoryname === "mobile";
                });

                setFilterdata(data);
              }}
              // onMouseEnter={() => {
              //   const data = apidata.filter((data, index) => {
              //     return data.category.categoryname === "mobile";
              //   });

              //   setFilterdata(data);
              // }}
            >
              Mobile
            </button>
            <button
              type="button"
              className="btn m-2  home-btn"
              data-filter=".feat"
              style={{ backgroundColor: "white" }}
              onClick={() => {
                const data = apidata.filter((data, index) => {
                  if (data.category.categoryname === "tv") {
                    return data;
                  }
                });

                setFilterdata(data);
              }}
            >
              Tv
            </button>
            <button
              type="button"
              className="btn m-2  home-btn"
              data-filter=".new"
              style={{ backgroundColor: "white" }}
              onClick={(e) => {
                const data = apidata.filter((data, index) => {
                  if (data.category.categoryname === "accessories") {
                    return data;
                  }
                });
                setFilterdata(data);
              }}
            >
              Accessories
            </button>
          </div>

          <div className="row g-lg-3">
            {filterdata.map((data, index) => (
              <ProductCard
                data={data}
                addToCart={addToCart}
                key={index}
                setCart={setCart}
              />
            ))}
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
