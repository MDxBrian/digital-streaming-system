import axios from "axios";

export const addMovies = (payload: object) => {
  return axios
    .post("http://localhost:3000/movies", payload)
    .then((res) => {
      if (res.status === 200) return true;
    })
    .catch((err) => {
      throw err;
    });
};

export const getAllMovies = () => {
  return axios
    .get("http://localhost:3000/movies")
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      throw err;
    });
};

export const deleteMovies = (key: string) => {
  return axios
    .delete(`http://localhost:3000/movies/${key}`)
    .then((res) => {
      if (res.status === 204) return true;
    })
    .catch((err) => {
      throw err;
    });
};
