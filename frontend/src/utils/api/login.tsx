import axios from "axios";

const common = require("../common");

export const registerUser = (payload: object) => {
  return axios
    .post("http://localhost:3000/signup", payload)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      throw err;
    });
};

export const login = (payload: { email: string; remember: boolean }) => {
  return axios
    .post("http://localhost:3000/signin", payload)
    .then((res) => {
      sessionStorage.setItem("token", res.data.data);
      return res.data;
    })
    .catch((error) => {
      throw error;
    });
};
