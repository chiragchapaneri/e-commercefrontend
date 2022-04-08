import axios from "axios";

export class Userapi {
  login(data) {
    return axios.post(process.env.REACT_APP_UserLogin, data);
  }

  signup(data, headers) {
    return axios.post(process.env.REACT_APP_Usersignup, data, headers);
  }

  profile(data, token) {
    return axios.post(process.env.REACT_APP_UserProfile, data, {
      headers: { "Content-Type": "multipart/form-data", token: token },
    });
  }

  getState() {
    return axios.get(process.env.REACT_APP_GetStateList);
  }

  getDetails(id, token) {
    return axios.get(process.env.REACT_APP_UserDeatils + id, {
      headers: { token: token },
    });
  }
}
