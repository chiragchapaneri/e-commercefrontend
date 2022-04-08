import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { Cartapi } from "../services/Cart";
import { OrderApi } from "../services/Order";
import { productapi } from "../services/Product";

export function Order({ loginstatus, setCartquantity }) {
  const history = useHistory();
  if (!loginstatus) history.push("/login");

  const [apidata, setApiData] = useState([]);
  const [addressline1, setAddressLine1] = useState("");
  const [line2, setLine2] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [validaddressline1, setValidAddressLine1] = useState("");
  const [validline2, setValidLine2] = useState("");
  const [validcity, setValidCity] = useState("");
  const [validstate, setvalidstate] = useState("");
  const [singleorder, setSingleorder] = useState([]);

  const { id } = useParams();

  const onSubmit = async (e) => {
    e.preventDefault();

    if (addressline1 === "" || line2 === "" || city === "" || state === "") {
      !addressline1
        ? setValidAddressLine1("Address Line 1 is require")
        : setValidAddressLine1("");
      !line2 ? setValidLine2("Address Line 2 is require") : setValidLine2("");
      !city ? setValidCity("City is require ") : setValidCity("");
      !state ? setvalidstate("State is require") : setvalidstate("");
    } else {
      setValidAddressLine1("");
      setValidLine2("");
      setValidCity("");
      setvalidstate("");
      const orderdata = apidata?.filter((data, index) => {
        if (data.message === "avalible") {
          return data;
        }
      });

      if (orderdata.length !== 0) {
        orderdata.addressline1 = addressline1;
        orderdata.addressline2 = line2;
        orderdata.city = city;
        orderdata.state = state;
        const orderApicall = new OrderApi();
        const { data } = await orderApicall.orderNow(
          orderdata,
          localStorage.getItem("token")
        );
        if (data) {
          setCartquantity(0);
          history.push("/");
        }
      } else {
        if (singleorder) {
          singleorder.addressline1 = addressline1;
          singleorder.addressline2 = line2;
          singleorder.city = city;
          singleorder.state = state;
          singleorder.userid = localStorage.getItem("id");
          singleorder.quantity = 1;
          const orderApicall = new OrderApi();
          const { data } = await orderApicall.orderNow(
            singleorder,
            localStorage.getItem("token")
          );
          if (data) {
            setCartquantity(0);
            history.push("/");
          }
        }
      }
    }
  };

  useEffect(async () => {
    try {
      if (id) {
        const apicall = new productapi();
        const { data } = await apicall.getProductById(id);
        if (data) {
          if (data.data.quantity < 0 || data.data.active === false) {
            history.goBack();
          } else {
            setSingleorder(data.data);
          }
        }
      } else {
        const apicall = new Cartapi();

        const { data } = await apicall.userCart(
          localStorage.getItem("id"),
          localStorage.getItem("token")
        );
        if (data) {
          setApiData(data.data);
        }
      }
    } catch (err) {
      console.log(err);
    }
  }, []);

  return (
    <>
      <section class="order-form my-4 mx-4 mt-3">
        <div class="container pt-4">
          <div class="row">
            <div class="col-12 center">
              <h1 className="text-center">Order Now</h1>
              {/* <span>with some explanation below</span> */}
              {/* <hr class="mt-1"> */}
            </div>
            <div class="col-12">
              <div class="row mx-4">
                {/* <div class="col-12 mb-2">
                  <label class="order-form-label">Name</label>
                </div> */}
                <div class="col-12 ">
                  <input
                    class="order-form-input"
                    type="text"
                    name="addressline1"
                    placeholder="Address Line 1"
                    value={addressline1}
                    autoComplete="off"
                    onChange={(e) => {
                      setAddressLine1(e.target.value);
                    }}
                  />
                </div>
                <div class="col-12 ">
                  <input
                    class="order-form-input"
                    type="text"
                    name="line2"
                    placeholder="Address Line 2"
                    value={line2}
                    autoComplete="off"
                    onChange={(e) => {
                      setLine2(e.target.value);
                    }}
                  />
                </div>
              </div>

              <div class="row mt-2 mx-4">
                <div class="col-12 col-sm-6 mt-2 pr-sm-2">
                  <input
                    class="order-form-input"
                    name="city"
                    placeholder="Enter city"
                    value={city}
                    autoComplete="off"
                    onChange={(e) => {
                      setCity(e.target.value);
                    }}
                  />
                </div>
                <div class="col-12 col-sm-6 mt-2 pl-sm-0">
                  <input
                    class="order-form-input"
                    // placeholder="state"
                    name="state"
                    placeholder="Enter state"
                    value={state}
                    autoComplete="off"
                    onChange={(e) => {
                      setState(e.target.value);
                    }}
                  />
                </div>
              </div>

              <div class="row mt-2">
                <div class="col-12">
                  <button
                    type="button"
                    id="btnSubmit"
                    class="btn btn-primary d-block mx-auto btn-submit"
                    // style={{ backgroundColor: "blue" }}
                    onClick={(e) => onSubmit(e)}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
