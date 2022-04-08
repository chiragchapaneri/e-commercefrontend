import axios from "axios";

export class Cartapi {
  addToCart(data, token) {
    return axios.post(process.env.REACT_APP_AddToCart, data, {
      headers: { token: token },
    });
  }

  decreaseQuantity(data, token) {
    return axios.post(process.env.REACT_APP_RemoveCart, data, {
      headers: { token: token },
    });
  }

  removeCart(data, token) {
    return axios.put(process.env.REACT_APP_RemoveProductFromCart, data, {
      headers: { token: token },
    });
  }
  userCart(id, token) {
    return axios.get(process.env.REACT_APP_UserCartData + id, {
      headers: { token: token },
    });
  }
}
