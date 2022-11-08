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

export const getAllReviewers = () => {
  return axios
    .get("http://localhost:3000/reviews")
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      throw err;
    });
};

export const approveReviewer = (payload: any) => {
    return axios
      .put(`http://localhost:3000/reviews/${payload.id}`, payload)
      .then((res) => {
        if (res.status === 204) return true;
      })
      .catch((err) => {
        throw err;
      });
  };