import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { productapi } from "../services/Product";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useJwt } from "react-jwt";

export function AddProduct() {
  const { decodedToken } = useJwt(localStorage.token);

  if (localStorage.token) {
    if (!decodedToken?.role == "admin") history.push("/admin/login");
  } else {
    history.push("/admin/login");
  }
  const history = useHistory();

  const [productname, setProductname] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [ram, setRam] = useState("");
  const [size, setSize] = useState("");
  const [processor, setProcessor] = useState("");
  const [color, setColor] = useState("");
  const [storage, setStorage] = useState("");
  const [image1, setImage1] = useState();
  const [image2, setImage2] = useState();
  const [image3, setImage3] = useState();

  const [validproductname, setValidproductname] = useState("");

  const [validprice, setValidPrice] = useState("");
  const [validquantity, setValidQuantity] = useState("");
  const [validimage1, setValidImage1] = useState("");
  const [validcategory, setValidcategory] = useState("");
  const [apidata, setApiData] = useState([]);
  const [details, setDetails] = useState("");

  const [err, setErr] = useState({ productname: "" });

  const onSubmit = async (e) => {
    e.preventDefault();
    if (
      productname === "" ||
      price <= 0 ||
      quantity < 0 ||
      category === "" ||
      !image1
    ) {
      !productname && setValidproductname("productname is require");

      price <= 0 && setValidPrice("product price must me more then 0");
      quantity <= 0 && setValidQuantity("product quantity must me more then 0");

      !image1 && setValidImage1("Product imaage is require");

      !category && setValidcategory("Product category is require");
    } else {
      const apicall = new productapi();
      const apidata = new FormData();
      apidata.append("image1", image1);
      image2 && apidata.append("image2", image2);
      image3 && apidata.append("image3", image3);
      apidata.append("productname", productname);
      apidata.append("category", category);
      apidata.append("quantity", quantity);
      apidata.append("price", price);
      apidata.append("ram", ram);
      apidata.append("size", ram);
      apidata.append("color", color);
      apidata.append("storage", storage);
      apidata.append("other", details);
      try {
        const { data } = await apicall.productAdd(apidata, localStorage.token);
        if (data) {
          toast.success("product is add successfull");
          history.push("/admin");
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  useEffect(async () => {
    try {
      const apicall = new productapi();
      const { data } = await apicall.getCategory(localStorage.token);
      if (data) {
        setApiData(data.data);
      }
    } catch (err) {
      console.log(err);
    }
  }, [category]);

  return (
    <>
      <div className="login-page bg-light pt-4">
        <div className="container">
          <div className="row ">
            <div className="col-lg-10 offset-lg-1">
              <h3 className="mb-3">Product Add</h3>
              <div className="bg-white shadow rounded">
                <div className="row">
                  <div className="col-md-7 pe-0">
                    <div className="form-left h-100 py-5 px-5">
                      <form className="row g-4">
                        <div className="col-12">
                          {/* <label className="labels">product name</label> */}
                          <label className="err">{validproductname}</label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="product name"
                            name="productname"
                            value={productname}
                            autoComplete="off"
                            onChange={(e) => {
                              setProductname(e.target.value);
                            }}
                          />
                        </div>

                        <div className="col-12">
                          <div className="col-12">
                            {" "}
                            <label className="err">{validcategory}</label>
                            <div className="form-group">
                              <select
                                className="form-select"
                                placeholder="city"
                                autoComplete="off"
                                onChange={(e) => setCategory(e.target.value)}
                              >
                                <option>Select category</option>
                                {apidata.map((data, index) => (
                                  <option
                                    key={index}
                                    value={data._id}
                                    name={data.categoryname}
                                  >
                                    {data.categoryname}{" "}
                                  </option>
                                ))}
                              </select>
                            </div>
                          </div>
                        </div>

                        <div className="col-12">
                          <label className="labels">Quantity</label>
                          <label className="err">{validquantity}</label>
                          <input
                            type="number"
                            className="form-control"
                            placeholder="enter product  quantity"
                            name="quantity"
                            value={quantity}
                            autoComplete="off"
                            onChange={(e) => {
                              setQuantity(e.target.value);
                            }}
                          />
                        </div>
                        <div className="col-12">
                          <label className="labels">price</label>
                          <label className="err">{validprice}</label>
                          <input
                            type="number"
                            className="form-control"
                            placeholder="enter product  price"
                            name="price"
                            value={price}
                            autoComplete="off"
                            onChange={(e) => setPrice(e.target.value)}
                          />
                        </div>
                        <div className="col-md-12">
                          <label className="labels">size</label>
                          {/* <label className="err">{validsize}</label> */}

                          <input
                            type="text"
                            className="form-control"
                            placeholder="enter product size"
                            name="size"
                            value={size}
                            autoComplete="off"
                            onChange={(e) => {
                              setSize(e.target.value);
                            }}
                          />
                        </div>

                        <div>
                          <div className="col-md-12">
                            <label className="labels">Storage</label>
                            {/* <label className="err">{validstorage}</label> */}

                            <input
                              type="text"
                              className="form-control"
                              placeholder="enter product Storage"
                              name="storage"
                              value={storage}
                              autoComplete="off"
                              onChange={(e) => {
                                setStorage(e.target.value);
                              }}
                            />
                          </div>
                          <div className="col-md-12">
                            <label className="labels">Ram</label>
                            {/* <label className="err">{validsize}</label> */}

                            <input
                              type="text"
                              className="form-control"
                              placeholder="enter product size"
                              name="ram"
                              value={ram}
                              autoComplete="off"
                              onChange={(e) => {
                                setRam(e.target.value);
                              }}
                            />
                          </div>

                          <div className="col-md-12">
                            <label className="labels">processor</label>
                            {/* <label className="err">{validprocessor}</label> */}

                            <input
                              type="text"
                              className="form-control"
                              placeholder="enter product processor"
                              name="processor"
                              value={processor}
                              autoComplete="off"
                              onChange={(e) => {
                                setProcessor(e.target.value);
                              }}
                            />
                          </div>
                        </div>

                        <div className="col-md-12">
                          <label className="labels">Color</label>
                          {/* <label className="err">{validcolor}</label> */}

                          <input
                            type="text"
                            className="form-control"
                            placeholder="enter product product color"
                            value={color}
                            autoComplete="off"
                            onChange={(e) => {
                              setColor(e.target.value);
                            }}
                          />
                        </div>
                        {category !== "3" && (
                          <div className="col-md-12">
                            <label className="labels">Details</label>
                            {/* <label className="err">{validcolor}</label> */}

                            <textarea
                              className="form-control"
                              type="text"
                              placeholder="enter product product Detilas"
                              value={details}
                              autoComplete="off"
                              onChange={(e) => {
                                setDetails(e.target.value);
                              }}
                            />
                          </div>
                        )}

                        <div className="col-md-12">
                          <label className="labels">image1</label>
                          <label className="err">{validimage1}</label>
                          <input
                            type="file"
                            name="file"
                            className="form-control"
                            autoComplete="off"
                            onChange={(e) => setImage1(e.target.files[0])}
                          />
                        </div>
                        <div className="col-md-12">
                          <label className="labels">image2</label>
                          <input
                            type="file"
                            name="file"
                            className="form-control"
                            autoComplete="off"
                            onChange={(e) => setImage2(e.target.files[0])}
                          />
                        </div>
                        <div className="col-md-12">
                          <label className="labels">image3</label>
                          <input
                            type="file"
                            name="file"
                            className="form-control"
                            autoComplete="off"
                            onChange={(e) => setImage3(e.target.files[0])}
                          />
                        </div>
                        <div className="col-12">
                          <button
                            type="submit"
                            className="btn btn-primary px-4 float-end mt-4"
                            onClick={(e) => onSubmit(e)}
                          >
                            AddProduct
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>{" "}
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
      </div>
    </>
  );
}
