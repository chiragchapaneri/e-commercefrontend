import axios from "axios";

export class Adminapi {
  login(data) {
    return axios.post(process.env.REACT_APP_AdminLogin, data);
  }
}
