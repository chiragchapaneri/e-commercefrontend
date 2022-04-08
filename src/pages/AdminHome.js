import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { AdminProductCard } from "../components/AdminProductCard";
import { productapi } from "../services/Product";
import { useJwt } from "react-jwt";

export function AdminHome({ adminloginstatus }) {
  const history = useHistory();

  const [apidata, setApiData] = useState([]);
  const [update, setUpdate] = useState();

  const { pathname } = useLocation();

  const token = localStorage.getItem("token");

  if (!token) history.push("/admin/login");
  if (token) {
    const { decodedToken } = useJwt(token);
    if (!decodedToken?.role == "admin") history.push("/admin/login");
  }

  const setProductstatus = async (id, status) => {
    const apicall = new productapi();
    const { data } = await apicall.productUpdateStatus(
      { active: status ? false : true, productid: id },
      localStorage.token
    );
    if (data) {
      setUpdate(data);
    }
  };

  const deleteProduct = async (id) => {
    const apicall = new productapi();
    const { data } = await apicall.deleteProductByid(id, localStorage.token);
    if (data) {
      setUpdate(data);
    }
  };

  useEffect(async () => {
    const apicall = new productapi();

    if (pathname.match("/admin")) {
      try {
        const data = await apicall.getProductAdmin(localStorage.token);
        if (data) {
          setUpdate(data.message);
          setApiData(data.data.data);
        }
      } catch (err) {
        if (err?.response.status === 401) {
          history.push("/admin/login");
        }
      }
    }
  }, [update]);

  return (
    <>
      {pathname === "/admin" && (
        <AdminProductCard
          selectdata={apidata}
          setProductstatus={setProductstatus}
          deleteProduct={deleteProduct}
          setApiData={setApiData}
        />
      )}
    </>
  );
}
