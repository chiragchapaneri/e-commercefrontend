import axios from "axios";

export class productapi {
  getProduct() {
    return axios.get(process.env.REACT_APP_AllProduct);
  }

  productByName(data) {
    return axios.post(process.env.REACT_APP_FindProductByName, data, {
      headers: { token: token },
    });
  }

  getProductById(id) {
    return axios.get(process.env.REACT_APP_FindProductById + id);
  }

  getProductByCategory(data) {
    return axios.get(process.env.REACT_APP_GetProductByCategory + data);
  }

  getProductAdmin(token) {
    return axios.get(process.env.REACT_APP_GetProductForAdmin, {
      headers: { token: token },
    });
  }

  productUpdate(data, token) {
    return axios.put(process.env.REACT_APP_ProductUpdate, data, {
      headers: { "Content-Type": "multipart/form-data", token: token },
    });
  }

  productAdd(data, token) {
    return axios.post(process.env.REACT_APP_ProductAdd, data, {
      headers: { "Content-Type": "multipart/form-data", token: token },
    });
  }

  productUpdateStatus(data, token) {
    return axios.put(process.env.REACT_APP_ProductUpdateStatus, data, {
      headers: { token: token },
    });
  }

  getCategory(token) {
    return axios.get(process.env.REACT_APP_GetCategory, {
      headers: { token: token },
    });
  }

  deleteProductByid(id, token) {
    return axios.delete(process.env.REACT_APP_ProductDeleteByID + id, {
      headers: { token: token },
    });
  }

  addCategory(data, token) {
    return axios.post(process.env.REACT_APP_AddCategory, data, {
      headers: { token: token },
    });
  }

  updateCategory(data, token) {
    return axios.put(process.env.REACT_APP_UpdateCategory, data, {
      headers: { token: token },
    });
  }

  deleteCategory(id, token) {
    return axios.delete(process.env.REACT_APP_DeleteCategory + id, {
      headers: { token: token },
    });
  }
  filterProduct(data, token) {
    return axios.post("http://localhost:3000/admin/product", data, {
      headers: { token: token },
    });
  }

  sortProduct(data) {
    return axios.post("http://localhost:3000/user/product/filter", data);
  }
}
