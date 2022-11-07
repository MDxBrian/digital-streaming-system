import axios from "axios";

export const addReviewers = (payload: object) => {
  return axios
    .post("http://localhost:3000/reviews", payload)
    .then((res) => {
      if (res.status === 200) return true;
    })
    .catch((err) => {
      throw err;
    });
};

export const getAllReviwers = () => {
  return axios
    .get("http://localhost:3000/reviews")
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      throw err;
    });
};
