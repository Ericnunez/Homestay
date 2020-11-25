import axios from "axios";

const url = "http://localhost:5000/api/v1";

export const fetchlistings = () => axios.get(url);
export const createListing = (newListing) => axios.post(url, newListing);
export const likeListing = (id) => axios.patch(`${url}/${id}/likePost`);
export const updateListing = (id, updatedListing) =>
  axios.patch(`${url}/${id}`, updatedListing);
export const deleteListing = (id) => axios.delete(`${url}/${id}`);

// authentication
const loginUrl = "/auth/login";
const registerUrl = "/auth/register";

// export const login = (user) => axios.post(`${url}${auth}`, user);
export const register = (user) => {
  return axios({
    method: "post",
    url: `${url}${registerUrl}`,
    headers: { "Content-type": "application/json" },
    data: user,
  });
};

export const login = (user) => {
  return axios({
    method: "post",
    headers: { "Content-type": "application/json" },
    url: `${url}${loginUrl}`,
    data: user,
  });
};
