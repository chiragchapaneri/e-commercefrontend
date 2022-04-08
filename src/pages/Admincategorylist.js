import { productapi } from "../services/Product";
import { useJwt } from "react-jwt";
import React, { useEffect, useState } from "react";

export function AddCategoryList({ adminloginstatus }) {
  const [apidata, setApiData] = useState([]);
  const [update, setUpdate] = useState([]);

  const deleteCategory = async (id) => {
    const apicall = new productapi();
    const { data } = await apicall.deleteCategory(id, localStorage.token);
    if (data) {
      setUpdate(data);
    }
  };
  const categoryStatus = async (id, status) => {
    const apicall = new productapi();
    const { data } = await apicall.updateCategory(
      { active: status ? false : true, categoryid: id },
      localStorage.token
    );
    if (data) {
      setUpdate(data);
    }
  };

  useEffect(async () => {
    const apicall = new productapi();
    // if (pathname.match("/admin/categorylist")) {
    try {
      const { data } = await apicall.getCategory(localStorage.token);

      setUpdate(data);
      setApiData(data.data);
    } catch (er) {
      console.log(er);
    }
    // }
  }, [update]);

  return (
    <>
      <div className="navmargin container-fluid mt-5">
        <div className="table-wrapper">
          <div className="table-filter"></div>
          <table className="table table-striped table-hover">
            <thead>
              <tr>
                <th>Id</th>
                <th>categoryname</th>
                <th>status</th>

                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {apidata?.map((data, index) => (
                <tr key={data._id}>
                  <td>{index + 1}</td>

                  <td>{data.categoryname}</td>

                  <td>
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={(e) => {
                        categoryStatus(data._id, data.active);
                      }}
                    >
                      {data.active === true ? `Active` : `InActive`}
                    </button>
                  </td>

                  <td>
                    <button
                      type="button"
                      className="btn btn-danger"
                      onClick={() => {
                        deleteCategory(data._id);
                      }}
                    >
                      delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
