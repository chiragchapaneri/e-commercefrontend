import axios from "axios";

export class OrderApi {
  orderNow(data, token) {
    return axios.post(process.env.REACT_APP_OrderNow, data, {
      headers: { token: token },
    });
  }

  orderList(token, startpage) {
    return axios.get(process.env.REACT_APP_OrderList + `?page=${startpage}`, {
      headers: { token: token },
    });
  }

  orderListAdmin(token) {
    return axios.get("http://localhost:3000/admin/orderlist", {
      headers: { token: token },
    });
  }
  shortinOrder(data, token) {
    return axios.post("http://localhost:3000/admin/orderlist/sort", data, {
      headers: { token: token },
    });
  }
}
