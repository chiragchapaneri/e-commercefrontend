import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useJwt } from "react-jwt";
import { productapi } from "../services/Product";

export function UpdateProduct() {
  const history = useHistory();

  const { decodedToken } = useJwt(localStorage.token);

  if (localStorage.token) {
    if (!decodedToken?.role == "admin") history.push("/admin/login");
  }

  const [productname, setProductname] = useState("");
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
  const [validcolor, setValidColor] = useState("");
  const [validstorage, setValidStorage] = useState("");
  const [validimage1, setValidImage1] = useState("");
  const [validimage2, setValidImage2] = useState("");
  const [validimage3, setValidImage3] = useState("");

  const { id } = useParams();
  const [aapidata, setAapiData] = useState([]);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (
      productname === "" ||
      price < 0 ||
      quantity < 0 ||
      ram === "" ||
      size === "" ||
      processor === "" ||
      color === "" ||
      storage === ""
    ) {
      !productname && setValidproductname("productname is require");
      price <= 0 && setValidPrice("product price must me more then 0");
      quantity <= 0 && setValidQuantity("product quantity must me more then 0");

      !color && setValidColor("product color is require");
    } else {
      const apicall = new productapi();
      const apidata = new FormData();
      image1 && apidata.append("image1", image1);
      image2 && apidata.append("image2", image2);
      image3 && apidata.append("image3", image3);
      apidata.append("productname", productname);
      apidata.append("processor", processor);
      apidata.append("productid", id);
      apidata.append("quantity", quantity);
      apidata.append("price", parseInt(price));
      apidata.append("ram", ram);
      apidata.append("size", size);
      apidata.append("color", color);
      apidata.append("storage", storage);

      const { data } = await apicall.productUpdate(apidata, localStorage.token);
      if (data) {
        history.push("/admin");
      }
    }
  };

  useEffect(async () => {
    try {
      const apicall = new productapi();
      const { data } = await apicall.getProductById(id);
      if (data) {
        setProductname(data.data.productname);
        setPrice(data.data.price);
        setQuantity(data.data.quantity);
        setRam(data.data.ram);
        setSize(data.data.size);
        setColor(data.data.color);
        setProcessor(data.data.processor);
        setStorage(data.data.storage);
        setAapiData(data.data);
        setImage1(data.image1);
        setImage2(data.image2);
        setImage3(data.image3);
      }
    } catch (err) {
      console.log(err);
    }
  }, [id, setAapiData]);

  return (
    <div className="login-page bg-light pt-4">
      <div className="container">
        <div className="row">
          <div className="col-lg-8 offset-lg-1">
            <h3 className="mb-3">Product Update</h3>
            <div className="bg-white shadow rounded">
              <div className="row">
                <div className="col-md-7 pe-0">
                  <div className="form-left h-100 py-5 px-5">
                    <form className="row g-4">
                      <div className="col-12">
                        <label className="labels">product name</label>
                        <label className="err">{validproductname}</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="product name"
                          name="productname"
                          value={productname}
                          autoComplete="off"
                          onChange={(e) => setProductname(e.target.value)}
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
                        <label className="labels">Quantity</label>
                        <label className="err">{validquantity}</label>
                        <input
                          type="number"
                          className="form-control"
                          placeholder="enter product quantity"
                          name="quantity"
                          value={quantity}
                          autoComplete="off"
                          onChange={(e) => setQuantity(e.target.value)}
                        />
                      </div>
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
                          onChange={(e) => setStorage(e.target.value)}
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
                          onChange={(e) => setRam(e.target.value)}
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
                          onChange={(e) => setSize(e.target.value)}
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
                          onChange={(e) => setProcessor(e.target.value)}
                        />
                      </div>
                      <div className="col-md-12">
                        <label className="labels">Color</label>
                        {/* <label className="err">{validcolor}</label> */}

                        <input
                          type="text"
                          className="form-control"
                          placeholder="enter product product color"
                          name="color"
                          value={color}
                          autoComplete="off"
                          onChange={(e) => setColor(e.target.value)}
                        />
                      </div>
                      <div className="col-md-12">
                        <label className="labels">image1</label>
                        <label className="err">{validimage1}</label>
                        <input
                          type="file"
                          name="file"
                          className="form-control"
                          autoComplete="off"
                          onChange={(e) => setImage1(e.target.files[0])}
                          value=""
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
                          value=""
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
                          value=""
                        />
                      </div>
                      <div className="col-12">
                        <button
                          type="submit"
                          className="btn btn-primary px-4 float-end mt-4"
                          onClick={(e) => {
                            onSubmit(e);
                          }}
                        >
                          Update Product
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
