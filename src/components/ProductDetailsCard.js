import { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import "./productdetails.css";
export function ProductDetailsCard({ data, addToCart }) {
  const history = useHistory();

  const [images, setimage1] = useState("");

  return (
    <>
      <div className="card productdetails">
        <div className="row">
          <div className="col-md-2 ">
            {data.active === false && (
              <h5 className="text-center" style={{ color: "red" }}>
                out of stock
              </h5>
            )}

            <div className="images ">
              <div className="thumbnail text-center">
                <img
                  // onClick="change_image(this)"
                  src={data.image2 && data.image2}
                  width="100"
                  className="img-thumbnail"
                  onClick={(e) => {
                    setimage1(data.image2);
                  }}
                />
                <img
                  // onClick="change_image(this)"
                  src={data.image3 && data.image3}
                  width="100"
                  className="img-thumbnail"
                  onClick={(e) => {
                    setimage1(data.image3);
                  }}
                />
                <img
                  onClick="change_image(this)"
                  src={data.image1 && data.image1}
                  width="100"
                  className="img-thumbnail"
                  onClick={(e) => {
                    setimage1(data.image1);
                  }}
                />{" "}
                <img
                  // onClick="change_image(this)"
                  src={data.image1 && data.image1}
                  width="100"
                  className="img-thumbnail"
                  onClick={(e) => {
                    setimage1(data.image1);
                  }}
                />
              </div>
            </div>
          </div>

          <div className="col-md-5 ">
            <div className="images ">
              <div className="text-center p-4">
                <img
                  className="img-thumbnail"
                  src={!images ? data.image1 : images}
                  style={{ maxHeight: 400 }}
                />
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="product p-4">
              <div className="d-flex justify-content-between align-items-center">
                {/* <div className="d-flex align-items-center">
                  <a onClick={() => history.goBack()}>
                    <i className="fa fa-long-arrow-left">
                      <span className="ml-1">Back</span>
                    </i>
                  </a>
                </div> */}
              </div>
              <div className="mt-4 mb-3">
                <h5 className="text-uppercase">{data.productname}</h5>
                <div className="price d-flex flex-row align-items-center">
                  <h6 className="text-uppercase">
                    price: <span className="act-price">₹{data.price}</span>
                  </h6>
                </div>

                {data.storage && (
                  <div className="price d-flex flex-row align-items-center">
                    <h6 className="text-uppercase">
                      storage:
                      <span className="act-price">{data.storage}</span>
                    </h6>
                  </div>
                )}

                {data.processor && (
                  <div className="price d-flex flex-row align-items-center">
                    <h6 className="text-uppercase">
                      processor:
                      <span className="act-price">{data.processor}</span>
                    </h6>
                  </div>
                )}

                {data.ram && (
                  <div className="price d-flex flex-row align-items-center">
                    <h6 className="text-uppercase">
                      Ram:
                      <span className="act-price">{data.ram}</span>
                    </h6>
                  </div>
                )}
                {data.size && (
                  <div className="price d-flex flex-row align-items-center">
                    <h6 className="text-uppercase">
                      Size:
                      <span className="act-price">{data.size}</span>
                    </h6>
                  </div>
                )}
              </div>
              <p className="about"></p>

              <div className="cart mt-4 align-items-center">
                <button
                  className="btn btn-danger text-uppercase mr-2  pr-5"
                  onClick={() => {
                    addToCart(
                      data._id,
                      data.price,
                      data.productname,
                      data.image1
                    );
                  }}
                >
                  Add to cart <i className="fas fa-shopping-cart pr-1"></i>
                </button>

                <i className="paddin"></i>

                <button
                  className="btn btn-danger text-uppercase mr-2 pl-5 "
                  type="submit"
                  onClick={() => {
                    if (data.active === true) {
                      history.push(`/order/${data._id}`);
                    }
                  }}
                >
                  order now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
