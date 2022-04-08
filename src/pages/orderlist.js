import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { OrderApi } from "../services/Order";
import queryString from "query-string";
import { useLocation } from "react-router-dom";

export function OrderList({}) {
  const history = useHistory();
  const [apidata, setApiData] = useState([]);
  const [length, setLength] = useState();
  const [startpage, setStartpage] = useState(1);
  //use for get query string params data
  const page = new URLSearchParams(useLocation().search).get("page");
  // const { page } = useParams();
  //

  useEffect(async () => {
    try {
      const apicall = new OrderApi();
      const { data } = await apicall.orderList(localStorage.token, startpage);
      if (data) {
        setApiData(data.data);
        setLength(data.length);
      }
    } catch (err) {
      console.log(err);
    }
  }, [startpage, setLength]);

  return (
    <>
      <div className="container mt-5">
        <div className="table-wrapper">
          <div className="table-filter"></div>
          <table className="table table-striped table-hover">
            <thead>
              <tr>
                <th>No</th>
                <th>product</th>
                <th>Location</th>
                <th>Order Date</th>
                <th>quantity</th>
                <th>price</th>
                <th>total</th>
              </tr>
            </thead>
            <tbody>
              {apidata?.map((data, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>
                    <a>
                      <img
                        src={data.productid.image1}
                        className="avatar"
                        alt="Avatar"
                        height={50}
                      />{" "}
                    </a>{" "}
                    {data.productid.productname}
                  </td>
                  <td>{data.city}</td>

                  <td>{data.date}</td>

                  <td>{data.quantity}</td>
                  <td>₹{data.productid.price}</td>
                  <td>₹{data.productid.price * data.quantity}</td>
                </tr>
              ))}
            </tbody>
            <nav aria-label="Page navigation example">
              <ul className="pagination">
                <li className="page-item">
                  <a
                    className="page-link"
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      startpage >= 1 && setStartpage(startpage - 1);
                    }}
                  >
                    Previous
                  </a>
                </li>

                {/* {apidata.map((data, index) => {
                  return <h1 key={index}>a</h1>;
                })} */}

                {/* {()=>for(let first of second) {third}} */}

                <li className="page-item">
                  <a
                    className="page-link"
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      startpage < length && setStartpage(startpage + 1);
                    }}
                  >
                    Next{`${startpage},${length}`}
                  </a>
                </li>
              </ul>
            </nav>
          </table>
        </div>
      </div>
    </>
  );
}
