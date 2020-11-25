import {
  UPDATE,
  DELETE,
  LOGIN,
  REGISTER,
  SET_USER,
  SIGN_OUT,
} from "../constants/actionTypes";

import * as api from "../../api";

import jwt_decode from "jwt-decode";

export const login = (user) => async (dispatch) => {
  try {
    const { data } = await api.login(user);
    localStorage.setItem("token", data);
    const decodedToken = jwt_decode(data);
    dispatch({ type: LOGIN, payload: decodedToken });
  } catch (error) {
    console.log(error.message);
  }
};

export const register = (user) => async (dispatch) => {
  try {
    const { data } = await api.register(user);

    dispatch({ type: REGISTER, payload: data });
  } catch (error) {
    console.log(error.message, error);
  }
};

export const signOut = () => (dispatch) => {
  localStorage.removeItem("token");
  dispatch({ type: SIGN_OUT, payload: null });
};

export const setUser = () => (dispatch) => {
  const storedToken = localStorage.getItem("token");
  let decodedToken = null;
  if (storedToken) {
    decodedToken = jwt_decode(storedToken);
  }
  dispatch({ type: SET_USER, payload: decodedToken });
};
