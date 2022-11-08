import axios from "axios";

export const getAllUsers = () => {
  return axios
    .get(`http://localhost:3000/users`)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      throw err;
    });
};

export const getUserDetails = (id: string) => {
  return axios
    .get(`http://localhost:3000/users/${id}`)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      throw err;
    });
};

export const getWhoAmI = (token: string) => {
  return axios
    .get(`http://localhost:3000/whoami`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      if (err.response.status === 401) {
        sessionStorage.removeItem("token");
        document.cookie =
          "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      }
      return false;
    });
};

export const updateUser = (payload: any) => {
  return axios
    .put(`http://localhost:3000/users/${payload.id}`, payload)
    .then((res) => {
      if (res.status === 204) return true;
    })
    .catch((err) => {
      throw err;
    });
};

export const deleteUsers = (id: string) => {
  return axios
    .delete(`http://localhost:3000/users/${id}`)
    .then((res) => {
      if (res.status === 204) return true;
    })
    .catch((err) => {
      throw err;
    });
};
