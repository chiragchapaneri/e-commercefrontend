import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { OrderApi } from "../services/Order";

export function AdminOrderList() {
  const history = useHistory();
  const [name, setName] = useState();
  const [location, setLocation] = useState();
  const [date, setDate] = useState();
  const [apidata, setApiData] = useState([]);
  const [startpage, setStartpage] = useState(0);

  // const pagenumber = [];
  const [pagenumber, setPageNumber] = useState([]);
  const sortingData = async (value) => {
    const apicall = new OrderApi();
    if (value === "productname") {
      const { data } = await apicall.shortinOrder(
        { productname: name ? -1 : 1 },
        localStorage.token
      );
      setName(name ? "" : "1");
      if (data) {
        setApiData(data.data);
      }
    }
    if (value === "location") {
      const { data } = await apicall.shortinOrder(
        { location: location ? -1 : 1 },
        localStorage.token
      );
      setLocation(location ? "" : "1");
      if (data) {
        setApiData(data.data);
      }
    }
    if (value === "date") {
      const { data } = await apicall.shortinOrder(
        { date: date ? -1 : 1 },
        localStorage.token
      );
      setDate(date ? "" : "1");
      if (data) {
        setApiData(data.data);
      }
    }
  };

  const chnagepage = (data) => {
    setStartpage(data - 1);
  };

  useEffect(async () => {
    try {
      const apicall = new OrderApi();
      const { data } = await apicall.orderListAdmin(localStorage.token);
      if (data) {
        const totalpage = Math.ceil(data.data.length / 7);

        const datas = data.data.splice(startpage * 5, 7);
        setApiData(datas);
        let pagenumbers = [];
        for (let i = 1; i <= totalpage; i++) {
          pagenumbers.push(i);
        }

        setPageNumber(pagenumbers);
      }
      console.log(pagenumber);
    } catch (err) {
      console.log(err);
    }
  }, [setApiData, startpage]);

  return (
    <>
      <div className="container mt-5">
        <div className="table-wrapper">
          <div className="table-filter"></div>
          <table className="table table-striped table-hover">
            <thead>
              <tr>
                <th>No</th>
                <th>
                  User
                  <i
                    className="fas fa-arrows-v"
                    onClick={() => sortingData("productname")}
                  ></i>
                </th>
                <th>
                  product
                  <i
                    className="fas fa-arrows-v"
                    onClick={() => sortingData("productname")}
                  ></i>
                </th>
                <th>
                  Location
                  <i
                    className="fas fa-arrows-v"
                    onClick={() => sortingData("location")}
                  ></i>
                </th>
                <th>
                  Order Date
                  <i
                    className="fas fa-arrows-v"
                    onClick={() => sortingData("date")}
                  ></i>
                </th>
                <th>quantity</th>
                <th>price</th>
                <th>total</th>
              </tr>
            </thead>
            <tbody>
              {apidata?.map((data, index) => (
                <tr key={index}>
                  <td>{startpage * 7 + index + 1}</td>
                  <td>
                    <a>
                      <img
                        src={data.user[0].image}
                        className="avatar"
                        alt="Avatar"
                        height={50}
                      />
                    </a>
                    {data.user[0].firstname}
                  </td>
                  <td>
                    <a>
                      <img
                        src={data.productid[0].image1}
                        className="avatar"
                        alt="Avatar"
                        height={50}
                      />
                    </a>
                    {data.productid[0].productname}
                  </td>
                  <td>{data.city}</td>
                  <td>{data.date}</td>
                  <td>
                    <td>{data.quantity}</td>
                  </td>
                  <td>₹{data.productid[0].price}</td>
                  <td>₹{data.productid[0].price * data.quantity}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {apidata?.length > 0 && (
            <nav aria-label="...">
              <ul className="pagination">
                <li className="page-item ">
                  <a
                    style={{ cursor: "pointer" }}
                    className="page-link"
                    onClick={() => startpage > 0 && setStartpage(startpage - 1)}
                  >
                    Previous
                  </a>
                </li>
                {pagenumber?.map((data, index) => {
                  // if (data <= 2) {
                  return (
                    <li
                      className={`${
                        data == startpage + 1
                          ? ` page-item active`
                          : `page-item `
                      }`}
                      key={index}
                      id={`page${data}`}
                    >
                      <a
                        className="page-link "
                        onClick={() => chnagepage(data)}
                        style={{ cursor: "pointer" }}
                      >
                        {data}
                      </a>
                    </li>
                  );
                })}

                <li className="page-item">
                  <a
                    className="page-link "
                    style={{ cursor: "pointer" }}
                    onClick={() =>
                      startpage < pagenumber.length - 1 &&
                      setStartpage(startpage + 1)
                    }
                  >
                    Next
                  </a>
                </li>
              </ul>
            </nav>
          )}
        </div>
      </div>
    </>
  );
}
