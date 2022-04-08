import { useHistory, Link, NavLink } from "react-router-dom";

export function ProductCard({ data, addToCart }) {
  const history = useHistory();
  return (
    <>
      <div className="  col-md-6 col-lg-4 col-xl-3 p-4 col-9 g-5 ">
        <div className=" card  d-flex justify-content-center in  bg-white productlist">
          <span
            className="fas fa-shopping-cart pr-5 text-center invisible cart-btn"
            style={{ cursor: "pointer" }}
            onClick={() => {
              addToCart(data._id, data.price, data.productname, data.image1);
            }}
          >
            <a style={{ font: "Sans-serif" }}> ADD TO CART</a>
          </span>

          {/* <i style={{ color: "dark" }}></i> */}
          {/* </button> */}
          {/* </div> */}
          {data.active === false && (
            <h2 className="text-center" style={{ color: "red" }}>
              out of stock
            </h2>
          )}

          <NavLink to={`/productdetails/${data._id}`}>
            <img
              src={data.avatar}
              className="w-100"
              height={100}
              width={100}
              style={{ paddingTop: 10, paddingLeft: 10, paddingRight: 10 }}
            />
          </NavLink>

          <div className="text-center ">
            <p className="text-capitalize text-cente pt-2">
              {data.productname}
            </p>
            {/* <p className="text-capitalize text-cente ">₹{data.price}</p> */}
            <span className="text-capitalize mx-2 " style={{ color: "orange" }}>
              ₹{data.price}
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
