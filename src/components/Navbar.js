import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { useLocation, useHistory, Link } from "react-router-dom";

export function Navbar({
  loginstatus,
  setLogin,
  setAdminLoginStatus,
  cart,
  setCart,
  setCartquantity,
  cartquantity,
  setLoginStatus,
}) {
  const { pathname } = useLocation();
  const pa = useParams();

  const history = useHistory();
  const [cartlength, setcartLength] = useState("");
  const [search, setSearch] = useState("");
  const data = JSON.parse(localStorage.getItem("productid"));

  useEffect(() => {
    try {
      if (loginstatus) {
      } else {
        if (data) {
          const length = data.length;
          setCart(true);
          length == 0 ? setCartquantity(0) : setCartquantity(length);
        }
      }
    } catch (er) {
      console.log(er);
    }
  }, [setCart]);

  return (
    <>
      {pathname.match("/admin") && pathname !== "/admin/login" && (
        <div>
          <section className="headertop">
            <div className="container">
              <div className="row">
                <div className="col-lg-6">
                  <div className="top-left">
                    <a href=""></a>
                  </div>
                </div>
                <div className="col-lg-6 top-reight">
                  <div className="col-lg-6 top-reight pr-3">
                    <a
                      className="a-padding"
                      onClick={(e) => {
                        e.preventDefault();
                        localStorage.removeItem("token");
                        localStorage.removeItem("role");
                        setAdminLoginStatus(false);
                        setCart(false);

                        history.push("/admin/login");
                      }}
                    >
                      Logout
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid navbara">
              <Link to="/admin">
                <label style={{ color: "white" }}> Home</label>
                {/* <h6 style={{ color: "white", paddingTop: "12" }}> Home</h6> */}
              </Link>
              <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarScroll"
                aria-controls="navbarScroll"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse" id="navbarScroll">
                <ul className="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll">
                  <li className="nav-item dropdown">
                    <a
                      className="nav-link dropdown-toggle"
                      id="navbarScrollingDropdown"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      Product
                    </a>
                    <ul
                      className="dropdown-menu navbara"
                      aria-labelledby="navbarScrollingDropdown"
                    >
                      <li className="li-center">
                        <Link to={"/admin/addproduct"}>add product</Link>
                      </li>
                      <li>
                        <a
                          className="dropdown-item"
                          onClick={() => {
                            history.push("/admin");
                          }}
                        >
                          Product List
                        </a>
                      </li>
                    </ul>
                  </li>

                  <li className="nav-item dropdown">
                    <a
                      className="nav-link dropdown-toggle"
                      href="#"
                      id="navbarScrollingDropdown"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      Category
                    </a>
                    <ul
                      className="dropdown-menu navbara"
                      aria-labelledby="navbarScrollingDropdown"
                    >
                      <li className="li-center">
                        <Link to={"/admin/addcategory"}>Add category</Link>
                      </li>
                      <li className="li-center">
                        <Link to={"/admin/categorylist"}> Category List</Link>
                      </li>
                    </ul>
                  </li>

                  <li className="nav-item dropdown">
                    <a
                      className="nav-link dropdown-toggle"
                      href="#"
                      id="navbarScrollingDropdown"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      Order
                    </a>
                    <ul
                      className="dropdown-menu navbara"
                      aria-labelledby="navbarScrollingDropdown"
                    >
                      <li className="li-center">
                        <Link to={"/admin/orderlist"}>orderlist</Link>
                      </li>
                    </ul>
                  </li>
                </ul>
                <form className="d-flex ms-auto my-3 my-lg-0">
                  <div className="input-group">
                    <input
                      className="form-control"
                      type="search"
                      placeholder="Search"
                      aria-label="Search"
                      value={search}
                      autoComplete="off"
                      onChange={(e) => {
                        setSearch(e.target.value);
                      }}
                    />
                    <button
                      className="btn btn-primary"
                      type="submit"
                      onClick={(e) => {
                        e.preventDefault();
                        search &&
                          history.push(`/admin/search`, { data: search });
                      }}
                    >
                      <i className="fas fa-search"></i>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </nav>
        </div>
      )}
      {!pathname.match("/admin") && (
        <>
          <section className="headertop">
            <div className="container">
              <div className="row">
                <div className="col-lg-6">
                  {/* <div className="top-left"> */}
                  {/* <a href="align-left">welcome</a> */}
                  {/* </div> */}
                </div>
                <div className="col-lg-6 top-reight">
                  {!localStorage.token ? (
                    <div className="col-lg-6 top-reight pr-3">
                      <div className="socialicon ">
                        <a
                          className="a-padding"
                          onClick={(e) => {
                            e.preventDefault();
                            history.push("/cart");
                          }}
                        >
                          <i
                            className="fas fa-shopping-cart pr-1"
                            style={{ color: "white" }}
                          ></i>

                          {cart
                            ? `Cart (${cartquantity})`
                            : `Cart (${cartquantity})`}
                        </a>
                      </div>

                      <a
                        className="a-padding"
                        onClick={(e) => {
                          e.preventDefault();
                          history.push("/login");
                        }}
                      >
                        Login
                      </a>

                      <a
                        className="a-padding"
                        onClick={(e) => {
                          e.preventDefault();
                          history.push("/signup");
                        }}
                      >
                        Signup
                      </a>
                    </div>
                  ) : (
                    <div className="col-lg-9 top-reight pr-3">
                      <div className="socialicon ">
                        <a
                          className="a-padding"
                          onClick={(e) => {
                            e.preventDefault();
                            history.push("/cart");
                          }}
                        >
                          <i
                            className="fas fa-shopping-cart pr-1"
                            style={{ color: "white" }}
                          ></i>{" "}
                          {cart
                            ? `Cart (${cartquantity})`
                            : `cart (${cartquantity})`}
                        </a>
                      </div>

                      <a
                        className="a-padding"
                        onClick={(e) => {
                          e.preventDefault();
                          history.push(`/orderlist`);
                        }}
                      >
                        MyoOder
                      </a>

                      <a
                        className="a-padding"
                        onClick={() => {
                          history.push(`/profile/${localStorage.id}`);
                        }}
                      >
                        Profile
                      </a>

                      <a
                        className="a-padding"
                        onClick={() => {
                          localStorage.removeItem("token");
                          localStorage.removeItem("id");
                          setCart(false);
                          setLoginStatus();
                          setCartquantity(0);
                          history.push("/");
                        }}
                      >
                        Logout
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </section>
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
              <a
                className="navbar-brand"
                style={{
                  cursor: "pointer",
                }}
                onClick={() => {
                  history.push("/");
                }}
              >
                Home
              </a>
              <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon"></span>
              </button>

              <div
                className="collapse navbar-collapse"
                id="navbarSupportedContent"
              >
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                  <li className="nav-item">
                    <div className="nav-link">
                      <a
                        className="nav-link"
                        aria-current="page"
                        onClick={(e) => {
                          e.preventDefault();
                          history.push("/product/mobile");

                          // history.push("/product/mobile");
                        }}
                      >
                        Mobile
                      </a>
                    </div>
                  </li>

                  <li className="nav-item">
                    <div className="nav-link">
                      <a
                        className="nav-link"
                        onClick={(e) => {
                          e.preventDefault();
                          history.push("/product/tv");
                        }}
                      >
                        Tv
                      </a>
                    </div>
                  </li>
                  <li className="nav-item">
                    <div className="nav-link">
                      <a
                        className="nav-link"
                        onClick={(e) => {
                          e.preventDefault();
                          history.push("/product/accessories");
                        }}
                      >
                        Accessories
                      </a>
                    </div>
                  </li>
                </ul>
                <form className="d-flex">
                  <input
                    className="form-control me-2"
                    type="search"
                    placeholder="Search"
                    aria-label="Search"
                    value={search}
                    autoComplete="off"
                    onChange={(e) => {
                      setSearch(e.target.value);
                    }}
                  />

                  <span className="align">
                    <i
                      className="fas fa-search"
                      onClick={() => {
                        search && history.push("/search", { data: search });
                      }}
                    ></i>
                  </span>
                </form>
              </div>
            </div>
          </nav>
        </>
      )}
    </>
  );
}
