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

export const login = (data) => async (dispatch) => {
  try {
    localStorage.setItem("token", data);
    const decodedToken = jwt_decode(data);
    dispatch({ type: LOGIN, payload: decodedToken });
  } catch (error) {
    console.log(error.message);
  }
};

export const register = (data) => async (dispatch) => {
  try {
    localStorage.setItem("token", data);
    const decodedToken = jwt_decode(data);
    dispatch({ type: SET_USER, payload: decodedToken });
  } catch (error) {
    console.log(error.message);
  }
};

export const signOut = () => (dispatch) => {
  localStorage.removeItem("token");
  dispatch({ type: SIGN_OUT, payload: null });
};

export const setUser = () => (dispatch) => {
  const storedToken = localStorage.getItem("token");
  let decodedToken = null;
  try {
    if (storedToken) {
      decodedToken = jwt_decode(storedToken);
    }
  } catch (error) {
    console.log(error);
  }
  dispatch({ type: SET_USER, payload: decodedToken });
};
