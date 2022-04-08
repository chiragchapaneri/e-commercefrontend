import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { productapi } from "../services/Product";
import { useJwt } from "react-jwt";

export function AddCategory() {
  const history = useHistory();
  const { decodedToken } = useJwt(localStorage.token);

  if (localStorage.token) {
    if (!decodedToken?.role == "admin") history.push("/admin/login");
  } else {
    history.push("/admin/login");
  }
  const [categoryname, setCategoryName] = useState("");
  const [validcategory, setValidCategoryName] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    if (categoryname === "") {
      !categoryname && setValidCategoryName("categoryname is require");
    } else {
      const apicall = new productapi();

      try {
        const data = await apicall.addCategory(
          { categoryname: categoryname },
          localStorage.token
        );
        if (data) {
          history.push("/admin");
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <div className="category-page bg-light pt-4">
      <div className="container">
        <div className="row ">
          <div className="col-lg-10 offset-lg-1">
            <h3 className="mb-3">Category Add</h3>
            <div className="bg-white shadow rounded">
              <div className="row">
                <div className="col-md-7 pe-0">
                  <div className="form-left h-100 py-5 px-5">
                    <form action="" className="row g-4">
                      <div className="col-12">
                        <label className="labels">Category name</label>
                        <label className="err">{validcategory}</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter Category Name"
                          name="categoryname"
                          value={categoryname}
                          autoComplete="off"
                          onChange={(e) => {
                            setCategoryName(e.target.value);
                          }}
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
      </div>
    </div>
  );
}
