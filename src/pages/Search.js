import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory, useLocation, useParams } from "react-router-dom";
import { AdminProductCard } from "../components/AdminProductCard";
import { ProductCard } from "../components/ProductCard";
import { productapi } from "../services/Product";

export function Search() {
  const location = useLocation();
  const [update, setUpdate] = useState();
  const { id } = useParams();
  const [apidata, setApiData] = useState([]);

  const [productlist, setProductList] = useState([]);
  const { pathname } = useLocation();
  const [selectdata, setSelectdata] = useState([]);

  const history = useHistory();

  const setProductstatus = async (id, status) => {
    const apicall = new productapi();
    const { data } = await apicall.productUpdateStatus(
      { active: status ? false : true, productid: id },
      localStorage.token
    );
    if (data) {
      setUpdate(data);
    }
  };

  const deleteProduct = async (id) => {
    const apicall = new productapi();
    const { data } = await apicall.deleteProductByid(id, localStorage.token);
    if (data) {
      setUpdate(data);
    }
  };

  const addToCart = async (userid) => {
    !localStorage && history.push("/login");

    try {
      const callapi = new Cartapi();
      const { data } = await callapi.addToCart(
        {
          productid: userid,
          userid: parseInt(window.localStorage.id),
          quantity: 1,
        },
        window.localStorage.token
      );
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(async () => {
    if (pathname.match("admin/search")) {
      try {
        const name = { productname: location.state.data };
        const { data } = await axios.post(
          "http://localhost:3000/user/product/name",
          name
        );
        if (data) {
          setSelectdata(data.data);
        }
      } catch (err) {
        console.log(err);
      }
    } else {
      try {
        const name = { productname: location.state.data };
        const { data } = await axios.post(
          "http://localhost:3000/user/product/name",
          name
        );
        if (data) {
          if (pathname.match("admin/search")) {
            setSelectdata(data.data);
          } else {
            setProductList(data.data);
          }
        }
      } catch (err) {
        console.log(err);
      }
    }
  }, [location, id, update]);

  return (
    <>
      {!pathname.match("admin/search") && (
        <div>
          <div className="d-flex flex-wrap justify-content-start  filter-button-group bg-white mt-3 mb-1">
            <h6>
              <a className="heading" onClick={() => histor.pushy("/")}>
                Home{`>`}
              </a>
              <a className="heading">product{">"}search</a>
            </h6>
          </div>
          <section className="product_section layout_padding bg-light">
            <div className="container">
              <div className="heading_container hading_center">
                <h2 className="a"></h2>
              </div>
              <div className="row">
                {productlist &&
                  productlist.map((data, index) => {
                    return (
                      <ProductCard
                        data={data}
                        addToCart={addToCart}
                        key={index}
                      />
                    );
                  })}
              </div>
            </div>
          </section>
        </div>
      )}

      {pathname.match("/admin/search") && (
        <AdminProductCard
          selectdata={selectdata}
          setProductstatus={setProductstatus}
          deleteProduct={deleteProduct}
          setApiData={setApiData}
        />
      )}
    </>
  );
}
