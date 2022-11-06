import axios from "axios";

export const addActors = (payload: object) => {
  return axios
    .post("http://localhost:3000/actors", payload)
    .then((res) => {
      if (res.status === 200) return true;
    })
    .catch((err) => {
      throw err;
    });
};

export const getActorDetails = (id: string) => {
  return axios
    .get(`http://localhost:3000/actors/${id}`)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      throw err;
    });
};

export const getAllActors = () => {
  return axios
    .get("http://localhost:3000/actors")
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      throw err;
    });
};

export const deleteActors = (key: string) => {
  return axios
    .delete(`http://localhost:3000/actors/${key}`)
    .then((res) => {
      if (res.status === 204) return true;
    })
    .catch((err) => {
      throw err;
    });
};
