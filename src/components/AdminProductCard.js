import { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import { productapi } from "../services/Product";

export function AdminProductCard({
  selectdata,
  setProductstatus,
  deleteProduct,
  setApiData,
}) {
  const history = useHistory();
  const [price, setPrice] = useState("");
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");

  const priceFilter = async (value) => {
    const apicall = new productapi();
    if (value === "price") {
      const { data } = await apicall.filterProduct(
        { price: price ? "-1" : "1" },
        localStorage.token
      );
      setPrice(price ? "" : "1");
      if (data) {
        setApiData(data.data);
      }
    }
    if (value === "name") {
      const { data } = await apicall.filterProduct(
        { name: name ? "-1" : "1" },
        localStorage.token
      );
      setName(name ? "" : "1");
      if (data) {
        setApiData(data.data);
      }
    }
  };

  return (
    <>
      <div className="navmargin container-fluid mt-5">
        <div className="table-wrapper">
          <div className="table-filter"></div>
          <table className="table table-striped table-hover">
            <thead>
              <tr>
                <th>Id</th>
                <th>
                  Product{" "}
                  <i
                    className="fas fa-arrows-v"
                    onClick={() => priceFilter("name")}
                  ></i>
                </th>
                <th>
                  Categoy{" "}
                  {/*  <i
                    className="fas fa-arrows-v"
                    onClick={() => priceFilter("category")}
                  ></i> */}
                </th>
                <th>Quantity</th>
                <th>
                  Price{" "}
                  <i
                    className="fas fa-arrows-v"
                    onClick={() => priceFilter("price")}
                  ></i>
                </th>
                <th>Action</th>
                <th>Action</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {selectdata &&
                selectdata.map((data, index) => (
                  <tr key={data._id}>
                    <td>{index + 1}</td>
                    <td>
                      <img
                        src={data.image1}
                        className="avatar"
                        alt="Avatar"
                        height={50}
                        width={50}
                      />
                      {data.productname}
                    </td>
                    <td>
                      {data.category?.categoryname &&
                        data.category.categoryname}
                    </td>
                    <td>{data.quantity}</td>
                    <td>{data.price}</td>

                    <td>
                      <button
                        type="button"
                        className="btn btn-primary"
                        onClick={() => setProductstatus(data._id, data.active)}
                      >
                        {data.active === true ? `Active` : `InActive`}
                      </button>
                    </td>
                    <td>
                      <button
                        type="button"
                        className="btn btn-primary"
                        onClick={() =>
                          history.push(`/admin/product/update/${data._id}`)
                        }
                      >
                        update
                      </button>
                    </td>
                    <td>
                      <button
                        type="button"
                        className="btn btn-danger"
                        onClick={() => deleteProduct(data._id)}
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
